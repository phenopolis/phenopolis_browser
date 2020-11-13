import string

import pytest
import random
import views.individual  # to allow MAX_PAGE_SIZE redefinition

from sqlalchemy.orm import Session

from db.model import Individual
from tests.test_views import _check_only_available_to_admin
from views.individual import get_individual_by_id, delete_individual, get_all_individuals, MAPPING_SEX_REPRESENTATIONS
from views.postgres import session_scope


@pytest.mark.parametrize(
    ("query", "subset", "msg"),
    (
        ("PH00008267", "all", '"Number of individuals that are wildtype in our dataset"'),
        ("PH00008258", "preview", "impairment;Macular"),
        ("PH00008258", "metadata", "WebsterURMD_Sample_IC16489"),
    ),
)
def test_get_authorised_individual_by_id(_demo, query, subset, msg):
    """
    res -> str
    """
    response = get_individual_by_id(query, subset=subset)
    assert response.status_code == 200
    assert msg in str(response.data)
    assert response.cache_control.max_age == 300
    assert response.cache_control.public
    assert response.expires is not None


def test_get_unauthorised_individual_by_id(_demo):
    """
    "demo" user has no right to access PH00000001
    res -> tuple(flask.wrappers.Response)
    """
    response = get_individual_by_id("PH00000001")
    assert response.status_code == 404
    assert (
        response.json.get("message")
        == "Sorry, either the patient does not exist or you are not permitted to see this patient"
    )


def test_get_individual_complete_view_by_id(_admin):

    # test individual with homozygous variants
    individual_view = _get_view_individual_by_id(identifier="PH00008256")
    assert len(individual_view.get("rare_homs", {}).get("data")) == 1, "Unexpected number of homozygous variants"
    assert len(individual_view.get("rare_variants", {}).get("data")) == 0, "Unexpected number of heterozygous variants"
    assert (
        len(individual_view.get("rare_comp_hets", {}).get("data")) == 0
    ), "Unexpected number of compound heterozygous variants"

    # test individual with heterozygous variants
    individual_view = _get_view_individual_by_id(identifier="PH00008267")
    assert len(individual_view.get("rare_homs", {}).get("data")) == 0, "Unexpected number of homozygous variants"
    assert len(individual_view.get("rare_variants", {}).get("data")) == 2, "Unexpected number of heterozygous variants"
    assert (
        len(individual_view.get("rare_comp_hets", {}).get("data")) == 2
    ), "Unexpected number of compound heterozygous variants"


def test_get_individual_preview_by_id(_admin):

    # test individual with homozygous variants
    individual_view = _get_view_individual_by_id(identifier="PH00008256", subset="preview")
    assert individual_view.get("preview")[4][0] == "Number of hom variants"
    assert individual_view.get("preview")[4][1] == 4, "Unexpected number of homozygous variants"
    assert individual_view.get("preview")[5][0] == "Number of compound hets"
    assert individual_view.get("preview")[5][1] == 0, "Unexpected number of compound heterozygous variants"
    assert individual_view.get("preview")[6][0] == "Number of het variants"
    assert individual_view.get("preview")[6][1] == 0, "Unexpected number of heterozygous variants"

    # test individual with heterozygous variants
    individual_view = _get_view_individual_by_id(identifier="PH00008267", subset="preview")
    assert individual_view.get("preview")[4][0] == "Number of hom variants"
    assert individual_view.get("preview")[4][1] == 0, "Unexpected number of homozygous variants"
    assert individual_view.get("preview")[5][0] == "Number of compound hets"
    assert individual_view.get("preview")[5][1] == 1, "Unexpected number of compound heterozygous variants"
    assert individual_view.get("preview")[6][0] == "Number of het variants"
    assert individual_view.get("preview")[6][1] == 8, "Unexpected number of heterozygous variants"


def _get_view_individual_by_id(identifier, subset="all"):
    response = get_individual_by_id(identifier, subset=subset)
    assert response.status_code == 200
    data = response.json
    assert len(data) == 1, "Missing expected data"
    individual_complete_view = data[0]
    return individual_complete_view


def test_update_individual_with_demo_user_fails(_demo_client):
    # fetch current sex
    individual_id = "PH00008267"
    with session_scope() as db_session:
        individual = db_session.query(Individual).filter(Individual.internal_id == individual_id).first()
        sex = individual.sex

        # update sex
        new_sex_for_api = MAPPING_SEX_REPRESENTATIONS.inverse.get(sex)
        response = _demo_client.post(
            "/update_patient_data/{}".format(individual_id),
            data="gender_edit[]={}".format(new_sex_for_api),
            content_type="application/x-www-form-urlencoded",
        )
        assert response.status_code == 405

        # fetch new sex
        db_session.refresh(individual)
        observed_sex = individual.sex
        assert observed_sex == sex, "Update did work and it should not!"


