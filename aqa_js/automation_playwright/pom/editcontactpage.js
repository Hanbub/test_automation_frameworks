const {Page, expect} = require('@playwright/test');
const BasePage = require('./basepage');

class EditContactPage extends BasePage {
    /**
     * @param {Page} page - Playwright Page object
     */
    constructor(page) {
        super(page);
        this.PageUrl = `${this.config.BASE_URL}/editContact`; // Replace with the actual URL of the signup page
        this.ids = {
            logoutButtonId: "#logout",
            editContactFormId: "#edit-contact",
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
    }

    async navigate() {
        await super.go_to_url(this.PageUrl);
    }
    async edit_sample_contact(version_index) {
        await this.page.fill(this.ids.firstNameFieldId, `edited_firstNamev${version_index}`);
        await this.page.fill(this.ids.lastNameFieldId, `edited_lastNamev${version_index}`);
        await this.page.fill(this.ids.emailFieldId, `edited_emailv${version_index}@q.com`);
        await this.page.fill(this.ids.birthdateFieldId, '1970-01-01');
        await this.page.fill(this.ids.phoneFieldId, `001234567890`);
        await this.page.fill(this.ids.street1AddressFieldId, `edited_street1v${version_index}`);
        await this.page.fill(this.ids.street2AddressFieldId, `edited_street2v${version_index}`);
        await this.page.fill(this.ids.cityFieldId, `edited_cityv${version_index}`);
        await this.page.fill(this.ids.stateFieldId, `edited_statev${version_index}`);
        await this.page.fill(this.ids.postalCodeFieldId, `0012345`);
        await this.page.fill(this.ids.countryFieldId, `edited_countryv${version_index}`);
    }
    async edit_first_name(firstNameText) {
        await this.page.fill(this.ids.firstNameFieldId, firstNameText);
    }
    async edit_last_name(lastNameText) {
        await this.page.fill(this.ids.lastNameFieldId, lastNameText);
    }
    async edit_email(emailText) {
        await this.page.fill(this.ids.emailFieldId, emailText);
    }
    async edit_birthdate(birthdateText) {
        await this.page.fill(this.ids.birthdateFieldId, birthdateText);
    }
    async edit_phone(phoneText) {
        await this.page.fill(this.ids.phoneFieldId, phoneText);
    }
    async edit_street1(street1Text) {
        await this.page.fill(this.ids.street1AddressFieldId, street1Text);
    }
    async edit_street2(street2Text) {
        await this.page.fill(this.ids.street2AddressFieldId, street2Text);
    }
    async edit_city(cityText) {
        await this.page.fill(this.ids.cityFieldId, cityText);
    }
    async edit_state(stateText) {
        await this.page.fill(this.ids.stateFieldId, stateText);
    }
    async edit_postal_code(postalCodeText) {
        await this.page.fill(this.ids.postalCodeFieldId, postalCodeText);
    }
    async edit_country(countryText) {
        await this.page.fill(this.ids.countryFieldId, countryText);
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
    async get_error_message() {
        return await this.page.textContent(this.ids.errorMessageId);
    }
}
module.exports = EditContactPage;