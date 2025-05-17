const {Key} = require('selenium-webdriver');
var BasePage = require ('./basepage');

class LoginPage extends BasePage {
    constructor() {
        super();
        this.PageUrl = `${this.config.BASE_URL}/login`;
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
    async login_with_credentials(emailText, passwordText) {
        await this.go_to_url(this.PageUrl);
        await this.enter_email(emailText);
        await this.enter_password(passwordText);
        await this.click_submit();
    }
}
module.exports = new LoginPage();