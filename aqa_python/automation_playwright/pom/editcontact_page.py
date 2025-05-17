from pom.base_page import BasePage

class EditContactPage(BasePage):
    def __init__(self, page):
        super().__init__(page)
        self.page_url = f"{self.config.BASE_URL}/editContact"
        self.selectors = {
            "logout_button": "#logout",
            "edit_form": "#edit-contact",
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

    def edit_sample_contact(self, index: int):
        self.page.fill(self.selectors["first_name"], f"edited_firstNamev{index}")
        self.page.fill(self.selectors["last_name"], f"edited_lastNamev{index}")
        self.page.fill(self.selectors["email"], f"edited_emailv{index}@q.com")
        self.page.fill(self.selectors["birthdate"], "1970-01-01")
        self.page.fill(self.selectors["phone"], "001234567890")
        self.page.fill(self.selectors["street1"], f"edited_street1v{index}")
        self.page.fill(self.selectors["street2"], f"edited_street2v{index}")
        self.page.fill(self.selectors["city"], f"edited_cityv{index}")
        self.page.fill(self.selectors["state"], f"edited_statev{index}")
        self.page.fill(self.selectors["postal_code"], "0012345")
        self.page.fill(self.selectors["country"], f"edited_countryv{index}")
        self.page.wait_for_timeout(200)

    def edit_first_name(self, value: str):
        self.page.fill(self.selectors["first_name"], value)
        self.page.wait_for_timeout(200)

    def edit_last_name(self, value: str):
        self.page.fill(self.selectors["last_name"], value)
        self.page.wait_for_timeout(200)

    def edit_email(self, value: str):
        self.page.fill(self.selectors["email"], value)
        self.page.wait_for_timeout(200)

    def edit_birthdate(self, value: str):
        self.page.fill(self.selectors["birthdate"], value)
        self.page.wait_for_timeout(200)

    def edit_phone(self, value: str):
        self.page.fill(self.selectors["phone"], value)
        self.page.wait_for_timeout(200)

    def edit_street1(self, value: str):
        self.page.fill(self.selectors["street1"], value)
        self.page.wait_for_timeout(200)

    def edit_street2(self, value: str):
        self.page.fill(self.selectors["street2"], value)
        self.page.wait_for_timeout(200)

    def edit_city(self, value: str):
        self.page.fill(self.selectors["city"], value)
        self.page.wait_for_timeout(200)

    def edit_state(self, value: str):
        self.page.fill(self.selectors["state"], value)
        self.page.wait_for_timeout(200)

    def edit_postal_code(self, value: str):
        self.page.fill(self.selectors["postal_code"], value)
        self.page.wait_for_timeout(200)

    def edit_country(self, value: str):
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

    def get_error_message(self) -> str:
        return self.page.text_content(self.selectors["error_message"])
