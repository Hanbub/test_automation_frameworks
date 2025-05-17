import pytest
import time
from uuid import uuid4
from pom.adduser_page import AddUserPage
from pom.login_page import LoginPage
from pom.landing_page import LandingPage
from pom.contactlist_page import ContactListPage
from pom.addcontact_page import AddContactPage
from pom.contactdetails_page import ContactDetailsPage
from pom.editcontact_page import EditContactPage
import pytest

@pytest.fixture(scope="session")
def test_setup(page):
    # Generating UUID for testing purposes
    add_user_page = AddUserPage(page)
    test_user_uuid = str(uuid4())
    short_uuid = test_user_uuid[:8]
    email = f"PWEmail-t2-{short_uuid}@q.com"
    password = f"PWPwd-t2-{short_uuid}"
    # Add user setup
    add_user_page.navigate()
    page.wait_for_timeout(1000)
    add_user_page.enter_first_name(f"PWFName-t2-{short_uuid}")
    add_user_page.enter_last_name(f"PWLNamet-t2-{short_uuid}")
    add_user_page.enter_email(email)
    add_user_page.enter_password(password)
    page.wait_for_timeout(1000)
    add_user_page.click_submit()
    page.wait_for_timeout(1000)
    return {
        "email": email,
        "password": password,
        "short_uuid": short_uuid
    }

def test_login_and_add_contact8(page, test_setup):
    login_page = LoginPage(page)
    contact_list_page = ContactListPage(page)
    add_contact_page = AddContactPage(page)
    contact_details_page = ContactDetailsPage(page)
    # Login with credentials
    login_page.login_with_credentials(test_setup["email"], test_setup["password"])
    page.wait_for_timeout(1000)
    # Create contact8
    contact_list_page.click_add_contact()
    page.wait_for_timeout(1000)
    add_contact_page.enter_first_name('PWfirstNamev8')
    add_contact_page.enter_last_name('PWlastNamev8')
    add_contact_page.click_submit()
    page.wait_for_timeout(1000)
    # Verify contact creation
    target_row = contact_list_page.get_contact_row_by_first_name("PWfirstNamev8")
    assert target_row is not None, "Target contact row not found"
    target_row.click()
    page.wait_for_timeout(1000)
    # Verify contact details
    assert page.url == contact_details_page.page_url, "URL mismatch"
    assert contact_details_page.get_first_name() == 'PWfirstNamev8', "First name mismatch"
    assert contact_details_page.get_last_name() == 'PWlastNamev8', "Last name mismatch"

def test_add_contact_with_invalid_birthdate(page, test_setup):
    login_page = LoginPage(page)
    contact_list_page = ContactListPage(page)
    add_contact_page = AddContactPage(page)
    # Login
    login_page.login_with_credentials(test_setup["email"], test_setup["password"])
    page.wait_for_timeout(1000)
    # Attempt to create a contact with invalid birthdate
    contact_list_page.click_add_contact()
    page.wait_for_timeout(1000)
    add_contact_page.enter_first_name('firstName_neg')
    add_contact_page.enter_last_name('lastNamev_neg')
    add_contact_page.enter_birthdate('wrongBirthdateFormat')
    add_contact_page.click_submit()
    page.wait_for_timeout(1000)
    # Verify error message
    error_message = add_contact_page.get_error_message()
    assert error_message == 'Contact validation failed: birthdate: Birthdate is invalid', "Error message mismatch"

def test_add_contact_with_invalid_email(page, test_setup):
    login_page = LoginPage(page)
    contact_list_page = ContactListPage(page)
    add_contact_page = AddContactPage(page)
    # Login
    login_page.login_with_credentials(test_setup["email"], test_setup["password"])
    page.wait_for_timeout(1000)
    # Attempt to create a contact with invalid email
    contact_list_page.click_add_contact()
    page.wait_for_timeout(1000)
    add_contact_page.enter_first_name('firstName_neg')
    add_contact_page.enter_last_name('lastNamev_neg')
    add_contact_page.enter_email('badEmail')
    add_contact_page.click_submit()
    page.wait_for_timeout(1000)
    # Verify error message
    error_message = add_contact_page.get_error_message()
    assert error_message == 'Contact validation failed: email: Email is invalid', "Error message mismatch"

def test_add_contact_with_invalid_phone(page, test_setup):
    login_page = LoginPage(page)
    contact_list_page = ContactListPage(page)
    add_contact_page = AddContactPage(page)
    # Login
    login_page.login_with_credentials(test_setup["email"], test_setup["password"])
    page.wait_for_timeout(1000)
    # Attempt to create a contact with invalid phone number
    contact_list_page.click_add_contact()
    page.wait_for_timeout(1000)
    add_contact_page.enter_first_name('firstName_neg')
    add_contact_page.enter_last_name('lastNamev_neg')
    add_contact_page.enter_phone('badPhone')
    add_contact_page.click_submit()
    page.wait_for_timeout(1000)
    # Verify error message
    error_message = add_contact_page.get_error_message()
    assert error_message == 'Contact validation failed: phone: Phone number is invalid', "Error message mismatch"

def test_add_contact_with_invalid_zip_code(page, test_setup):
    login_page = LoginPage(page)
    contact_list_page = ContactListPage(page)
    add_contact_page = AddContactPage(page)
    # Login
    login_page.login_with_credentials(test_setup["email"], test_setup["password"])
    page.wait_for_timeout(1000)
    # Attempt to create a contact with invalid postal code
    contact_list_page.click_add_contact()
    page.wait_for_timeout(1000)
    add_contact_page.enter_first_name('firstName_neg')
    add_contact_page.enter_last_name('lastNamev_neg')
    add_contact_page.enter_postal_code('badZipCode')
    add_contact_page.click_submit()
    page.wait_for_timeout(1000)
    # Verify error message
    error_message = add_contact_page.get_error_message()
    assert error_message == 'Contact validation failed: postalCode: Postal code is invalid', "Error message mismatch"

def test_cancel_contact_creation(page, test_setup):
    login_page = LoginPage(page)
    contact_list_page = ContactListPage(page)
    add_contact_page = AddContactPage(page)
    # Login
    login_page.login_with_credentials(test_setup["email"], test_setup["password"])
    page.wait_for_timeout(1000)
    # Attempt to cancel contact creation
    contact_list_page.click_add_contact()
    page.wait_for_timeout(1000)
    add_contact_page.enter_first_name('firstName_neg')
    add_contact_page.enter_last_name('lastNamev_neg')
    add_contact_page.click_cancel()
    page.wait_for_timeout(1000)
    # Verify redirection to contact list page
    assert page.url == contact_list_page.page_url, "URL mismatch after cancellation"

def test_logout(page, test_setup):
    login_page = LoginPage(page)
    add_contact_page = AddContactPage(page)
    landing_page = LandingPage(page)
    # Login
    login_page.login_with_credentials(test_setup["email"], test_setup["password"])
    page.wait_for_timeout(1000)
    # Logout
    add_contact_page.click_logout()
    page.wait_for_timeout(1000)
    # Verify redirection to the landing page
    assert page.url == landing_page.page_url, "URL mismatch after logout"