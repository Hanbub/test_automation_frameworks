import BasePage from './basepage';

class LoginPage extends BasePage {
    constructor() {
        super();
        this.PageUrl = '/login';
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

    login_with_credentials(emailText, passwordText) {
        this.go_to_url(this.PageUrl);
        this.enter_email(emailText);
        this.enter_password(passwordText);
        this.click_submit();
    }
}

export default new LoginPage();