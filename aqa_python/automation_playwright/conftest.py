import pytest
from playwright.sync_api import Page, sync_playwright

@pytest.fixture(scope="session")
def browser():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        yield browser
        browser.close()

@pytest.fixture(scope="session")
def page(browser):
    context = browser.new_context()
    page: Page = context.new_page()
    yield page 
    context.close()