def test_update_individual_with_admin_user(_admin_client):

    # fetch current sex
    individual_id = "PH00008267"
    with session_scope() as db_session:
        individual = db_session.query(Individual).filter(Individual.internal_id == individual_id).first()
        sex = individual.sex

        # update sex
        new_sex_for_api = MAPPING_SEX_REPRESENTATIONS.inverse.get(sex)
        response = _admin_client.post(
            "/update_patient_data/{}".format(individual_id),
            data="gender_edit[]={}&feature[]=Abnormality of body height"
            "&feature[]=Multicystic kidney dysplasia"
            "&feature[]=Mode of inheritance".format(new_sex_for_api),
            content_type="application/x-www-form-urlencoded",
        )
        assert response.status_code == 200

        # confirm observed data
        db_session.refresh(individual)
        observed_sex = individual.sex
        assert observed_sex == sex, "Update sex did not work"
        observed_hpo_names = individual.observed_features_names
        assert len(observed_hpo_names.split(";")) == 3, "Update HPOs did not work"
        assert "Abnormality of body height" in observed_hpo_names, "Update HPOs did not work"
        assert "Multicystic kidney dysplasia" in observed_hpo_names, "Update HPOs did not work"
        assert "Mode of inheritance" in observed_hpo_names, "Update HPOs did not work"
        observed_hpos = individual.observed_features
        assert len(observed_hpos.split(",")) == 3, "Update HPOs did not work"
        assert "HP:0000002" in observed_hpos, "Update HPOs did not work"
        assert "HP:0000003" in observed_hpos, "Update HPOs did not work"
        assert "HP:0000005" in observed_hpos, "Update HPOs did not work"


def test_create_individual_with_demo_user_fails(_demo_client):
    individual = Individual()
    individual.internal_id = _get_random_individual_id()
    response = _demo_client.post("/individual", json=individual.as_dict(), content_type="text/json")
    assert response.status_code == 405


def test_create_individual_with_admin_user(_admin_client):
    individual = Individual()
    test_individual_id = _get_random_individual_id()
    individual.external_id = test_individual_id
    individual.pi = "3.1416"
    response = _admin_client.post("/individual", json={}, content_type="application/json")
    assert response.status_code == 400
    assert response.json == {"error": "Empty payload or wrong formatting", "success": False}
    response = _admin_client.post("/individual", json="not_dict_nor_list", content_type="application/json")
    assert response.status_code == 400
    assert response.json == {"error": "Payload of unexpected type: <class 'str'>", "success": False}
    response = _admin_client.post("/individual", json=individual.as_dict(), content_type="application/json")
    assert response.status_code == 200

    with session_scope() as db_session:
        observed_individual = db_session.query(Individual).filter(Individual.external_id == test_individual_id).first()
        assert observed_individual is not None, "Empty newly created individual"
        assert observed_individual.pi == individual.pi, "Field pi from created individual is not what it should"

        # cleans the database
        _clean_test_individuals(db_session, test_individual_id)


def test_create_individual_existing_individual_fails(_admin_client):
    individual = Individual()
    test_individual_id = _get_random_individual_id()
    individual.external_id = test_individual_id
    individual.pi = "3.1416"
    response = _admin_client.post("/individual", json=individual.as_dict(), content_type="application/json")
    assert response.status_code == 200

    with session_scope() as db_session:
        observed_individual = db_session.query(Individual).filter(Individual.external_id == test_individual_id).first()
        assert observed_individual is not None, "Empty newly created individual"
        assert observed_individual.pi == individual.pi, "Field pi from created individual is not what it should"

        response = _admin_client.post("/individual", json=individual.as_dict(), content_type="application/json")
        assert response.status_code == 400

        # cleans the database
        _clean_test_individuals(db_session, test_individual_id)


def test_create_multiple_individuals(_admin_client):
    individual = Individual()
    test_individual_id = _get_random_individual_id()
    individual.external_id = test_individual_id
    individual.pi = "3.1416"
    individual2 = Individual()
    test_individual_id2 = _get_random_individual_id()
    individual2.external_id = test_individual_id2
    individual2.pi = "3.141600000001983983"
    response = _admin_client.post(
        "/individual", json=[individual.as_dict(), individual2.as_dict()], content_type="application/json"
    )
    assert response.status_code == 200

    with session_scope() as db_session:
        observed_individual = db_session.query(Individual).filter(Individual.external_id == test_individual_id).first()
        assert observed_individual is not None, "Empty newly created individual"
        assert observed_individual.pi == individual.pi, "Field pi from created individual is not what it should"
        observed_individual2 = (
            db_session.query(Individual).filter(Individual.external_id == test_individual_id2).first()
        )
        assert observed_individual2 is not None, "Empty newly created individual"
        assert observed_individual2.pi == individual2.pi, "Field pi from created individual is not what it should"

        # cleans the database
        _clean_test_individuals(db_session, test_individual_id)
        _clean_test_individuals(db_session, test_individual_id2)


