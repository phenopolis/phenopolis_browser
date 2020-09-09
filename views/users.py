"""
Users view
"""
import ujson as json
from flask import session, request, jsonify
from passlib.handlers.argon2 import argon2
from db.model import User, UserIndividual, Individual, UserConfig
from views import application
from views.auth import requires_auth, check_auth, requires_admin
from views.exceptions import PhenopolisException
from views.helpers import _get_json_payload, _parse_payload
from views.postgres import postgres_cursor, get_db_session


@application.route("/change_password", methods=["POST"])
@requires_auth
def change_password():
    username = session["user"]
    password = request.form["current_password"]
    new_password_1 = request.form["new_password_1"]
    if username == "demo":
        return (
            jsonify(error="You do not have permission to change the password for username 'demo'."),
            403,
        )
    if not check_auth(username, password):
        application.logger.info("Change password:- Login Failed")
        return (
            jsonify(error="Username and current password incorrect. Please try again."),
            401,
        )
    application.logger.info("Login success, changing password")
    argon_password = argon2.hash(new_password_1)
    c = postgres_cursor()
    c.execute("""update users set argon_password='%s' where user='%s' """ % (argon_password, session["user"],))
    msg = "Password for username '" + username + "' changed. You are logged in as '" + username + "'."
    return jsonify(success=msg), 200


@application.route("/user", methods=["POST"])
@requires_admin
def create_user():

    try:
        payload = _get_json_payload()
    except PhenopolisException as e:
        return jsonify(success=False, error=str(e)), 400

    # parse the JSON data into an individual, non existing fields will trigger a TypeError
    try:
        new_users = _parse_payload(payload, User)
    except TypeError as e:
        application.logger.error(str(e))
        return jsonify(success=False, error=str(e)), 400

    # checks individuals validity
    try:
        for u in new_users:
            _check_user_valid(u)
    except PhenopolisException as e:
        application.logger.error(str(e))
        return jsonify(success=False, error=str(e)), 400

    # encode password
    for u in new_users:
        u.argon_password = argon2.hash(u.argon_password)

    db_session = get_db_session()
    request_ok = True
    message = "Users were created"
    user_ids = ",".join([u.user for u in new_users])
    try:
        # insert users
        db_session.add_all(new_users)
        _add_config_from_admin(db_session, new_users)
        db_session.commit()
    except Exception as e:
        db_session.rollback()
        application.logger.exception(e)
        request_ok = False
        message = str(e)
    finally:
        db_session.close()

    if not request_ok:
        return jsonify(success=False, message=message), 500
    else:
        return jsonify(success=True, message=message, id=user_ids), 200


@application.route("/user/<user_id>")
@requires_admin
def get_user(user_id):
    db_session = get_db_session()
    users = db_session.query(User).filter(User.internal_id == user_id).all()
    if len(users) > 1:
        return jsonify(message="Unexpected error fetching a user by id"), 500
    if len(users) == 0:
        return jsonify(message="The user does not exist"), 404

    user = users[0]
    user_individuals = db_session.query(UserIndividual).filter(UserIndividual.user == user.user).all()

    user_dict = user.as_dict()
    # removes the password hash from the endpoint we don't want/need this around
    del user_dict["argon_password"]
    user_dict["individuals"] = [ui.internal_id for ui in user_individuals]
    return json.dumps(user_dict)


@application.route("/user-individual", methods=["POST"])
@requires_admin
def create_user_idividual():

    try:
        payload = _get_json_payload()
    except PhenopolisException as e:
        return jsonify(success=False, error=str(e)), 400

    # parse the JSON data into a user_individual, non existing fields will trigger a TypeError
    try:
        new_user_individuals = _parse_payload(payload, UserIndividual)
    except TypeError as e:
        application.logger.error(str(e))
        return jsonify(success=False, error=str(e)), 400

    # checks user individuals validity
    try:
        for u in new_user_individuals:
            _check_user_individual_valid(u)
    except PhenopolisException as e:
        application.logger.error(str(e))
        return jsonify(success=False, error=str(e)), 400

    db_session = get_db_session()
    request_ok = True
    message = "User individuals were created"
    try:
        # insert user individuals
        for u in new_user_individuals:
            # TODO: should not all these checks happen at the DB?
            _check_db_integrity_user_individual(db_session, u)
            db_session.add(u)
        db_session.commit()
    except Exception as e:
        db_session.rollback()
        application.logger.exception(e)
        request_ok = False
        message = str(e)
    finally:
        db_session.close()

    if not request_ok:
        return jsonify(success=False, message=message), 500
    else:
        return jsonify(success=True, message=message), 200


def _check_db_integrity_user_individual(db_session, u):
    if db_session.query(User.user).filter(User.user.match(u.user)).count() != 1:
        raise PhenopolisException("Trying to add an entry in user_individual to a non existing user")
    if db_session.query(Individual.internal_id).filter(Individual.internal_id.match(u.internal_id)).count() != 1:
        raise PhenopolisException("Trying to add an entry in user_individual to a non existing individual")
    if (
        db_session.query(UserIndividual)
        .filter(UserIndividual.user.match(u.user))
        .filter(UserIndividual.internal_id.match(u.internal_id))
        .count()
        > 0
    ):
        raise PhenopolisException("Trying to add an entry in user_individual that already exists")


def _check_user_valid(new_user: User):
    if new_user is None:
        raise PhenopolisException("Null user")
    if new_user.user is None or new_user.user == "":
        raise PhenopolisException("Missing user name")
    if new_user.argon_password is None or new_user.argon_password == "":
        raise PhenopolisException("Missing password")


def _check_user_individual_valid(new_user_individual: UserIndividual):
    if new_user_individual is None:
        raise PhenopolisException("Null user individual")
    if new_user_individual.user is None or new_user_individual.user == "":
        raise PhenopolisException("Missing user")
    if new_user_individual.internal_id is None or new_user_individual.internal_id == "":
        raise PhenopolisException("Missing individual id")


def _add_config_from_admin(db_session, new_users):
    configs = db_session.query(UserConfig).filter(UserConfig.user_name.match("Admin")).all()
    for u in new_users:
        new_configs = []
        for c in configs:
            new_user_config = UserConfig(**c.as_dict())
            new_user_config.user_name = u.user
            new_configs.append(new_user_config)
        db_session.add_all(new_configs)
