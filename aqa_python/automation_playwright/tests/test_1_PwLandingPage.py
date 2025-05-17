import pytest
import uuid
from pom.landing_page import LandingPage
from pom.adduser_page import AddUserPage
from pom.contactlist_page import ContactListPage

@pytest.fixture(scope="session")
def short_uuid():
    full_uuid = uuid.uuid4().hex
    print("Generated UUID for tests:", full_uuid)
    short = full_uuid[:8]
    print("Generated ShortUUID for tests:", short)
    return short

def test_landing_page_login_wrong_credentials(page):
    landing_page = LandingPage(page)
    landing_page.go_to_url(landing_page.page_url)
    landing_page.enter_email('wrong@gmail.com')
    landing_page.enter_password('wrongpassword')
    landing_page.click_submit()
    page.wait_for_timeout(1000)
    error_message = landing_page.get_error_message()
    print("Error message text:", error_message)
    assert error_message == 'Incorrect username or password'

def test_add_user_and_login_positive(page, short_uuid):
    add_user_page = AddUserPage(page)
    landing_page = LandingPage(page)
    contact_list_page = ContactListPage(page)

    add_user_page.go_to_url(add_user_page.page_url)
    page.wait_for_timeout(1000)

    first_name = f"FName1-{short_uuid}"
    last_name = f"LName1-{short_uuid}"
    correct_email = f"Email1-{short_uuid}@q.com"
    correct_password = f"Pwd1-{short_uuid}"

    add_user_page.enter_first_name(first_name)
    add_user_page.enter_last_name(last_name)
    add_user_page.enter_email(correct_email)
    add_user_page.enter_password(correct_password)

    page.wait_for_timeout(1000)
    add_user_page.click_submit()
    page.wait_for_timeout(1000)

    landing_page.go_to_url(landing_page.page_url)
    landing_page.enter_email(correct_email)
    landing_page.enter_password(correct_password)
    landing_page.click_submit()
    page.wait_for_timeout(1000)

    current_url = page.url
    print("Current URL:", current_url)
    assert current_url == contact_list_page.page_url