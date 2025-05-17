const {Page, expect} = require('@playwright/test');
const BasePage = require('./basepage');

class ContactListPage extends BasePage {
    /**
     * @param {Page} page - Playwright Page object
     */
    constructor(page) {
        super(page);
        this.PageUrl = `${this.config.BASE_URL}/contactList`;
        this.ids = {
            addContactButtonId: '#add-contact',
            tableId: '#myTable',
            logoutButtonId: '#logout',
        };
    }

    async go_to_url() {
        await this.page.goto(this.PageUrl);
    }

    async click_add_contact() {
        await this.page.click(this.ids.addContactButtonId);
    }

    async click_logout() {
        await this.page.click(this.ids.logoutButtonId);
    }

    async get_contact_list_table() {
        await this.page.waitForSelector(this.ids.tableId)
        return await this.page.$(this.ids.tableId);
    }

    async get_contact_list_table_rows() {
        const table = await this.get_contact_list_table();
        await this.page.waitForSelector('tr')
        return await table.$$('tr');
    }

    async get_contact_row_by_first_name(firstName) {
        const rows = await this.get_contact_list_table_rows();
        let targetContactRow = null;

        for (const row of rows) {
            const rowText = await row.textContent();
            console.log("Row Text:", rowText);
            if (rowText.includes(firstName)) {
                targetContactRow = row;
                break;
            }
        }

        return targetContactRow;
    }
}

module.exports = ContactListPage;