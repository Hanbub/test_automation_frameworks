import pytest
import httpx
import uuid
from loguru import logger

@pytest.fixture(scope="module")
def short_uuid():
    contact_api_tests_uuid = str(uuid.uuid4())
    logger.info(f"Generated UUID for tests: {contact_api_tests_uuid}")
    contact_api_tests_short_uuid = contact_api_tests_uuid[:8]
    logger.info(f"Generated ShortUUID for tests: {contact_api_tests_short_uuid}")
    return contact_api_tests_short_uuid

@pytest.fixture(scope="module")
def logged_api_client(short_uuid, api_client):
    email = f"api{short_uuid}@q.com"
    logger.info(f"Adding test user with email: {email}")
    # Add test user
    add_user_response = api_client.post("/users", data={
        "email": email,
        "firstName": "testApiContactFname",
        "lastName": "testApiContactLname",
        "password": "testApiContactpassword",
    })
    assert add_user_response.status_code == 201
    assert add_user_response.reason_phrase == "Created"
    # Login test user
    login_user_response = api_client.post("/users/login", data={
        "email": email,
        "password": "testApiContactpassword"
    })
    assert login_user_response.status_code == 200
    assert login_user_response.reason_phrase == "OK"
    token = login_user_response.json().get("token")
    assert token is not None
    api_client.client.headers.update({'Authorization': f'Bearer {token}'})
    return api_client

# Test: Create contact
def test_create_sample_contact(logged_api_client):
    logger.info("Creating a sample contact")
    add_contact_response = logged_api_client.post("/contacts", data={
        "birthdate": "1990-10-01",
        "city": "qqqqqq",
        "country": "eeeeeee",
        "email": "qq@gmail.com",
        "firstName": "aaaa",
        "lastName": "bbbb",
        "phone": "215453262",
        "postalCode": "12345",
        "stateProvince": "wwwwww",
        "street1": "ewqewq",
        "street2": "weqqwe",
    })
    assert add_contact_response.status_code == 201
    assert add_contact_response.reason_phrase == "Created"
    logger.info(f"Contact created successfully: {add_contact_response.json()}")

# Test: Get all contacts
def test_get_all_contacts(logged_api_client):
    contact_fname = "getContactsFname1"
    contact_lname = "getContactsLname1"
    logger.info(f"Adding contact: {contact_fname} {contact_lname}")
    add_contact_response = logged_api_client.post("/contacts", data={
        "firstName": contact_fname,
        "lastName": contact_lname,
    })
    assert add_contact_response.status_code == 201
    assert add_contact_response.reason_phrase == "Created"

    logger.info("Getting all contacts")
    get_contacts_response = logged_api_client.get("/contacts")
    assert get_contacts_response.status_code == 200
    assert get_contacts_response.reason_phrase == "OK"
    assert get_contacts_response.headers['Content-Type'] == "application/json; charset=utf-8"
    assert get_contacts_response.json() is not None
    assert len(get_contacts_response.json()) > 0
    logger.info(f"Contacts retrieved: {get_contacts_response.json()}")
    contact = next((c for c in get_contacts_response.json() if c['firstName'] == contact_fname and c['lastName'] == contact_lname), None)
    assert contact is not None

# Test: Get contact by ID
def test_get_contact_by_id(logged_api_client):
    contact_fname = "getContactByIdFname2"
    contact_lname = "getContactByIdLname2"
    logger.info(f"Adding contact: {contact_fname} {contact_lname}")
    add_contact_response = logged_api_client.post("/contacts", data={
        "firstName": contact_fname,
        "lastName": contact_lname,
    })
    assert add_contact_response.status_code == 201
    assert add_contact_response.reason_phrase == "Created"

    logger.info("Getting contact by ID")
    contact_id = add_contact_response.json().get('_id')
    get_contact_by_id_response = logged_api_client.get(f"/contacts/{contact_id}")
    assert get_contact_by_id_response.status_code == 200
    assert get_contact_by_id_response.reason_phrase == "OK"
    assert get_contact_by_id_response.headers['Content-Type'] == "application/json; charset=utf-8"
    assert get_contact_by_id_response.json() is not None
    logger.info(f"Contact retrieved: {get_contact_by_id_response.json()}")

# Test: Update contact by ID
def test_update_contact_by_id(logged_api_client):
    contact_fname = "ContactByIdFname3"
    contact_lname = "ContactByIdLname3"
    logger.info(f"Adding contact: {contact_fname} {contact_lname}")
    add_contact_response = logged_api_client.post("/contacts", data={
        "firstName": contact_fname,
        "lastName": contact_lname,
    })
    assert add_contact_response.status_code == 201
    assert add_contact_response.reason_phrase == "Created"

    updated_fname = "updContactByIdFname3"
    updated_lname = "updContactByIdLname3"
    contact_id = add_contact_response.json().get('_id')

    logger.info(f"Updating contact with ID: {contact_id}")
    update_contact_response = logged_api_client.put(f"/contacts/{contact_id}", data={
        "firstName": updated_fname,
        "lastName": updated_lname,
    })
    assert update_contact_response.status_code == 200
    assert update_contact_response.reason_phrase == "OK"
    assert update_contact_response.headers['Content-Type'] == "application/json; charset=utf-8"
    assert update_contact_response.json() is not None
    logger.info(f"Contact updated successfully: {update_contact_response.json()}")

# Test: Delete contact by ID
def test_delete_contact_by_id(logged_api_client):
    contact_fname = "ContactByIdFname4"
    contact_lname = "ContactByIdLname4"
    logger.info(f"Adding contact: {contact_fname} {contact_lname}")
    add_contact_response = logged_api_client.post("/contacts", data={
        "firstName": contact_fname,
        "lastName": contact_lname,
    })
    assert add_contact_response.status_code == 201
    assert add_contact_response.reason_phrase == "Created"

    contact_id = add_contact_response.json().get('_id')

    logger.info(f"Deleting contact with ID: {contact_id}")
    delete_contact_response = logged_api_client.delete(f"/contacts/{contact_id}")
    assert delete_contact_response.status_code == 200
    assert delete_contact_response.reason_phrase == "OK"
    assert delete_contact_response.text == 'Contact deleted'
    logger.info(f"Checking if contact exists after deletion")
    get_contact_by_id_response = logged_api_client.get(f"/contacts/{contact_id}")
    assert get_contact_by_id_response.status_code == 404
    assert get_contact_by_id_response.reason_phrase == "Not Found"
