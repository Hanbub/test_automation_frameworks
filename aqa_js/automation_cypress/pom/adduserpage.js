import BasePage from './basepage';

class AddUserPage extends BasePage {
    constructor() {
        super();
        this.PageUrl = '/addUser'; // Adjust if your add user page URL is different
        this.ids = {
            firstNameFieldId: 'firstName',
            lastNameFieldId: 'lastName',
            emailFieldId: 'email',
            passwordFieldId: 'password',
            submitButtonId: 'submit',
            cancelButtonId: 'cancel'
        };
    }

    go_to_url(theURL) {
        cy.visit(theURL);
    }
    enter_first_name(firstNameText) {
        cy.get(`#${this.ids.firstNameFieldId}`).type(firstNameText);
    }
    enter_last_name(lastNameText) {
        cy.get(`#${this.ids.lastNameFieldId}`).type(lastNameText);
    }
    enter_email(emailText) {
        cy.get(`#${this.ids.emailFieldId}`).type(emailText);
    }
    enter_password(passwordText) {
        cy.get(`#${this.ids.passwordFieldId}`).type(passwordText);
    }
    click_submit() {
        cy.get(`#${this.ids.submitButtonId}`).click();
    }
    click_cancel() {
        cy.get(`#${this.ids.cancelButtonId}`).click();
    }
}

export default new AddUserPage();