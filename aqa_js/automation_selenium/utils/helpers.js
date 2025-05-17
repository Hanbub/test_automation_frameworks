const { Builder, By, until } = require('selenium-webdriver');

async function waitForElementToBeVisible(driver, locator, timeout = 5000) {
    const element = await driver.wait(until.elementLocated(locator), timeout);
    await driver.wait(until.elementIsVisible(element), timeout);
    return element;
}

async function waitForElementToBeClickable(driver, locator, timeout = 5000) {
    const element = await driver.wait(until.elementLocated(locator), timeout);
    await driver.wait(until.elementIsEnabled(element), timeout);
    return element;
}

module.exports = {
    waitForElementToBeVisible,
    waitForElementToBeClickable
};