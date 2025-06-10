import BasePage from './basepage';

class LandingPage extends BasePage {
    constructor() {
        super();
        this.PageUrl = '/';
        this.ids = {
            emailFieldId: 'email',
            passwordFieldId: 'password',
            submitButtonId: 'submit',
            signupButtonId: 'signup'
        };
    }

    go_to_url(theURL) {
        cy.visit(theURL);
    }

    enter_email(emailText) {
        cy.get(`input[id=${this.ids.emailFieldId}]`).type(emailText);
    }

    enter_password(passwordText) {
        cy.get(`input[id=${this.ids.passwordFieldId}]`).type(passwordText);
    }

    click_submit() {
        cy.get(`#${this.ids.submitButtonId}`).click();
    }

    click_signup() {
        cy.get(`#${this.ids.signupButtonId}`).click();
    }
}

export default new LandingPage();