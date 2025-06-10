import BasePage from './basepage';

class ContactDetailsPage extends BasePage {
    constructor() {
        super();
        this.PageUrl = '/contactDetails'; // Adjust if your contact details page URL is different
        this.ids = {
            editContactButtonId: "edit-contact",
            deleteContactButtonId: "delete",
            returnButtonId: "return",
            logoutButtonId: "logout",
            contactDetailsFormId: "contactDetails",
            firstNameFieldId: "firstName",
            lastNameFieldId: "lastName",
            emailFieldId: "email",
            birthdateFieldId: "birthdate",
            phoneFieldId: "phone",
            street1AddressFieldId: "street1",
            street2AddressFieldId: "street2",
            cityFieldId: "city",
            stateFieldId: "stateProvince",
            postalCodeFieldId: "postalCode",
            countryFieldId: "country"
        };
    }

    go_to_url(theURL) {
        cy.visit(theURL);
    }
    click_logout() {
        cy.get(`#${this.ids.logoutButtonId}`).click();
    }
    click_edit_contact() {
        cy.get(`#${this.ids.editContactButtonId}`).click();
    }
    click_delete_contact() {
        cy.get(`#${this.ids.deleteContactButtonId}`).click();
    }
    click_back_to_contact_list() {
        cy.get(`#${this.ids.returnButtonId}`).click();
    }
    get_first_name() {
        return cy.get(`#${this.ids.firstNameFieldId}`).invoke('text');
    }
    get_last_name() {
        return cy.get(`#${this.ids.lastNameFieldId}`).invoke('text');
    }
    get_email() {
        return cy.get(`#${this.ids.emailFieldId}`).invoke('text');
    }
    get_birthdate() {
        return cy.get(`#${this.ids.birthdateFieldId}`).invoke('text');
    }
    get_phone() {
        return cy.get(`#${this.ids.phoneFieldId}`).invoke('text');
    }
    get_street1() {
        return cy.get(`#${this.ids.street1AddressFieldId}`).invoke('text');
    }
    get_street2() {
        return cy.get(`#${this.ids.street2AddressFieldId}`).invoke('text');
    }
    get_city() {
        return cy.get(`#${this.ids.cityFieldId}`).invoke('text');
    }
    get_state() {
        return cy.get(`#${this.ids.stateFieldId}`).invoke('text');
    }
    get_postal_code() {
        return cy.get(`#${this.ids.postalCodeFieldId}`).invoke('text');
    }
    get_country() {
        return cy.get(`#${this.ids.countryFieldId}`).invoke('text');
    }
    confirm_alert() {
        cy.on('window:confirm', () => true);
    }
}

export default new ContactDetailsPage();