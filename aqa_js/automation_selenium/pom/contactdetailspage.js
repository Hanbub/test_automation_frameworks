const {Key} = require('selenium-webdriver');
var BasePage = require ('./basepage');

class ContactDetailsPage extends BasePage {
    constructor() {
        super();
        this.PageUrl = `${this.config.BASE_URL}/contactDetails`; // Replace with the actual URL of the signup page
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

    async go_to_url(theURL) {
        await super.go_to_url(theURL);
    }
    async click_logout() {
        await this.clickById(this.ids.logoutButtonId);
    }
    async click_edit_contact() {
        await this.clickById(this.ids.editContactButtonId);
    }   
    async click_delete_contact() {
        await this.clickById(this.ids.deleteContactButtonId);
    }   
    async click_back_to_contact_list() {
        await this.clickById(this.ids.returnButtonId);
    }
    async get_first_name(){
        return await this.getTextById(this.ids.firstNameFieldId)
    }
    async get_last_name(){
        return await this.getTextById(this.ids.lastNameFieldId)
    }
    async get_email(){
        return await this.getTextById(this.ids.emailFieldId)
    }
    async get_birthdate(){
        return await this.getTextById(this.ids.birthdateFieldId)
    }
    async get_phone(){
        return await this.getTextById(this.ids.phoneFieldId)
    }
    async get_street1(){
        return await this.getTextById(this.ids.street1AddressFieldId)
    }
    async get_street2(){
        return await this.getTextById(this.ids.street2AddressFieldId)
    }
    async get_city(){
        return await this.getTextById(this.ids.cityFieldId)
    }
    async get_state(){
        return await this.getTextById(this.ids.stateFieldId)
    }
    async get_postal_code(){
        return await this.getTextById(this.ids.postalCodeFieldId)
    }
    async get_country(){
        return await this.getTextById(this.ids.countryFieldId)
    }
    async confirm_alert() {
        const alert = await this.driver.switchTo().alert();
        await alert.accept();
    }

}
module.exports = new ContactDetailsPage();