import config
from playwright.sync_api import Page

class BasePage:
    def __init__(self, page: Page):
        self.page = page
        self.config = config
        self.base_url = self.config.BASE_URL

    def go_to_url(self, url: str):
        self.page.goto(url)
        self.page.wait_for_timeout(200)

    def get_current_url(self) -> str:
        return self.page.url

    def get_placeholder_text_by_selector(self, element_selector: str) -> str:
        element = self.page.locator(element_selector)
        if not element.count():
            raise Exception(f"Element with ID {element_selector} not found")
        return element.get_attribute("placeholder")

    def get_text_by_selector(self, element_selector: str) -> str:
        element = self.page.locator(element_selector)
        if not element.count():
            raise Exception(f"Element with ID {element_selector} not found")
        return element.text_content()