const {Key} = require('selenium-webdriver');
var BasePage = require ('./basepage');

class AddUserPage extends BasePage {
    constructor() {
        super();
        this.PageUrl = `${this.config.BASE_URL}/addUser`; // Replace with the actual URL of the signup page
        this.ids = {
            firstNameFieldId: 'firstName',
            lastNameFieldId: 'lastName',
            emailFieldId: 'email',
            passwordFieldId: 'password',
            submitButtonId: 'submit',
            cancelButtonId: 'cancel'
        };
    }

    async go_to_url(theURL) {
        await super.go_to_url(theURL);
    }
    async enter_first_name(firstNameText) {
        await this.enterTextById(this.ids.firstNameFieldId, firstNameText);
    }

    async enter_last_name(lastNameText) {
        await this.enterTextById(this.ids.lastNameFieldId, lastNameText);
    }

    async enter_email(emailText) {
        await this.enterTextById(this.ids.emailFieldId, emailText);
    }

    async enter_password(passwordText) {
        await this.enterTextById(this.ids.passwordFieldId, passwordText);
    }
    async click_submit() {
        await this.clickById(this.ids.submitButtonId);
    }
    async click_cancel() {
        await this.clickById(this.ids.cancelButtonId);
    }
}
module.exports = new AddUserPage();