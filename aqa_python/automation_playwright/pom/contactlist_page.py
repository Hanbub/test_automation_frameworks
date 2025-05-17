from pom.base_page import BasePage

class ContactListPage(BasePage):
    def __init__(self, page):
        super().__init__(page)
        self.page_url = f"{self.config.BASE_URL}/contactList"
        self.selectors = {
            "add_contact_button": "#add-contact",
            "table": "#myTable",
            "logout_button": "#logout"
        }

    def go_to_url(self):
        self.page.goto(self.page_url)
        self.page.wait_for_timeout(200)

    def click_add_contact(self):
        self.page.click(self.selectors["add_contact_button"])
        self.page.wait_for_timeout(200)

    def click_logout(self):
        self.page.click(self.selectors["logout_button"])
        self.page.wait_for_timeout(200)

    def get_contact_list_table(self):
        self.page.wait_for_selector(self.selectors["table"])
        return self.page.query_selector(self.selectors["table"])

    def get_contact_list_table_rows(self):
        table = self.get_contact_list_table()
        self.page.wait_for_selector("tr")
        return table.query_selector_all("tr")

    def get_contact_row_by_first_name(self, first_name: str):
        rows = self.get_contact_list_table_rows()
        for row in rows:
            row_text = row.text_content()
            if first_name in row_text:
                return row
        return None
