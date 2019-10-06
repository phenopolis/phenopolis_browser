from views import *


@application.route('/change_password', methods=['POST'])
@requires_auth
def change_password():
    username=session['user']
    password = request.form['current_password']
    new_password_1 = request.form['new_password_1']
    if username == 'demo': 
        return jsonify(error='You do not have permission to change the password for username \'demo\'.'), 403
    elif not check_auth(username,password):
        print('Change password:- Login Failed')
        return jsonify(error='Username and current password incorrect. Please try again.'), 401
    else:
        print('LOGIN SUCCESS, CHANGING PASSWORD')
        argon_password = argon2.hash(new_password_1)
        c=postgres_cursor()
        c.execute(""" update users set argon_password='%s' where user='%s' """%(argon_password, session['user'],))
        msg = 'Password for username \''+username+'\' changed. You are logged in as \''+username+'\'.' 
        return jsonify(success=msg), 200