def test_delete_individual_failing_for_non_admin(_demo):
    """res -> tuple(flask.wrappers.Response)"""
    res = delete_individual("whatever_individual")
    _check_only_available_to_admin(res)


def test_delete_individual(_admin_client):
    # creates an individual
    individual = Individual()
    test_individual_id = _get_random_individual_id()
    individual.external_id = test_individual_id
    individual.pi = "3.1416"
    response = _admin_client.post("/individual", json=[individual.as_dict()], content_type="application/json")
    assert response.status_code == 200

    # confirms existence of new individual
    with session_scope() as db_session:
        observed_individual = db_session.query(Individual).filter(Individual.external_id == test_individual_id).first()
        assert observed_individual is not None, "Empty newly created individual"

        # deletes individual
        response = _admin_client.delete(
            "/individual/{}".format(observed_individual.internal_id), content_type="application/json"
        )
        assert response.status_code == 200

        # confirms it does not exist
        observed_individual = db_session.query(Individual).filter(Individual.external_id == test_individual_id).first()
        assert observed_individual is None, "Deletion was not successful"


def test_delete_not_existing_individual(_admin_client):
    # deletes individual
    response = _admin_client.delete(
        "/individual/{}".format(_get_random_individual_id()), content_type="application/json"
    )
    assert response.status_code == 404


def test_get_all_individuals_default_page(_demo):
    response, status = get_all_individuals()
    assert status == 200
    individuals = response.json
    assert len(individuals) <= 100, "Page is greater than the maximum size of 100"
    assert len(individuals) > 0, "There are no results"
    for i in individuals:
        assert "demo" in i.get("users"), "User demo not in the list of users"
        assert len(i.get("users")) == 1, "Other users than demo are in the list"


def test_get_all_individuals_with_admin_default_page(_admin):
    views.individual.MAX_PAGE_SIZE = 5
    response, status = get_all_individuals()
    assert status == 400
    assert response.json == {"message": "The maximum page size for individuals is 5"}
    views.individual.MAX_PAGE_SIZE = 100000
    response, status = get_all_individuals()
    individuals = response.json
    assert len(individuals) <= 100, "Page is greater than the maximum size of 100"
    assert len(individuals) > 0, "There are no results"
    found_individual_multiple_users = False
    for i in individuals:
        assert "Admin" in i.get("users"), "User Admin not in the list of users"
        assert len(i.get("users")) >= 1, "Other users than demo are in the list"
        found_individual_multiple_users = found_individual_multiple_users or len(i.get("users")) > 1
    assert found_individual_multiple_users, "Only Admin user reported as users with access to individuals"


def test_get_all_individuals_with_pagination(_admin_client):

    response = _admin_client.get("/individual?limit=2&offset=0")
    assert response.status_code == 200
    first_page = response.json
    assert len(first_page) == 2

    response = _admin_client.get("/individual?limit=2&offset=2")
    assert response.status_code == 200
    second_page = response.json
    assert len(second_page) == 2

    # the third page
    response = _admin_client.get("/individual?limit=2&offset=4")
    assert response.status_code == 200
    third_page = response.json
    assert len(third_page) == 1

    # check elements between the pages are different
    internal_ids = [i.get("internal_id") for i in first_page + second_page + third_page]
    assert len(set(internal_ids)) == 5


def test_get_individual_not_having_duplicated_keys(_admin):

    # test individual with homozygous variants
    individual_view = _get_view_individual_by_id(identifier="PH00008256")
    column_names = [c["key"] for c in individual_view.get("rare_homs").get("colNames")]
    assert len(column_names) == len(set(column_names)), "There are duplicated column names in the rare variants"
    assert "#CHROM" not in column_names

    # test individuals with heterozygous and compound heterozygous
    individual_view = _get_view_individual_by_id(identifier="PH00008267")
    column_names = [c["key"] for c in individual_view.get("rare_comp_hets").get("colNames")]
    assert len(column_names) == len(set(column_names)), "There are duplicated column names in the rare variants"
    assert "#CHROM" not in column_names
    column_names = [c["key"] for c in individual_view.get("rare_variants").get("colNames")]
    assert len(column_names) == len(set(column_names)), "There are duplicated column names in the rare variants"
    assert "#CHROM" not in column_names


def _clean_test_individuals(db_session: Session, test_individual_id):
    db_session.query(Individual).filter(Individual.external_id == test_individual_id).delete()


def _get_random_individual_id():
    return "PH_TEST{}".format("".join(random.choices(string.digits, k=8)))
