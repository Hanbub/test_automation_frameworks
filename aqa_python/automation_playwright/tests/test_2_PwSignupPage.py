import pytest
import uuid
from pom.adduser_page import AddUserPage
from pom.landing_page import LandingPage
from pom.login_page import LoginPage
from pom.contactlist_page import ContactListPage


@pytest.fixture(scope="session")
def short_uuid():
    full_uuid = uuid.uuid4().hex
    short = full_uuid[:8]
    print("Generated UUID for tests:", full_uuid)
    print("Generated ShortUUID for tests:", short)
    return short

def test_signup_page_redirection_validation(page, short_uuid):
    landing_page = LandingPage(page)
    add_user_page = AddUserPage(page)
    contact_list_page = ContactListPage(page)

    landing_page.go_to_url(landing_page.page_url)
    landing_page.click_signup()
    page.wait_for_timeout(1000)

    assert page.url == add_user_page.page_url, "Current URL is not correct"
    a = add_user_page.get_placeholder_text_by_selector(add_user_page.selectors["first_name_field"])
    assert add_user_page.get_placeholder_text_by_selector(add_user_page.selectors["first_name_field"]) == "First Name"
    assert add_user_page.get_placeholder_text_by_selector(add_user_page.selectors["last_name_field"]) == "Last Name"
    assert add_user_page.get_placeholder_text_by_selector(add_user_page.selectors["email_field"]) == "Email"
    assert add_user_page.get_placeholder_text_by_selector(add_user_page.selectors["password_field"]) == "Password"
    assert add_user_page.get_text_by_selector(add_user_page.selectors["submit_button"]) == "Submit"
    assert add_user_page.get_text_by_selector(add_user_page.selectors["cancel_button"]) == "Cancel"

    add_user_page.enter_first_name(f"FName2-{short_uuid}")
    add_user_page.enter_last_name(f"LName2-{short_uuid}")
    add_user_page.enter_email(f"Email2-{short_uuid}@q.com")
    add_user_page.enter_password(f"Pwd2-{short_uuid}")
    page.wait_for_timeout(1000)
    add_user_page.click_submit()
    page.wait_for_timeout(1000)

    assert page.url == contact_list_page.page_url, "Current URL is not correct"

def test_create_existing_user(page, short_uuid):
    add_user_page = AddUserPage(page)

    add_user_page.go_to_url(add_user_page.page_url)
    page.wait_for_timeout(1000)
    add_user_page.enter_first_name(f"FName3-{short_uuid}")
    add_user_page.enter_last_name(f"LName3-{short_uuid}")
    add_user_page.enter_email(f"Email3-{short_uuid}@q.com")
    add_user_page.enter_password(f"Pwd3-{short_uuid}")
    page.wait_for_timeout(1000)
    add_user_page.click_submit()
    page.wait_for_timeout(1000)

    add_user_page.go_to_url(add_user_page.page_url)
    page.wait_for_timeout(1000)
    add_user_page.enter_first_name(f"FName3-{short_uuid}")
    add_user_page.enter_last_name(f"LName3-{short_uuid}")
    add_user_page.enter_email(f"Email3-{short_uuid}@q.com")
    add_user_page.enter_password(f"Pwd3-{short_uuid}")
    page.wait_for_timeout(1000)
    add_user_page.click_submit()
    page.wait_for_timeout(1000)

    error = add_user_page.get_error_message()
    assert error.strip() != '', "Error text is empty"

def test_create_user_via_direct_url(page, short_uuid):
    add_user_page = AddUserPage(page)
    contact_list_page = ContactListPage(page)

    add_user_page.go_to_url(add_user_page.page_url)
    page.wait_for_timeout(1000)
    add_user_page.enter_first_name(f"FName4-{short_uuid}")
    add_user_page.enter_last_name(f"LName4-{short_uuid}")
    add_user_page.enter_email(f"Email4-{short_uuid}@q.com")
    add_user_page.enter_password(f"Pwd4-{short_uuid}")
    page.wait_for_timeout(1000)
    add_user_page.click_submit()
    page.wait_for_timeout(1000)

    assert page.url == contact_list_page.page_url, "Current URL is not correct"

def test_cancel_button_redirects_to_login(page):
    add_user_page = AddUserPage(page)
    login_page = LoginPage(page)

    add_user_page.go_to_url(add_user_page.page_url)
    page.wait_for_timeout(1000)
    add_user_page.click_cancel()
    page.wait_for_timeout(1000)

    assert page.url == login_page.page_url, "Current URL is not correct"

def test_add_user_with_empty_form(page):
    add_user_page = AddUserPage(page)
    add_user_page.go_to_url(add_user_page.page_url)
    page.wait_for_timeout(1000)
    add_user_page.click_submit()
    page.wait_for_timeout(1000)
    error = add_user_page.get_error_message()
    assert error.strip() != '', "Error text is empty"

def test_add_user_with_short_password(page):
    add_user_page = AddUserPage(page)
    add_user_page.go_to_url(add_user_page.page_url)
    page.wait_for_timeout(1000)
    add_user_page.enter_first_name("firstname")
    add_user_page.enter_last_name("lastname")
    add_user_page.enter_email("email@q.com")
    add_user_page.enter_password("pwd")
    add_user_page.click_submit()
    page.wait_for_timeout(1000)
    error = add_user_page.get_error_message()
    assert error.strip() != '', "Error text is empty"

def test_add_user_with_invalid_email(page):
    add_user_page = AddUserPage(page)
    add_user_page.go_to_url(add_user_page.page_url)
    page.wait_for_timeout(1000)
    add_user_page.enter_first_name("firstname")
    add_user_page.enter_last_name("lastname")
    add_user_page.enter_email("email@")
    add_user_page.enter_password("correctpassword")
    add_user_page.click_submit()
    page.wait_for_timeout(1000)
    error = add_user_page.get_error_message()
    assert error.strip() != '', "Error text is empty"
