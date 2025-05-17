const { test } = require('@playwright/test');
const addUserPage = require('../pom/adduserpage');
const landingPage = require('../pom/landingpage');
const loginPage = require('../pom/loginpage');
const contactListPage = require('../pom/contactlistpage');
const assert = require('assert');
const { v4: uuidv4 } = require('uuid');


test.describe('addUserPage Suite', () => {
    global.AddUserPageTestsUUID = null;
    global.AddUserPageTestsShortUUID = null
    test.beforeAll(async () => {
        AddUserPageTestsUUID = uuidv4();
        console.log("Generated UUID for tests:", AddUserPageTestsUUID);
        AddUserPageTestsShortUUID = AddUserPageTestsUUID.substring(0, 8)
        console.log("Generated ShortUUID for tests:", AddUserPageTestsShortUUID);
    });
    test.beforeEach(async () => {
        // console.log("before each test");
    });

    test('signup page redirection validation Positive Test', async ({ page }) => {
        let landingPageObj = new landingPage(page);
        let addUserPageObj = new addUserPage(page);
        let contactListPageObj = new contactListPage(page);
        await landingPageObj.navigate();
        await page.waitForTimeout(1000);
        await landingPageObj.click_signup();
        await page.waitForTimeout(1000);
        // Validate the current URL of the driver is contactListPage URL
        let addUserCurrentUrl = await page.url();
        console.log("Current URL:", addUserCurrentUrl);
        assert.strictEqual(addUserCurrentUrl, addUserPageObj.PageUrl, 'Current URL is not correct');
        // firstName field check
        let firstName = await addUserPageObj.getPlaceholderTextById(addUserPageObj.ids.firstNameFieldId);
        console.log("First Name field placeholder:", firstName);
        assert.strictEqual(firstName, 'First Name', 'First Name field placeholder is not correct');
        // lastName field check
        let lastName_placeholder = await addUserPageObj.getPlaceholderTextById(addUserPageObj.ids.lastNameFieldId);
        console.log("Last Name field placeholder:", lastName_placeholder);
        assert.strictEqual(lastName_placeholder, 'Last Name', 'Last Name field placeholder is not correct');
        // email field check
        let email_placeholder = await addUserPageObj.getPlaceholderTextById(addUserPageObj.ids.emailFieldId);
        console.log("Email field placeholder:", email_placeholder);
        assert.strictEqual(email_placeholder, 'Email', 'Email field placeholder is not correct');
        // password field check
        let password_placeholder = await addUserPageObj.getPlaceholderTextById(addUserPageObj.ids.passwordFieldId);
        console.log("Password field placeholder:", password_placeholder);
        assert.strictEqual(password_placeholder, 'Password', 'Password field placeholder is not correct');
        // submit button check
        let submit_button_text = await addUserPageObj.getTextById(addUserPageObj.ids.submitButtonId);
        console.log("Submit button text:", submit_button_text); 
        assert.strictEqual(submit_button_text, 'Submit', 'Submit button text is not correct');
        // cancel button check
        let cancel_button_text = await addUserPageObj.getTextById(addUserPageObj.ids.cancelButtonId);
        console.log("Cancel button text:", cancel_button_text);
        assert.strictEqual(cancel_button_text, 'Cancel', 'Cancel button text is not correct');
        // Enter data into the firstName field
        await addUserPageObj.enter_first_name(`PWFName2-${global.AddUserPageTestsShortUUID}`);
        // Enter data into the lastName field
        await addUserPageObj.enter_last_name(`PWLName2-${global.AddUserPageTestsShortUUID}`);
        // Enter data into the emailfield
        await addUserPageObj.enter_email(`PWEmail2-${global.AddUserPageTestsShortUUID}@q.com`);
        // Enter data into the password field
        await addUserPageObj.enter_password(`PWPwd2-${global.AddUserPageTestsShortUUID}`);
        await page.waitForTimeout(1000);
        await addUserPageObj.click_submit();
        await page.waitForTimeout(1000);
        // Validate the current URL of the driver is contactListPage URL
        let contactListUserCurrentUrl = await page.url();
        console.log("Current URL:", contactListUserCurrentUrl);
        assert.strictEqual(contactListUserCurrentUrl, contactListPageObj.PageUrl, 'Current URL is not correct');
    }, 30000);

    test('create user that already exists Negative Test',  async ({ page }) => {
        let addUserPageObj = new addUserPage(page);
        await addUserPageObj.navigate();
        await page.waitForTimeout(1000);
        // Enter data into the firstName field
        await addUserPageObj.enter_first_name(`PwFName3-${global.AddUserPageTestsShortUUID}`);
        // Enter data into the lastName field
        await addUserPageObj.enter_last_name(`PwLName3-${global.AddUserPageTestsShortUUID}`);
        // Enter data into the emailfield
        await addUserPageObj.enter_email(`PwEmail3-${global.AddUserPageTestsShortUUID}@q.com`);
        // Enter data into the password field
        await addUserPageObj.enter_password(`PwPwd3-${global.AddUserPageTestsShortUUID}`);
        await page.waitForTimeout(1000);
        await addUserPageObj.click_submit();
        await page.waitForTimeout(1000);
        // add same user again
        await addUserPageObj.navigate();
        await page.waitForTimeout(1000);
        // Enter data into the firstName field
        await addUserPageObj.enter_first_name(`PwFName3-${global.AddUserPageTestsShortUUID}`);
        // Enter data into the lastName field
        await addUserPageObj.enter_last_name(`PwLName3-${global.AddUserPageTestsShortUUID}`);
        // Enter data into the emailfield
        await addUserPageObj.enter_email(`PwEmail3-${global.AddUserPageTestsShortUUID}@q.com`);
        // Enter data into the password field
        await addUserPageObj.enter_password(`PwPwd3-${global.AddUserPageTestsShortUUID}`);
        await page.waitForTimeout(1000);
        await addUserPageObj.click_submit();
        await page.waitForTimeout(1000);
        // Check that the text in the element with id=error is not empty
        let errorText = await addUserPageObj.get_error_message();
        console.log("Error text:", errorText);
        assert.notStrictEqual(errorText.trim(), '', 'Error text is empty');
    }, 30000); 

    test('create another user with direct url access to addUser page Positive Test',  async ({ page }) => {
        let addUserPageObj = new addUserPage(page);
        let contactListPageObj = new contactListPage(page);
        await addUserPageObj.navigate();
        await page.waitForTimeout(1000);
        // Enter data into the firstName field
        await addUserPageObj.enter_first_name(`PwFName4-${global.AddUserPageTestsShortUUID}`);
        // Enter data into the lastName field
        await addUserPageObj.enter_last_name(`PwLName4-${global.AddUserPageTestsShortUUID}`);
        // Enter data into the emailfield
        await addUserPageObj.enter_email(`PwEmail4-${global.AddUserPageTestsShortUUID}@q.com`);
        // Enter data into the password field
        await addUserPageObj.enter_password(`PwPwd4-${global.AddUserPageTestsShortUUID}`);
        await page.waitForTimeout(1000);
        await addUserPageObj.click_submit();
        await page.waitForTimeout(1000);
        // Check that the redirection to the contactListPage was successful
        let contactListUserCurrentUrl = await page.url();
        console.log("Current URL:", contactListUserCurrentUrl);
        assert.strictEqual(contactListUserCurrentUrl, contactListPageObj.PageUrl, 'Current URL is not correct');
    }, 30000); 

    test('click cancel on addUser page Positive Test', async ({ page }) => {
        let loginPageObj = new loginPage(page);
        let addUserPageObj = new addUserPage(page);
        await addUserPageObj.navigate();
        await page.waitForTimeout(1000);
        await addUserPageObj.click_cancel();
        await page.waitForTimeout(1000);
        // Check that the redirection to the contactListPage was successful
        let loginPageCurrentUrl = await page.url();
        console.log("Current URL:", loginPageCurrentUrl);
        assert.strictEqual(loginPageCurrentUrl, loginPageObj.PageUrl, 'Current URL is not correct');
    }, 30000); 

    test('add user with empty forms Negative Test',  async ({ page }) => {
        let addUserPageObj = new addUserPage(page);
        await addUserPageObj.navigate();
        await page.waitForTimeout(1000);
        await addUserPageObj.click_submit();
        await page.waitForTimeout(1000);
        // Check that the text in the element with id=error is not empty
        let errorText = await addUserPageObj.get_error_message();
        console.log("Error text:", errorText);
        assert.notStrictEqual(errorText.trim(), '', 'Error text is empty');
    }, 30000); 
    
    test('add user with short password forms Negative Test',  async ({ page }) => {
        let addUserPageObj = new addUserPage(page);
        await addUserPageObj.navigate();
        await page.waitForTimeout(1000);
        // Enter data into the firstName field
        await addUserPageObj.enter_first_name('firstname');
        // Enter data into the lastName field
        await addUserPageObj.enter_last_name('lastname');
        // Enter data into the emailfield
        await addUserPageObj.enter_email('email@q.com');
        // Enter data into the password field (short password 3 symbols)
        await addUserPageObj.enter_password('pwd');
        await addUserPageObj.click_submit();
        await page.waitForTimeout(1000);
        // Check that the text in the element with id=error is not empty
        let errorText = await addUserPageObj.get_error_message();
        console.log("Error text:", errorText);
        assert.notStrictEqual(errorText.trim(), '', 'Error text is empty');
    }, 30000); 
    
    test('add user with incorrect email forms Negative Test',  async ({ page }) => {
        let addUserPageObj = new addUserPage(page);
        await addUserPageObj.navigate();
        await page.waitForTimeout(1000);
        // Enter data into the firstName field
        await addUserPageObj.enter_first_name('firstname');
        // Enter data into the lastName field
        await addUserPageObj.enter_last_name('lastname');
        // Enter data into the emailfield (incorrect email)
        await addUserPageObj.enter_email('email@');
        // Enter data into the password field
        await addUserPageObj.enter_password('correctpassword');
        await addUserPageObj.click_submit();
        await page.waitForTimeout(1000);
        // Check that the text in the element with id=error is not empty
        let errorText = await addUserPageObj.get_error_message();
        console.log("Error text:", errorText);
        assert.notStrictEqual(errorText.trim(), 'User validation failed: email: Email is Invalid', 'Error text is empty');
    }, 30000); 

    test.afterEach(async () => {
        // console.log("after each test");
    });

    test.afterAll(async () => {
        console.log("All tests completed.");
    });
})