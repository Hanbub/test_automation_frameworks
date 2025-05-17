var webdriver = require('selenium-webdriver');
const {By} = require('selenium-webdriver');
// var config = require('../config');
var driver = new webdriver.Builder().forBrowser('chrome').build();
driver.manage().setTimeouts({implicit: (60000)});

class BasePage{
    constructor(){
        global.driver = driver;
        this.driver = driver;
        this.config = require('../config');
    }
    async go_to_url(theURL){
        await this.driver.get(theURL);
    }
    async driverSleep(milliseconds){
        await this.driver.sleep(milliseconds);
    }
    async enterTextByCss(css, enterText){
        await this.driver.findElement(By.css(css)).sendKeys(enterText);
    }
    async enterTextById(id, enterText){
        await this.driver.findElement(By.id(id)).sendKeys(enterText);
    }
    async replaceTextById(id, enterText){
        await this.driver.findElement(By.id(id)).clear();
        await this.driver.findElement(By.id(id)).sendKeys(enterText);
    }
    async clickById(id){
        await this.driver.findElement(By.id(id)).click();
    }
    async getTextById(elementId){
        return await this.driver.findElement(By.id(elementId)).getText();
    }
    async getPlaceholderById(elementId){
        return await this.driver.findElement(By.id(elementId)).getAttribute("placeholder");
    }
    async getDriverCurrentUrl(){
        return await this.driver.getCurrentUrl();
    }
    async getElementById(elementId){
        return await this.driver.findElement(By.id(elementId));
    }
    async getElementByCss(cssSelector){
        return await this.driver.findElement(By.css(cssSelector));
    }
    async getElementsByTagName(tag){
        return await this.driver.findElements({tagName: tag});
    }
    async closeBrowser(){
        await this.driver.quit();
    }
}

module.exports = BasePage;