import pytest
from uuid import uuid4
from pom.adduser_page import AddUserPage
from pom.login_page import LoginPage
from pom.landing_page import LandingPage
from pom.contactlist_page import ContactListPage
from pom.addcontact_page import AddContactPage
from pom.contactdetails_page import ContactDetailsPage
from pom.editcontact_page import EditContactPage

@pytest.fixture(scope="session")
def test_setup(page):
    uuid = str(uuid4())
    short_uuid = uuid[:8]
    email = f"PWEmail-t3-{short_uuid}@q.com"
    password = f"PWPwd-t3-{short_uuid}"

    add_user_page = AddUserPage(page)
    add_user_page.navigate()
    page.wait_for_timeout(1000)
    add_user_page.enter_first_name(f"PWFName-t3-{short_uuid}")
    add_user_page.enter_last_name(f"PWLNamet-t3-{short_uuid}")
    add_user_page.enter_email(email)
    add_user_page.enter_password(password)
    page.wait_for_timeout(1000)
    add_user_page.click_submit()
    page.wait_for_timeout(1000)
    contact_list_page = ContactListPage(page)
    contact_list_page.click_add_contact()
    add_contact_page = AddContactPage(page)
    page.wait_for_timeout(1000)
    add_contact_page.enter_first_name("firstNamev9")
    add_contact_page.enter_last_name("lastNamev9")
    page.wait_for_timeout(1000)
    add_contact_page.click_submit()
    page.wait_for_timeout(1000)

    return {
        "email": email,
        "password": password,
        "short_uuid": short_uuid
    }

def test_edit_contact_first_and_last_name(page, test_setup):
    login_page = LoginPage(page)
    contact_list_page = ContactListPage(page)
    contact_details_page = ContactDetailsPage(page)
    edit_contact_page = EditContactPage(page)

    login_page.login_with_credentials(test_setup["email"], test_setup["password"])
    page.wait_for_timeout(1000)

    target_row = contact_list_page.get_contact_row_by_first_name("firstNamev9")
    assert target_row is not None, "Target contact row not found"
    target_row.click()
    page.wait_for_timeout(1000)

    contact_details_page.click_edit_contact()
    page.wait_for_timeout(1000)

    edit_contact_page.edit_first_name("edited_firstNamev9")
    edit_contact_page.edit_last_name("edited_lastNamev9")
    page.wait_for_timeout(1000)
    edit_contact_page.click_submit()
    page.wait_for_timeout(1000)

    assert contact_details_page.get_first_name() == "edited_firstNamev9"
    assert contact_details_page.get_last_name() == "edited_lastNamev9"

def test_edit_contact_invalid_birthdate(page, test_setup):
    login_page = LoginPage(page)
    contact_list_page = ContactListPage(page)
    contact_details_page = ContactDetailsPage(page)
    edit_contact_page = EditContactPage(page)

    login_page.login_with_credentials(test_setup["email"], test_setup["password"])
    page.wait_for_timeout(1000)

    target_row = contact_list_page.get_contact_row_by_first_name("firstNamev9")
    assert target_row is not None, "Target contact row not found"
    target_row.click()
    page.wait_for_timeout(1000)

    contact_details_page.click_edit_contact()
    page.wait_for_timeout(1000)

    edit_contact_page.edit_birthdate("badDate")
    page.wait_for_timeout(1000)
    edit_contact_page.click_submit()
    page.wait_for_timeout(1000)

    error_message = edit_contact_page.get_error_message()
    assert error_message == "Validation failed: birthdate: Birthdate is invalid"

