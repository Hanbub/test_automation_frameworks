import BasePage from './basepage';

class ContactListPage extends BasePage {
    constructor() {
        super();
        this.PageUrl = '/contactList';
        this.ids = {
            addContactButtonId: "add-contact",
            TableId: "myTable",
            logoutButtonId: "logout",
        };
    }

    go_to_url(theURL) {
        cy.visit(theURL);
    }
    click_add_contact() {
        cy.get(`#${this.ids.addContactButtonId}`).click();
    }
    click_logout() {
        cy.get(`#${this.ids.logoutButtonId}`).click();
    }
    get_contact_list_table() {
        return cy.get(`#${this.ids.TableId}`);
    }
    get_contact_list_table_rows() {
        return cy.get(`#${this.ids.TableId} tr`);
    }
    get_contact_row_by_first_name(firstName) {
        // Returns a Cypress chainable for the row containing the firstName
        return cy.get(`#${this.ids.TableId} tr`).filter(`:contains(${firstName})`).first();
    }
}

export default new ContactListPage();