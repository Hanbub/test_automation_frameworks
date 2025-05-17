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

@pytest.fixture(scope="session")
def test_setup(page):
    uuid = str(uuid4())
    short_uuid = uuid[:8]
    email = f"Emailtest-{short_uuid}@q.com"
    password = f"Pwdtest-{short_uuid}"

    add_user_page = AddUserPage(page)
    add_user_page.navigate()
    page.wait_for_timeout(1000)
    add_user_page.enter_first_name(f"FNametest-{short_uuid}")
    add_user_page.enter_last_name(f"LNametest-{short_uuid}")
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

def test_login_and_create_contact1(page, test_setup):
    login_page = LoginPage(page)
    login_page.login_with_credentials(test_setup["email"], test_setup["password"])
    page.wait_for_timeout(1000)

    contact_list_page = ContactListPage(page)
    contact_list_page.click_add_contact()

    add_contact_page = AddContactPage(page)
    assert add_contact_page.get_current_url() == add_contact_page.page_url
    add_contact_page.add_sample_contact_with_index("1")
    page.wait_for_timeout(1000)
    add_contact_page.click_submit()
    page.wait_for_timeout(1000)
    assert contact_list_page.get_current_url() == contact_list_page.page_url

    contact_list_page.click_logout()
    page.wait_for_timeout(1000)
    landing_page = LandingPage(page)
    assert landing_page.get_current_url() == landing_page.page_url

def test_login_create_contact2_view_logout(page, test_setup):
    login_page = LoginPage(page)
    login_page.login_with_credentials(test_setup["email"], test_setup["password"])
    page.wait_for_timeout(1000)

    contact_list_page = ContactListPage(page)
    contact_list_page.click_add_contact()

    add_contact_page = AddContactPage(page)
    assert add_contact_page.get_current_url() == add_contact_page.page_url
    add_contact_page.add_sample_contact_with_index("2")
    page.wait_for_timeout(1000)
    add_contact_page.click_submit()
    page.wait_for_timeout(1000)

    target_row = contact_list_page.get_contact_row_by_first_name("firstNamev2")
    assert target_row is not None
    target_row.click()
    page.wait_for_timeout(1000)

    contact_details_page = ContactDetailsPage(page)
    assert contact_details_page.get_current_url() == contact_details_page.page_url
    assert contact_details_page.get_first_name() == "firstNamev2"
    assert contact_details_page.get_last_name() == "lastNamev2"
    assert contact_details_page.get_email() == "emailv2@q.com"
    assert contact_details_page.get_birthdate() == "2023-10-01"
    assert contact_details_page.get_phone() == "1234567890"
    assert contact_details_page.get_street1() == "street1v2"
    assert contact_details_page.get_street2() == "street2v2"
    assert contact_details_page.get_city() == "cityv2"
    assert contact_details_page.get_state() == "statev2"
    assert contact_details_page.get_postal_code() == "12345"
    assert contact_details_page.get_country() == "countryv2"

    contact_details_page.click_logout()
    page.wait_for_timeout(1000)
    landing_page = LandingPage(page)
    assert landing_page.get_current_url() == landing_page.page_url

def test_login_create_contact3_and_return_to_list(page, test_setup):
    login_page = LoginPage(page)
    login_page.login_with_credentials(test_setup["email"], test_setup["password"])
    page.wait_for_timeout(1000)

    contact_list_page = ContactListPage(page)
    contact_list_page.click_add_contact()

    add_contact_page = AddContactPage(page)
    add_contact_page.add_sample_contact_with_index("3")
    page.wait_for_timeout(1000)
    add_contact_page.click_submit()
    page.wait_for_timeout(1000)

    target_row = contact_list_page.get_contact_row_by_first_name("firstNamev3")
    assert target_row is not None, "Contact row 'firstNamev3' not found"
    target_row.click()
    page.wait_for_timeout(1000)

    contact_details_page = ContactDetailsPage(page)
    contact_details_page.click_back_to_contact_list()
    page.wait_for_timeout(1000)

    assert contact_list_page.get_current_url() == contact_list_page.page_url


def test_create_contact4_edit_and_logout(page, test_setup):
    login_page = LoginPage(page)
    login_page.login_with_credentials(test_setup["email"], test_setup["password"])
    page.wait_for_timeout(1000)

    contact_list_page = ContactListPage(page)
    contact_list_page.click_add_contact()
    page.wait_for_timeout(1000)

    add_contact_page = AddContactPage(page)
    add_contact_page.add_sample_contact_with_index("4")
    page.wait_for_timeout(1000)
    add_contact_page.click_submit()
    page.wait_for_timeout(1000)

    target_row = contact_list_page.get_contact_row_by_first_name("firstNamev4")
    assert target_row is not None, "Contact row 'firstNamev4' not found"
    target_row.click()
    page.wait_for_timeout(1000)

    contact_details_page = ContactDetailsPage(page)
    contact_details_page.click_edit_contact()
    page.wait_for_timeout(1000)

    edit_contact_page = EditContactPage(page)
    assert edit_contact_page.get_current_url() == edit_contact_page.page_url
    edit_contact_page.edit_sample_contact("4")
    edit_contact_page.click_logout()
    page.wait_for_timeout(1000)

    landing_page = LandingPage(page)
    assert landing_page.get_current_url() == landing_page.page_url


