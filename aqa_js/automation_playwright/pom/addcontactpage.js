const {Page, expect} = require('@playwright/test');
const BasePage = require('./basepage');

class ContactListPage extends BasePage {
    /**
     * @param {Page} page - Playwright Page object
     */
    constructor(page) {
        super(page);
        this.PageUrl = `${this.config.BASE_URL}/addContact`; // Replace with the actual URL of the signup page
        this.ids = {
            logoutButtonId: "#logout",
            firstNameFieldId: "#firstName",
            lastNameFieldId: "#lastName",
            emailFieldId: "#email",
            birthdateFieldId: "#birthdate",
            phoneFieldId: "#phone",
            street1AddressFieldId: "#street1",
            street2AddressFieldId: "#street2",
            cityFieldId: "#city",
            stateFieldId: "#stateProvince",
            postalCodeFieldId: "#postalCode",
            countryFieldId: "#country",
            submitButtonId: '#submit',
            cancelButtonId: '#cancel',
            errorMessageId: '#error'
        };
        this.contactSamples
    }

    async navigate() {
        await super.go_to_url(this.PageUrl);
    }
    async enter_first_name(firstNameText) {
        await this.page.fill(this.ids.firstNameFieldId, firstNameText);
    }
    async enter_last_name(lastNameText) {
        await this.page.fill(this.ids.lastNameFieldId, lastNameText);
    }   
    async enter_email(emailText) {
        await this.page.fill(this.ids.emailFieldId, emailText);
    }
    async enter_birthdate(birthdateText) {
        await this.page.fill(this.ids.birthdateFieldId, birthdateText);
    }   
    async enter_phone(phoneText) {
        await this.page.fill(this.ids.phoneFieldId, phoneText);
    }
    async enter_street1(street1Text) {
        await this.page.fill(this.ids.street1AddressFieldId, street1Text);
    }
    async enter_street2(street2Text) {
        await this.page.fill(this.ids.street2AddressFieldId, street2Text);
    }
    async enter_city(cityText) {
        await this.page.fill(this.ids.cityFieldId, cityText);
    }
    async enter_state(stateText) {
        await this.page.fill(this.ids.stateFieldId, stateText);
    }
    async enter_postal_code(postalCodeText) {
        await this.page.fill(this.ids.postalCodeFieldId, postalCodeText);
    }
    async enter_country(countryText) {
        await this.page.fill(this.ids.countryFieldId, countryText);
    }
    async click_add_contact() {
        await this.page.click(this.ids.addContactButtonId);
    }
    async click_submit() {
        await this.page.click(this.ids.submitButtonId);
    }
    async click_cancel() {
        await this.page.click(this.ids.cancelButtonId);
    }
    async click_logout() {
        await this.page.click(this.ids.logoutButtonId);
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
        return await this.page.textContent(this.ids.errorMessageId);
    }
}
module.exports = ContactListPage;