import BasePage from './basepage';

class EditContactPage extends BasePage {
    constructor() {
        super();
        this.PageUrl = '/editContact';
        this.ids = {
            logoutButtonId: "logout",
            editContactFormId: "edit-contact",
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
    edit_sample_contact(version_index) {
        this.replaceTextById(this.ids.firstNameFieldId, `edited_firstNamev${version_index}`);
        this.replaceTextById(this.ids.lastNameFieldId, `edited_lastNamev${version_index}`);
        this.replaceTextById(this.ids.emailFieldId, `edited_emailv${version_index}@q.com`);
        this.replaceTextById(this.ids.birthdateFieldId, '1970-01-01');
        this.replaceTextById(this.ids.phoneFieldId, `001234567890`);
        this.replaceTextById(this.ids.street1AddressFieldId, `edited_street1v${version_index}`);
        this.replaceTextById(this.ids.street2AddressFieldId, `edited_street2v${version_index}`);
        this.replaceTextById(this.ids.cityFieldId, `edited_cityv${version_index}`);
        this.replaceTextById(this.ids.stateFieldId, `edited_statev${version_index}`);
        this.replaceTextById(this.ids.postalCodeFieldId, `0012345`);
        this.replaceTextById(this.ids.countryFieldId, `edited_countryv${version_index}`);
    }
    edit_first_name(firstNameText) {
        this.replaceTextById(this.ids.firstNameFieldId, firstNameText);
    }
    edit_last_name(lastNameText) {
        this.replaceTextById(this.ids.lastNameFieldId, lastNameText);
    }
    edit_email(emailText) {
        this.replaceTextById(this.ids.emailFieldId, emailText);
    }
    edit_birthdate(birthdateText) {
        this.replaceTextById(this.ids.birthdateFieldId, birthdateText);
    }
    edit_phone(phoneText) {
        this.replaceTextById(this.ids.phoneFieldId, phoneText);
    }
    edit_street1(street1Text) {
        this.replaceTextById(this.ids.street1AddressFieldId, street1Text);
    }
    edit_street2(street2Text) {
        this.replaceTextById(this.ids.street2AddressFieldId, street2Text);
    }
    edit_city(cityText) {
        this.replaceTextById(this.ids.cityFieldId, cityText);
    }
    edit_state(stateText) {
        this.replaceTextById(this.ids.stateFieldId, stateText);
    }
    edit_postal_code(postalCodeText) {
        this.replaceTextById(this.ids.postalCodeFieldId, postalCodeText);
    }
    edit_country(countryText) {
        this.replaceTextById(this.ids.countryFieldId, countryText);
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
    get_error_message() {
        return cy.get(`#${this.ids.errorMessageId}`).invoke('text');
    }
}

export default new EditContactPage();