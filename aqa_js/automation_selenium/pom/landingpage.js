const {Key} = require('selenium-webdriver');
var BasePage = require ('./basepage');

class LandingPage extends BasePage {
    constructor() {
        super();
        this.PageUrl = `${this.config.BASE_URL}/`; // Replace with the actual URL of the signup page
        this.ids = {
            emailFieldId: 'email',
            passwordFieldId: 'password',
            submitButtonId: 'submit',
            signupButtonId: 'signup'
        };
    }

    async go_to_url(theURL) {
        await super.go_to_url(theURL);
    }

    async enter_email(emailText) {
        await this.enterTextByCss(`input[id=${this.ids.emailFieldId}]`, emailText);
    }

    async enter_password(passwordText) {
        await this.enterTextByCss(`input[id=${this.ids.passwordFieldId}]`, passwordText);
    }

    async click_submit() {
        await this.clickById(this.ids.submitButtonId);
    }

    async click_signup() {
        await this.clickById(this.ids.signupButtonId);
    }
}
module.exports = new LandingPage();