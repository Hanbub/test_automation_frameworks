from pom.base_page import BasePage

class AddContactPage(BasePage):
    def __init__(self, page):
        super().__init__(page)
        self.page_url = f"{self.config.BASE_URL}/addContact"
        self.selectors = {
            "logout_button": "#logout",
            "first_name": "#firstName",
            "last_name": "#lastName",
            "email": "#email",
            "birthdate": "#birthdate",
            "phone": "#phone",
            "street1": "#street1",
            "street2": "#street2",
            "city": "#city",
            "state": "#stateProvince",
            "postal_code": "#postalCode",
            "country": "#country",
            "submit_button": "#submit",
            "cancel_button": "#cancel",
            "error_message": "#error"
        }

    def navigate(self):
        self.go_to_url(self.page_url)
        self.page.wait_for_timeout(200)

    def enter_first_name(self, value: str):
        self.page.fill(self.selectors["first_name"], value)
        self.page.wait_for_timeout(200)

    def enter_last_name(self, value: str):
        self.page.fill(self.selectors["last_name"], value)
        self.page.wait_for_timeout(200)

    def enter_email(self, value: str):
        self.page.fill(self.selectors["email"], value)
        self.page.wait_for_timeout(200)

    def enter_birthdate(self, value: str):
        self.page.fill(self.selectors["birthdate"], value)
        self.page.wait_for_timeout(200)

    def enter_phone(self, value: str):
        self.page.fill(self.selectors["phone"], value)
        self.page.wait_for_timeout(200)

    def enter_street1(self, value: str):
        self.page.fill(self.selectors["street1"], value)
        self.page.wait_for_timeout(200)

    def enter_street2(self, value: str):
        self.page.fill(self.selectors["street2"], value)
        self.page.wait_for_timeout(200)

    def enter_city(self, value: str):
        self.page.fill(self.selectors["city"], value)
        self.page.wait_for_timeout(200)

    def enter_state(self, value: str):
        self.page.fill(self.selectors["state"], value)
        self.page.wait_for_timeout(200)

    def enter_postal_code(self, value: str):
        self.page.fill(self.selectors["postal_code"], value)
        self.page.wait_for_timeout(200)

    def enter_country(self, value: str):
        self.page.fill(self.selectors["country"], value)
        self.page.wait_for_timeout(200)

    def click_submit(self):
        self.page.click(self.selectors["submit_button"])
        self.page.wait_for_timeout(200)

    def click_cancel(self):
        self.page.click(self.selectors["cancel_button"])
        self.page.wait_for_timeout(200)

    def click_logout(self):
        self.page.click(self.selectors["logout_button"])
        self.page.wait_for_timeout(200)

    def add_sample_contact_with_index(self, index: int):
        self.enter_first_name(f"firstNamev{index}")
        self.enter_last_name(f"lastNamev{index}")
        self.enter_email(f"emailv{index}@q.com")
        self.enter_birthdate("2023-10-01")
        self.enter_phone("1234567890")
        self.enter_street1(f"street1v{index}")
        self.enter_street2(f"street2v{index}")
        self.enter_city(f"cityv{index}")
        self.enter_state(f"statev{index}")
        self.enter_postal_code("12345")
        self.enter_country(f"countryv{index}")

    def get_error_message(self) -> str:
        return self.page.text_content(self.selectors["error_message"])
