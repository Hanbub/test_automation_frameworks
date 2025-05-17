const {Page, expect} = require('@playwright/test');
const BasePage = require('./basepage');

class AddUserPage extends BasePage {
    /**
     * @param {Page} page - Playwright Page object
     */
    constructor(page) {
        super(page);
        this.PageUrl = `${this.config.BASE_URL}/addUser`; // Replace with the actual URL of the signup page
        this.ids = {
            firstNameFieldId: '#firstName',
            lastNameFieldId: '#lastName',
            emailFieldId: '#email',
            passwordFieldId: '#password',
            submitButtonId: '#submit',
            cancelButtonId: '#cancel',
            errorMessageId: '#error'
        };
    }

    async navigate() {
        await this.page.goto(this.PageUrl);
    }

    async enter_first_name(firstNameText) {
        await this.page.fill(this.ids.firstNameFieldId, firstNameText);
    }

    async enter_last_name(lastNameText) {
        await this.page.fill(this.ids.lastNameFieldId, lastNameText);
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

    async click_cancel() {
        await this.page.click(this.ids.cancelButtonId);
    }
    async get_error_message() {
        // Wait for the error message to be visible
        await this.page.waitForSelector(this.ids.errorMessageId, { state: 'visible' }); 
        return await this.page.textContent(this.ids.errorMessageId);
    }
}

module.exports = AddUserPage;