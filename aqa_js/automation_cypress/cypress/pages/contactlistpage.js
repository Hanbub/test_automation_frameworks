// Cypress Page Object Model for ContactListPage (Cypress style)
const BasePage = require('./basepage');

class ContactListPage extends BasePage {
    constructor() {
        super();
        this.PageUrl = `${Cypress.env('baseUrl')}/contactList`;
        this.ids = {
            addContactButtonId: "add-contact",
            TableId: "myTable",
            logoutButtonId: "logout",
        };
    }
    goToPageUrl(url = this.PageUrl) {
        cy.visit(url);
    }
    clickAddContact() {
        cy.get(`#${this.ids.addContactButtonId}`).click();
    }
    clickLogout() {
        cy.get(`#${this.ids.logoutButtonId}`).click();
    }
    getContactListTable() {
        return cy.get(`#${this.ids.TableId}`);
    }
    getContactListTableRows() {
        return cy.get(`#${this.ids.TableId} tr`);
    }
    getContactRowByFirstName(firstName) {
        // Returns the row element containing the firstName
        return cy.get(`#${this.ids.TableId} tr`).contains(firstName).parent('tr');
    }
}

module.exports = new ContactListPage();