def test_create_contact5_edit_and_submit(page, test_setup):
    login_page = LoginPage(page)
    login_page.login_with_credentials(test_setup["email"], test_setup["password"])
    page.wait_for_timeout(1000)

    contact_index = "5"
    contact_list_page = ContactListPage(page)
    contact_list_page.click_add_contact()
    page.wait_for_timeout(1000)

    add_contact_page = AddContactPage(page)
    add_contact_page.add_sample_contact_with_index(contact_index)
    page.wait_for_timeout(1000)
    add_contact_page.click_submit()
    page.wait_for_timeout(1000)

    target_row = contact_list_page.get_contact_row_by_first_name("firstNamev5")
    assert target_row is not None, "Contact row 'firstNamev5' not found"
    target_row.click()
    page.wait_for_timeout(1000)

    contact_details_page = ContactDetailsPage(page)
    contact_details_page.click_edit_contact()
    page.wait_for_timeout(1000)

    edit_contact_page = EditContactPage(page)
    assert edit_contact_page.get_current_url() == edit_contact_page.page_url
    edit_contact_page.edit_sample_contact(contact_index)
    edit_contact_page.click_submit()
    page.wait_for_timeout(1000)

    assert contact_details_page.get_first_name() == "edited_firstNamev5"
    assert contact_details_page.get_last_name() == "edited_lastNamev5"
    assert contact_details_page.get_email() == "edited_emailv5@q.com"
    assert contact_details_page.get_birthdate() == "1970-01-01"
    assert contact_details_page.get_phone() == "001234567890"
    assert contact_details_page.get_street1() == "edited_street1v5"
    assert contact_details_page.get_street2() == "edited_street2v5"
    assert contact_details_page.get_city() == "edited_cityv5"
    assert contact_details_page.get_state() == "edited_statev5"
    assert contact_details_page.get_postal_code() == "0012345"
    assert contact_details_page.get_country() == "edited_countryv5"


def test_create_contact6_edit_and_cancel(page, test_setup):
    login_page = LoginPage(page)
    login_page.login_with_credentials(test_setup["email"], test_setup["password"])
    page.wait_for_timeout(1000)

    contact_index = "6"
    contact_list_page = ContactListPage(page)
    contact_list_page.click_add_contact()
    page.wait_for_timeout(1000)

    add_contact_page = AddContactPage(page)
    add_contact_page.add_sample_contact_with_index(contact_index)
    page.wait_for_timeout(1000)
    add_contact_page.click_submit()
    page.wait_for_timeout(1000)

    target_row = contact_list_page.get_contact_row_by_first_name("firstNamev6")
    assert target_row is not None, "Contact row 'firstNamev6' not found"
    target_row.click()
    page.wait_for_timeout(1000)

    contact_details_page = ContactDetailsPage(page)
    contact_details_page.click_edit_contact()
    page.wait_for_timeout(1000)

    edit_contact_page = EditContactPage(page)
    assert edit_contact_page.get_current_url() == edit_contact_page.page_url
    edit_contact_page.edit_sample_contact(contact_index)
    page.wait_for_timeout(1000)
    edit_contact_page.click_cancel()
    page.wait_for_timeout(1000)

    assert contact_details_page.get_current_url() == contact_details_page.page_url


def test_create_contact7_and_delete(page, test_setup):
    login_page = LoginPage(page)
    login_page.login_with_credentials(test_setup["email"], test_setup["password"])
    page.wait_for_timeout(1000)

    contact_index = "7"
    contact_list_page = ContactListPage(page)
    contact_list_page.click_add_contact()
    page.wait_for_timeout(1000)

    add_contact_page = AddContactPage(page)
    add_contact_page.add_sample_contact_with_index(contact_index)
    page.wait_for_timeout(1000)
    add_contact_page.click_submit()
    page.wait_for_timeout(1000)

    target_row = contact_list_page.get_contact_row_by_first_name("firstNamev7")
    assert target_row is not None, "Contact row 'firstNamev7' not found"
    target_row.click()
    page.wait_for_timeout(1000)

    contact_details_page = ContactDetailsPage(page)
    page.once("dialog", lambda dialog: dialog.accept())
    contact_details_page.click_delete_contact()
    page.wait_for_timeout(1000)

    assert contact_list_page.get_current_url() == contact_list_page.page_url
    page.wait_for_timeout(5000)

    # Check contact table header still present
    table_header = page.locator("tr", has_text="State/Province,")
    assert table_header.count() == 1

    removed_row = page.locator("tr", has_text="firstNamev7")
    assert removed_row.count() == 0, "Contact 'firstNamev7' should not exist on the page"
