from pom.base_page import BasePage

class ContactDetailsPage(BasePage):
    def __init__(self, page):
        super().__init__(page)
        self.page_url = f"{self.config.BASE_URL}/contactDetails"  # Update if necessary
        self.selectors = {
            "edit_contact_button": "#edit-contact",
            "delete_contact_button": "#delete",
            "return_button": "#return",
            "logout_button": "#logout",
            "contact_details_form": "#contactDetails",
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
            "country": "#country"
        }

    def navigate(self):
        self.go_to_url(self.page_url)
        self.page.wait_for_timeout(200)

    def click_logout(self):
        self.page.click(self.selectors["logout_button"])
        self.page.wait_for_timeout(200)

    def click_edit_contact(self):
        self.page.click(self.selectors["edit_contact_button"])
        self.page.wait_for_timeout(200)

    def click_delete_contact(self):
        self.page.click(self.selectors["delete_contact_button"])
        self.page.wait_for_timeout(200)

    def click_back_to_contact_list(self):
        self.page.click(self.selectors["return_button"])
        self.page.wait_for_timeout(200)

    def get_first_name(self) -> str:
        return self.page.text_content(self.selectors["first_name"])

    def get_last_name(self) -> str:
        return self.page.text_content(self.selectors["last_name"])

    def get_email(self) -> str:
        return self.page.text_content(self.selectors["email"])

    def get_birthdate(self) -> str:
        return self.page.text_content(self.selectors["birthdate"])

    def get_phone(self) -> str:
        return self.page.text_content(self.selectors["phone"])

    def get_street1(self) -> str:
        return self.page.text_content(self.selectors["street1"])

    def get_street2(self) -> str:
        return self.page.text_content(self.selectors["street2"])

    def get_city(self) -> str:
        return self.page.text_content(self.selectors["city"])

    def get_state(self) -> str:
        return self.page.text_content(self.selectors["state"])

    def get_postal_code(self) -> str:
        return self.page.text_content(self.selectors["postal_code"])

    def get_country(self) -> str:
        return self.page.text_content(self.selectors["country"])

    def confirm_alert(self):
        self.page.on("dialog", lambda dialog: dialog.accept())
