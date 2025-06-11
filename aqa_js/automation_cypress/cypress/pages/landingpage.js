// Cypress Page Object Model for LandingPage
const BasePage = require('./basepage');

class LandingPage extends BasePage {
    constructor() {
        super();
        this.PageUrl = `${Cypress.env('baseUrl')}/`;
        this.ids = {
            emailFieldId: 'email',
            passwordFieldId: 'password',
            submitButtonId: 'submit',
            signupButtonId: 'signup',
            errorId: 'error'
        };
    }

    goToPageUrl(url = this.PageUrl) {
        super.goToUrl(url);
    }

    enterEmail(emailText) {
        this.enterTextByCss(`input#${this.ids.emailFieldId}`, emailText);
    }

    enterPassword(passwordText) {
        this.enterTextByCss(`input#${this.ids.passwordFieldId}`, passwordText);
    }

    clickSubmit() {
        this.clickById(this.ids.submitButtonId);
    }

    clickSignup() {
        this.clickById(this.ids.signupButtonId);
    }
    getErrorMessage() {
        return this.getTextById(`#${this.ids.errorId}`);
    }
}

module.exports = new LandingPage();