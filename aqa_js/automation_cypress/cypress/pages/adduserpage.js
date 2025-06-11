// Cypress Page Object Model for AddUserPage in Cypress style
const BasePage = require('./basepage');

class AddUserPage extends BasePage {
    constructor() {
        super();
        this.PageUrl = `${Cypress.env('baseUrl')}/addUser`;
        this.ids = {
            firstNameFieldId: 'firstName',
            lastNameFieldId: 'lastName',
            emailFieldId: 'email',
            passwordFieldId: 'password',
            submitButtonId: 'submit',
            cancelButtonId: 'cancel'
        };
    }

    goToPageUrl(url = this.PageUrl) {
        super.goToUrl(url);
    }

    enterFirstName(firstNameText) {
        cy.get(`#${this.ids.firstNameFieldId}`).clear().type(firstNameText);
    }

    enterLastName(lastNameText) {
        cy.get(`#${this.ids.lastNameFieldId}`).clear().type(lastNameText);
    }

    enterEmail(emailText) {
        cy.get(`#${this.ids.emailFieldId}`).clear().type(emailText);
    }

    enterPassword(passwordText) {
        cy.get(`#${this.ids.passwordFieldId}`).clear().type(passwordText);
    }

    clickSubmit() {
        cy.get(`#${this.ids.submitButtonId}`).click();
    }

    clickCancel() {
        cy.get(`#${this.ids.cancelButtonId}`).click();
    }
}

module.exports = new AddUserPage();