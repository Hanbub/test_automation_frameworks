const {Key} = require('selenium-webdriver');
var BasePage = require ('./basepage');

class ContactListPage extends BasePage {
    constructor() {
        super();
        this.PageUrl = `${this.config.BASE_URL}/addContact`; // Replace with the actual URL of the signup page
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
        this.contactSamples
    }

    async go_to_url(theURL) {
        await super.go_to_url(theURL);
    }
    async click_add_contact() {
        await this.clickById(this.ids.addContactButtonId);
    }
    async enter_first_name(firstNameText) {
        await this.enterTextById(this.ids.firstNameFieldId, firstNameText);
    }
    async enter_last_name(lastNameText) {
        await this.enterTextById(this.ids.lastNameFieldId, lastNameText);
    }   
    async enter_email(emailText) {
        await this.enterTextById(this.ids.emailFieldId, emailText);
    }
    async enter_birthdate(birthdateText) {
        await this.enterTextById(this.ids.birthdateFieldId, birthdateText);
    }   
    async enter_phone(phoneText) {
        await this.enterTextById(this.ids.phoneFieldId, phoneText);
    }
    async enter_street1(street1Text) {
        await this.enterTextById(this.ids.street1AddressFieldId, street1Text);
    }
    async enter_street2(street2Text) {
        await this.enterTextById(this.ids.street2AddressFieldId, street2Text);
    }
    async enter_city(cityText) {
        await this.enterTextById(this.ids.cityFieldId, cityText);
    }
    async enter_state(stateText) {
        await this.enterTextById(this.ids.stateFieldId, stateText);
    }
    async enter_postal_code(postalCodeText) {
        await this.enterTextById(this.ids.postalCodeFieldId, postalCodeText);
    }
    async enter_country(countryText) {
        await this.enterTextById(this.ids.countryFieldId, countryText);
    }
    async click_submit() {
        await this.clickById(this.ids.submitButtonId);
    }
    async click_cancel() {
        await this.clickById(this.ids.cancelButtonId);
    }
    async click_logout() {
        await this.clickById(this.ids.logoutButtonId);
    }
    async add_sample_contact_with_index(version_index) {
        await this.enter_first_name(`firstNamev${version_index}`);
        await this.enter_last_name(`lastNamev${version_index}`);
        await this.enter_email(`emailv${version_index}@q.com`);
        await this.enter_birthdate('2023-10-01');
        await this.enter_phone('1234567890');
        await this.enter_street1(`street1v${version_index}`);
        await this.enter_street2(`street2v${version_index}`);
        await this.enter_city(`cityv${version_index}`);
        await this.enter_state(`statev${version_index}`);
        await this.enter_postal_code('12345');
        await this.enter_country(`countryv${version_index}`);
    }
    async get_error_message() {
        return await this.getTextById(this.ids.errorMessageId);
    }
}
module.exports = new ContactListPage();