def test_edit_contact_invalid_email(page, test_setup):
    login_page = LoginPage(page)
    contact_list_page = ContactListPage(page)
    contact_details_page = ContactDetailsPage(page)
    edit_contact_page = EditContactPage(page)

    login_page.login_with_credentials(test_setup["email"], test_setup["password"])
    page.wait_for_timeout(1000)

    target_row = contact_list_page.get_contact_row_by_first_name("firstNamev9")
    assert target_row is not None, "Target contact row not found"
    target_row.click()
    page.wait_for_timeout(1000)

    contact_details_page.click_edit_contact()
    page.wait_for_timeout(1000)

    edit_contact_page.edit_email("badEmail")
    page.wait_for_timeout(1000)
    edit_contact_page.click_submit()
    page.wait_for_timeout(1000)

    error_message = edit_contact_page.get_error_message()
    assert error_message == "Validation failed: email: Email is invalid"

def test_edit_contact_invalid_phone(page, test_setup):
    login_page = LoginPage(page)
    contact_list_page = ContactListPage(page)
    contact_details_page = ContactDetailsPage(page)
    edit_contact_page = EditContactPage(page)

    login_page.login_with_credentials(test_setup["email"], test_setup["password"])
    page.wait_for_timeout(1000)

    target_row = contact_list_page.get_contact_row_by_first_name("firstNamev9")
    assert target_row is not None, "Target contact row not found"
    target_row.click()
    page.wait_for_timeout(1000)

    contact_details_page.click_edit_contact()
    page.wait_for_timeout(1000)

    edit_contact_page.edit_phone("badPhone")
    page.wait_for_timeout(1000)
    edit_contact_page.click_submit()
    page.wait_for_timeout(1000)

    error_message = edit_contact_page.get_error_message()
    assert error_message == "Validation failed: phone: Phone number is invalid"

def test_edit_contact_invalid_zipcode(page, test_setup):
    login_page = LoginPage(page)
    contact_list_page = ContactListPage(page)
    contact_details_page = ContactDetailsPage(page)
    edit_contact_page = EditContactPage(page)

    login_page.login_with_credentials(test_setup["email"], test_setup["password"])
    page.wait_for_timeout(1000)

    target_row = contact_list_page.get_contact_row_by_first_name("firstNamev9")
    assert target_row is not None, "Target contact row not found"
    target_row.click()
    page.wait_for_timeout(1000)

    contact_details_page.click_edit_contact()
    page.wait_for_timeout(1000)

    edit_contact_page.edit_postal_code("badZipCode")
    page.wait_for_timeout(1000)
    edit_contact_page.click_submit()
    page.wait_for_timeout(1000)

    error_message = edit_contact_page.get_error_message()
    assert error_message == "Validation failed: postalCode: Postal code is invalid"

def test_edit_contact_and_cancel(page, test_setup):
    login_page = LoginPage(page)
    contact_list_page = ContactListPage(page)
    contact_details_page = ContactDetailsPage(page)
    edit_contact_page = EditContactPage(page)

    login_page.login_with_credentials(test_setup["email"], test_setup["password"])
    page.wait_for_timeout(1000)

    target_row = contact_list_page.get_contact_row_by_first_name("firstNamev9")
    assert target_row is not None, "Target contact row not found"
    target_row.click()
    page.wait_for_timeout(1000)

    contact_details_page.click_edit_contact()
    page.wait_for_timeout(1000)

    edit_contact_page.click_cancel()
    page.wait_for_timeout(1000)
    assert page.url == contact_details_page.page_url

def test_edit_contact_and_logout(page, test_setup):
    login_page = LoginPage(page)
    landing_page = LandingPage(page)
    contact_list_page = ContactListPage(page)
    contact_details_page = ContactDetailsPage(page)
    edit_contact_page = EditContactPage(page)

    login_page.login_with_credentials(test_setup["email"], test_setup["password"])
    page.wait_for_timeout(1000)

    target_row = contact_list_page.get_contact_row_by_first_name("firstNamev9")
    assert target_row is not None, "Target contact row not found"
    target_row.click()
    page.wait_for_timeout(1000)

    contact_details_page.click_edit_contact()
    page.wait_for_timeout(1000)

    edit_contact_page.click_logout()
    page.wait_for_timeout(1000)

    assert page.url == landing_page.page_url
