const {Page, expect} = require('@playwright/test');
const BasePage = require('./basepage');

class LandingPage extends BasePage{
    /**
     * @param {Page} page - Playwright Page object
     */
    constructor(page) {
        super(page);
        this.page = page;
        this.PageUrl = `${this.config.BASE_URL}/`;
        this.ids = {
            emailFieldId: '#email',
            passwordFieldId: '#password',
            submitButtonId: '#submit',
            signupButtonId: '#signup',
            errorMessageId: '#error'
        };
    }

    async navigate() {
        await this.page.goto(this.PageUrl);
    }

    async enter_email(emailText) {
        await this.page.fill(this.ids.emailFieldId, emailText);
    }

    async enter_password(passwordText) {
        await this.page.fill(this.ids.passwordFieldId, passwordText);
    }

    async click_submit() {
        await this.page.click(this.ids.submitButtonId);
    }

    async click_signup() {
        await this.page.click(this.ids.signupButtonId);
    }
    async get_error_message() {
        // Wait for the error message to be visible
        await this.page.waitForSelector(this.ids.errorMessageId, { state: 'visible' }); 
        return await this.page.textContent(this.ids.errorMessageId);
    }
}

module.exports = LandingPage;