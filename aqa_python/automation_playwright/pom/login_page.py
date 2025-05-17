from pom.base_page import BasePage

class LoginPage(BasePage):
    def __init__(self, page):
        super().__init__(page)
        self.page_url = f"{self.config.BASE_URL}/login"
        self.selectors = {
            "email_field": "#email",
            "password_field": "#password",
            "submit_button": "#submit",
            "signup_button": "#signup",
            "error_message": "#error"
        }

    def navigate(self):
        self.page.goto(self.page_url)

    def enter_email(self, email_text: str):
        self.page.fill(self.selectors["email_field"], email_text)
        self.page.wait_for_timeout(200)

    def enter_password(self, password_text: str):
        self.page.fill(self.selectors["password_field"], password_text)
        self.page.wait_for_timeout(200)

    def click_submit(self):
        self.page.click(self.selectors["submit_button"])
        self.page.wait_for_timeout(200)

    def click_signup(self):
        self.page.click(self.selectors["signup_button"])
        self.page.wait_for_timeout(200)

    def login_with_credentials(self, email_text: str, password_text: str):
        self.navigate()
        self.enter_email(email_text)
        self.enter_password(password_text)
        self.click_submit()
        
    def get_error_message(self) -> str:
        return self.page.text_content(self.selectors["error_message"])
