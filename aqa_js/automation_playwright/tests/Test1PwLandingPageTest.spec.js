const { test } = require('@playwright/test');
const addUserPage = require('../pom/adduserpage');
const landingPage = require('../pom/landingpage');
const contactListPage = require('../pom/contactlistpage');
const assert = require('assert');
const { v4: uuidv4 } = require('uuid');

test.describe('Landing Page Tests', () => {
    global.LandingPageTestsUUID = null;
    global.LandingPageTestsShortUUID = null
    test.beforeAll(() => {
        LandingPageTestsUUID = uuidv4();
        console.log("Generated UUID for tests:", LandingPageTestsUUID);
        LandingPageTestsShortUUID = LandingPageTestsUUID.substring(0, 8)
        console.log("Generated ShortUUID for tests:", LandingPageTestsShortUUID);
    });
    test.beforeEach(function(){
        // console.log("before each test");
    });
    
    test('Navigate to landing page and input credentials', async ({ page }) => {
        let landingPageObj = new landingPage(page);
        // Navigate to the landing page
        await landingPageObj.navigate();
        // Input email and password
        await landingPageObj.enter_email('q1@q.com');
        await landingPageObj.enter_password('wwwwwww');
        // Wait for 10 seconds
        await page.waitForTimeout(5000);
    }, 30000);
    
    test('Landing page login wrong credentials Negative Test', async ({ page }) => {
        let landingPageObj = new landingPage(page);
        await landingPageObj.navigate();
        await landingPageObj.enter_email('qq')
        await landingPageObj.enter_password('wwwwwww');
        await landingPageObj.click_submit();
        await page.waitForTimeout(1000);
        let error_message = await landingPageObj.get_error_message();
        console.log("Error message text:", error_message)
        assert.strictEqual(error_message, 'Incorrect username or password', 'incorrect message not displayed');
    }, 30000);

    test('add user and login with Positive Test', async ({ page }) => {
        let addUserPageObj = new addUserPage(page);
        await addUserPageObj.navigate();
        await page.waitForTimeout(1000);
        // Enter data into the firstName field
        await addUserPageObj.enter_first_name(`PWFName1-${global.LandingPageTestsShortUUID}`);
        // Enter data into the lastName field
        await addUserPageObj.enter_last_name(`PWLName1-${global.LandingPageTestsShortUUID}`);
        // Enter data into the emailfield
        let correct_email = `PWEmail1-${global.LandingPageTestsShortUUID}@q.com`
        await addUserPageObj.enter_email(correct_email);
        // Enter data into the password field
        let correct_password = `PWPwd1-${global.LandingPageTestsShortUUID}`
        await addUserPageObj.enter_password(correct_password);
        await page.waitForTimeout(1000);
        await addUserPageObj.click_submit();
        await page.waitForTimeout(1000);
        let landingPageObj = new landingPage(page);
        await landingPageObj.navigate();
        await landingPageObj.enter_email(correct_email);
        await landingPageObj.enter_password(correct_password);
        await landingPageObj.click_submit();
        await page.waitForTimeout(1000);
        // Validate the current URL of the driver is contactListPage URL
        let contactListPageObj = new contactListPage(page);
        let contactListUserCurrentUrl = await page.url();
        console.log("Current URL:", contactListUserCurrentUrl);
        assert.strictEqual(contactListUserCurrentUrl, contactListPageObj.PageUrl, 'Current URL is not correct');
    }, 30000);
    test.afterEach(async function(){
            // console.log("after each test");
        });
    test.afterAll(async () => {
            console.log("All tests completed.");
        });
});