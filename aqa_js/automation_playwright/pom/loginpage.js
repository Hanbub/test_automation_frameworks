const {Page, expect} = require('@playwright/test');
const BasePage = require('./basepage');

class LoginPage extends BasePage{
    /**
     * @param {Page} page - Playwright Page object
     */
    constructor(page) {
        super(page);
        this.page = page;
        this.PageUrl = `${this.config.BASE_URL}/login`;
        this.selectors = {
            emailField: '#email',
            passwordField: '#password',
            submitButton: '#submit',
            signupButton: '#signup'
        };
    }

    async navigate() {
        await this.page.goto(this.PageUrl);
    }

    async enter_email(emailText) {
        await this.page.fill(this.selectors.emailField, emailText);
    }

    async enter_password(passwordText) {
        await this.page.fill(this.selectors.passwordField, passwordText);
    }

    async click_submit() {
        await this.page.click(this.selectors.submitButton);
    }

    async click_signup() {
        await this.page.click(this.selectors.signupButton);
    }
    async login_with_credentials(emailText, passwordText) {
        await this.navigate();
        await this.enter_email(emailText);
        await this.enter_password(passwordText);
        await this.click_submit();
    }
}

module.exports = LoginPage;