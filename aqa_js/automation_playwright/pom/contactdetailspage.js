const {Page, expect} = require('@playwright/test');
const BasePage = require('./basepage');

class ContactDetailsPage extends BasePage {
    /**
     * @param {Page} page - Playwright Page object
     */
    constructor(page) {
        super(page);
        this.PageUrl = `${this.config.BASE_URL}/contactDetails`; // Replace with the actual URL of the signup page
        this.ids = {
            editContactButtonId: "#edit-contact",
            deleteContactButtonId: "#delete",
            returnButtonId: "#return",
            logoutButtonId: "#logout",
            contactDetailsFormId: "#contactDetails",
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
            countryFieldId: "#country"
        };
    }

    async navigate() {
        await super.go_to_url(this.PageUrl);
    }
    async click_logout() {
        await this.page.click(this.ids.logoutButtonId);
    }
    async click_edit_contact() {
        await this.page.click(this.ids.editContactButtonId);
    }   
    async click_delete_contact() {
        await this.page.click(this.ids.deleteContactButtonId);
    }   
    async click_back_to_contact_list() {
        await this.page.click(this.ids.returnButtonId);
    }
    async get_first_name(){
        return await this.page.textContent(this.ids.firstNameFieldId)
    }
    async get_last_name(){
        return await this.page.textContent(this.ids.lastNameFieldId)
    }
    async get_email(){
        return await this.page.textContent(this.ids.emailFieldId)
    }
    async get_birthdate(){
        return await this.page.textContent(this.ids.birthdateFieldId)
    }
    async get_phone(){
        return await this.page.textContent(this.ids.phoneFieldId)
    }
    async get_street1(){
        return await this.page.textContent(this.ids.street1AddressFieldId)
    }
    async get_street2(){
        return await this.page.textContent(this.ids.street2AddressFieldId)
    }
    async get_city(){
        return await this.page.textContent(this.ids.cityFieldId)
    }
    async get_state(){
        return await this.page.textContent(this.ids.stateFieldId)
    }
    async get_postal_code(){
        return await this.page.textContent(this.ids.postalCodeFieldId)
    }
    async get_country(){
        return await this.page.textContent(this.ids.countryFieldId)
    }
    async confirm_alert() {
        const alert = await this.driver.switchTo().alert();
        await alert.accept();
    }

}
module.exports = ContactDetailsPage;