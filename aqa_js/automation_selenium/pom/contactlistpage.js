const {Key} = require('selenium-webdriver');
var BasePage = require ('./basepage');

class ContactListPage extends BasePage {
    constructor() {
        super();
        this.PageUrl = `${this.config.BASE_URL}/contactList`; // Replace with the actual URL of the signup page
        this.ids = {
            addContactButtonId: "add-contact",
            TableId: "myTable",
            logoutButtonId: "logout",
        };
    }

    async go_to_url(theURL) {
        await super.go_to_url(theURL);
    }
    async click_add_contact() {
        await this.clickById(this.ids.addContactButtonId);
    }
    async click_logout() {
        await this.clickById(this.ids.logoutButtonId);
    }   
    async get_contact_list_table() {
        return await this.getElementById(this.ids.TableId)
    }
    async get_contact_list_table_rows() {
        return await this.getElementsByTagName('tr')
    }
    async get_contact_row_by_first_name(firstName) {
        let contactListTable = await this.get_contact_list_table_rows();
        let targetContactRow = null;
        for (let i = 0; i < contactListTable.length; i++) {
            let rowText = await contactListTable[i].getText();
            console.log("Row", i, ":", rowText);
            if (rowText.includes(firstName)) {
                targetContactRow = contactListTable[i];
                break;
            }
        }
        return targetContactRow;
    }

}
module.exports = new ContactListPage();