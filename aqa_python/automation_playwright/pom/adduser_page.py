# pages/add_user_page.py

from pom.base_page import BasePage

class AddUserPage(BasePage):
    def __init__(self, page):
        super().__init__(page)
        self.page_url = f"{self.config.BASE_URL}/addUser"  # Update this URL as needed
        self.selectors = {
            "first_name_field": "#firstName",
            "last_name_field": "#lastName",
            "email_field": "#email",
            "password_field": "#password",
            "submit_button": "#submit",
            "cancel_button": "#cancel",
            "error_message": "#error"
        }

    def navigate(self):
        self.page.goto(self.page_url)
        self.page.wait_for_timeout(200)

    def enter_first_name(self, first_name: str):
        self.page.fill(self.selectors["first_name_field"], first_name)
        self.page.wait_for_timeout(200)

    def enter_last_name(self, last_name: str):
        self.page.fill(self.selectors["last_name_field"], last_name)
        self.page.wait_for_timeout(200)

    def enter_email(self, email: str):
        self.page.fill(self.selectors["email_field"], email)
        self.page.wait_for_timeout(200)

    def enter_password(self, password: str):
        self.page.fill(self.selectors["password_field"], password)
        self.page.wait_for_timeout(200)

    def click_submit(self):
        self.page.click(self.selectors["submit_button"])
        self.page.wait_for_timeout(200)

    def click_cancel(self):
        self.page.click(self.selectors["cancel_button"])
        self.page.wait_for_timeout(200)

    def get_error_message(self) -> str:
        self.page.wait_for_selector(self.selectors["error_message"], state="visible")
        return self.page.text_content(self.selectors["error_message"])
