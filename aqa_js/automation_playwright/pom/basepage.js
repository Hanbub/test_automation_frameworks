const {Page} = require('playwright');
const config = require('../playwright.config.js');

class BasePage {
    /**
     * @param {Page} page - The Playwright Page object
     */
    constructor(page) {
        this.page = page;
        this.config = config;
        this.PageUrl = this.config.BASE_URL;
    }

    async go_to_url(theURL) {
        await this.page.goto(theURL);
    }
    async getCurrentUrl() {
        return this.page.url();
    }
    async getPlaceholderTextById(id) {
        const element = await this.page.$(id);
        if (element) {
            return await element.getAttribute('placeholder');
        } else {
            throw new Error(`Element with ID ${id} not found`);
        }
    }
    async getTextById(id) {
        const element = await this.page.$(id);
        if (element) {
            return await element.textContent();
        } else {
            throw new Error(`Element with ID ${id} not found`);
        }
    }
}

module.exports = BasePage;