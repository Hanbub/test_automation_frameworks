import BasePage from './basepage';

class AddContactPage extends BasePage {
    constructor() {
        super();
        this.PageUrl = '/addContact'; // Adjust if your add contact page URL is different
        this.ids = {
            logoutButtonId: "logout",
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
            countryFieldId: "country",
            submitButtonId: 'submit',
            cancelButtonId: 'cancel',
            errorMessageId: 'error'
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
    enter_birthdate(birthdateText) {
        cy.get(`#${this.ids.birthdateFieldId}`).type(birthdateText);
    }
    enter_phone(phoneText) {
        cy.get(`#${this.ids.phoneFieldId}`).type(phoneText);
    }
    enter_street1(street1Text) {
        cy.get(`#${this.ids.street1AddressFieldId}`).type(street1Text);
    }
    enter_street2(street2Text) {
        cy.get(`#${this.ids.street2AddressFieldId}`).type(street2Text);
    }
    enter_city(cityText) {
        cy.get(`#${this.ids.cityFieldId}`).type(cityText);
    }
    enter_state(stateText) {
        cy.get(`#${this.ids.stateFieldId}`).type(stateText);
    }
    enter_postal_code(postalCodeText) {
        cy.get(`#${this.ids.postalCodeFieldId}`).type(postalCodeText);
    }
    enter_country(countryText) {
        cy.get(`#${this.ids.countryFieldId}`).type(countryText);
    }
    click_submit() {
        cy.get(`#${this.ids.submitButtonId}`).click();
    }
    click_cancel() {
        cy.get(`#${this.ids.cancelButtonId}`).click();
    }
    click_logout() {
        cy.get(`#${this.ids.logoutButtonId}`).click();
    }
    add_sample_contact_with_index(version_index) {
        this.enter_first_name(`firstNamev${version_index}`);
        this.enter_last_name(`lastNamev${version_index}`);
        this.enter_email(`emailv${version_index}@q.com`);
        this.enter_birthdate('2023-10-01');
        this.enter_phone('1234567890');
        this.enter_street1(`street1v${version_index}`);
        this.enter_street2(`street2v${version_index}`);
        this.enter_city(`cityv${version_index}`);
        this.enter_state(`statev${version_index}`);
        this.enter_postal_code('12345');
        this.enter_country(`countryv${version_index}`);
    }
    get_error_message() {
        return cy.get(`#${this.ids.errorMessageId}`).invoke('text');
    }
}

export default new AddContactPage();