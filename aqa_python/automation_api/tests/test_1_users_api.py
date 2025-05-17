import pytest
import uuid
from loguru import logger


@pytest.fixture(scope="module")
def short_uuid():
    return str(uuid.uuid4())[:8]


def test_sign_up_success(api_client, short_uuid):
    email = f"pyapi1_{short_uuid}@q.com"
    logger.info(f"adding user with email: {email}")
    add_user_response = api_client.post("/users", data={
        "email": email,
        "firstName": "pytestFname1",
        "lastName": "pytestLname1",
        "password": "pytestpassword1"
    })
    assert add_user_response.status_code == 201
    assert add_user_response.reason_phrase == "Created"
    logger.info("done test_sign_up_success")


def test_login_success(api_client, short_uuid):
    email = f"pyapi2_{short_uuid}@q.com"
    logger.info(f"adding user with email: {email}")
    add_user_response = api_client.post("/users", data={
        "email": email,
        "firstName": "pytestFname2",
        "lastName": "pytestLname2",
        "password": "pytestpassword2"
    })
    assert add_user_response.status_code == 201
    assert add_user_response.reason_phrase == "Created"
    logger.info(f"login user with email: {email}")
    login_response = api_client.post("/users/login", data={
        "email": email,
        "password": "pytestpassword2"
    })
    assert login_response.status_code == 200
    assert login_response.reason_phrase == "OK"
    assert login_response.headers["content-type"].startswith("application/json")
    assert login_response.json().get("token") is not None


def test_duplicate_email(api_client, short_uuid):
    email = f"pyapi3_{short_uuid}@q.com"
    logger.info(f"adding user with email: {email}")
    add_user_response = api_client.post("/users", data={
        "email": email,
        "firstName": "pytestFname3",
        "lastName": "pytestLname3",
        "password": "pytestpassword3"
    })
    assert add_user_response.status_code == 201
    assert add_user_response.reason_phrase == "Created"
    logger.info(f"adding DUPLICATE user with email: {email}")
    add_user_duplicate_response = api_client.post("/users", data={
        "email": email,
        "firstName": "pytestFname3",
        "lastName": "pytestLname3",
        "password": "pytestpassword3"
    })
    assert add_user_duplicate_response.status_code == 400
    assert add_user_duplicate_response.reason_phrase == "Bad Request"


def test_invalid_email(api_client):
    logger.info(f"adding user with WRONG email: wrongemail")
    add_user_response = api_client.post("/users", data={
        "email": "wrongemail",
        "firstName": "pytestFname4",
        "lastName": "pytestLname4",
        "password": "pytestpassword4"
    })
    assert add_user_response.status_code == 400
    assert add_user_response.reason_phrase == "Bad Request"


def test_short_password(api_client, short_uuid):
    email = f"pyapi5_{short_uuid}@q.com"
    logger.info(f"adding user with email: {email} and wrong_password: 123")
    add_user_response = api_client.post("/users", data={
        "email": email,
        "firstName": "pytestFname5",
        "lastName": "pytestLname5",
        "password": "123"
    })
    assert add_user_response.status_code == 400
    assert add_user_response.reason_phrase == "Bad Request"


def test_missing_first_name(api_client, short_uuid):
    email = f"pyapi6_{short_uuid}@q.com"
    logger.info(f"adding user with email: {email} without firstName")
    add_user_response = api_client.post("/users", data={
        "email": email,
        "lastName": "pytestLname6",
        "password": "pytestpassword6"
    })
    assert add_user_response.status_code == 400
    assert add_user_response.reason_phrase == "Bad Request"


def test_missing_last_name(api_client, short_uuid):
    email = f"pyapi7_{short_uuid}@q.com"
    logger.info(f"adding user with email: {email} without lastName")
    add_user_response = api_client.post("/users", data={
        "email": email,
        "firstName": "pytestFname7",
        "password": "pytestpassword7"
    })
    assert add_user_response.status_code == 400
    assert add_user_response.reason_phrase == "Bad Request"


def test_logout(api_client, short_uuid):
    email = f"pyapi8_{short_uuid}@q.com"
    logger.info(f"adding user with email: {email}")
    add_user_response = api_client.post("/users", data={
        "email": email,
        "firstName": "testFname",
        "lastName": "testLname",
        "password": "testpassword"
    })
    assert add_user_response.status_code == 201
    assert add_user_response.reason_phrase == "Created"
    logger.info(f"login user with email: {email}")
    login_response = api_client.post("/users/login", data={
        "email": email,
        "password": "testpassword"
    })
    assert login_response.status_code == 200
    token = login_response.json().get("token")
    assert token
    logout_response = api_client.post(
        "/users/logout",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert logout_response.status_code == 200
    assert logout_response.reason_phrase == "OK"
