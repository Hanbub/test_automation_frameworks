const { test } = require('@playwright/test');
const addUserPage = require('../pom/adduserpage');
const loginPage = require('../pom/loginpage');
const landingPage = require('../pom/landingpage');
const contactListPage = require('../pom/contactlistpage');
const addContactPage = require('../pom/addcontactpage');
const contactDetailsPage = require('../pom/contactdetailspage');
const assert = require('assert');
const { v4: uuidv4 } = require('uuid');

test.describe('addContactPage Suite', () => {
    global.addContactPageTestsUUID = null;
    global.addContactPageTestsShortUUID = null
    global.testUserEmail3 = null;
    global.testUserPassword3 = null;

    test.beforeAll(async ({ browser }) => {
        let context = await browser.newContext();
        let page = await context.newPage();
        let addUserPageObj = new addUserPage(page);
        addContactPageTestsUUID = uuidv4();
        console.log("Generated UUID for tests:", addContactPageTestsUUID);
        addContactPageTestsShortUUID = addContactPageTestsUUID.substring(0, 8)
        console.log("Generated ShortUUID for tests:", addContactPageTestsShortUUID);
        await addUserPageObj.navigate();
        await page.waitForTimeout(1000);
        // Enter data into the firstName field
        await addUserPageObj.enter_first_name(`PWFName-t2-${global.addContactPageTestsShortUUID}`);
        // Enter data into the lastName field
        await addUserPageObj.enter_last_name(`PWLNamet-t2-${global.addContactPageTestsShortUUID}`);
        // Enter data into the emailfield
        global.testUserEmail2 = `PWEmail-t2-${global.addContactPageTestsShortUUID}@q.com`;        
        await addUserPageObj.enter_email(global.testUserEmail2);
        // Enter data into the password field
        global.testUserPassword2 = `PWPwd-t2-${global.addContactPageTestsShortUUID}`;
        await addUserPageObj.enter_password(global.testUserPassword2);
        await page.waitForTimeout(1000);
        await addUserPageObj.click_submit();
        await page.waitForTimeout(1000);
        await page.close()
    });
    test.beforeEach( async () => {
        // console.log("before each test");
    });

    // ---------- TESTS HERE -----------------
    test('login, add contact8, enter only first name and last name Positive Test', async ({ page }) => {
        let loginPageObj = new loginPage(page);
        let contactListPageObj = new contactListPage(page);
        let addContactPageObj = new addContactPage(page);
        let contactDetailsPageObj = new contactDetailsPage(page);
        await loginPageObj.login_with_credentials(testUserEmail2, testUserPassword2);
        await page.waitForTimeout(1000);
        // create contact8
        await contactListPageObj.click_add_contact();
        await page.waitForTimeout(1000);
        await addContactPageObj.enter_first_name('PWfirstNamev8');
        await addContactPageObj.enter_last_name('PWlastNamev8');
        await addContactPageObj.click_submit();
        await page.waitForTimeout(1000);
        // Verify that the contact8 was created successfully
        let targetContactRow = await contactListPageObj.get_contact_row_by_first_name("PWfirstNamev8");
        assert.notStrictEqual(targetContactRow, null, 'Target contact row not found in the table');
        await targetContactRow.click();
        await page.waitForTimeout(1000);
        // Validate redirection to contactPage by checking the URL
        let contactDetailsPageCurrentUrl = await page.url();
        console.log("Current URL:", contactDetailsPageCurrentUrl);
        assert.strictEqual(contactDetailsPageCurrentUrl, contactDetailsPageObj.PageUrl, 'Current URL is not correct');
        // validate contact details firstName
        let firstName = await contactDetailsPageObj.get_first_name();
        assert.strictEqual(firstName, 'PWfirstNamev8', 'First name is not correct');
        // validate contact details lastName
        let lastName = await contactDetailsPageObj.get_last_name();
        assert.strictEqual(lastName, 'PWlastNamev8', 'Last name is not correct');
    }, 30000);

    test('login, add contact, enter wrong birthdate formats Neganive Test', async ({ page }) => {
        let loginPageObj = new loginPage(page);
        let contactListPageObj = new contactListPage(page);
        let addContactPageObj = new addContactPage(page);
        await loginPageObj.login_with_credentials(testUserEmail2, testUserPassword2);
        await page.waitForTimeout(1000);
        // create wrong contact
        await contactListPageObj.click_add_contact();
        await page.waitForTimeout(1000);
        await addContactPageObj.enter_first_name('firstName_neg');
        await addContactPageObj.enter_last_name('lastNamev_neg');
        await addContactPageObj.enter_birthdate('wrongBirthdateFormat');
        await addContactPageObj.click_submit();
        await page.waitForTimeout(1000);
        // Verify that errror message is displayed
        let errorMessage = await addContactPageObj.get_error_message();
        console.log("Error message:", errorMessage);
        assert.strictEqual(errorMessage, 'Contact validation failed: birthdate: Birthdate is invalid', 'Error message is not correct');
    }, 30000);

    test('login, add contact, enter wrong email address formats Neganive Test', async ({ page }) => {
        let loginPageObj = new loginPage(page);
        let contactListPageObj = new contactListPage(page);
        let addContactPageObj = new addContactPage(page);
        await loginPageObj.login_with_credentials(testUserEmail2, testUserPassword2);
        await page.waitForTimeout(1000);
        // create wrong contact
        await contactListPageObj.click_add_contact();
        await page.waitForTimeout(1000);
        await addContactPageObj.enter_first_name('firstName_neg');
        await addContactPageObj.enter_last_name('lastNamev_neg');
        await addContactPageObj.enter_email('badEmail');
        await addContactPageObj.click_submit();
        await page.waitForTimeout(1000);
        // Verify that errror message is displayed
        let errorMessage = await addContactPageObj.get_error_message();
        console.log("Error message:", errorMessage);
        assert.strictEqual(errorMessage, 'Contact validation failed: email: Email is invalid', 'Error message is not correct');
    }, 30000);

    test('login, add contact, enter wrong phone number formats Neganive Test', async ({ page }) => {
        let loginPageObj = new loginPage(page);
        let contactListPageObj = new contactListPage(page);
        let addContactPageObj = new addContactPage(page);
        await loginPageObj.login_with_credentials(testUserEmail2, testUserPassword2);
        await page.waitForTimeout(1000);
        // create wrong contact
        await contactListPageObj.click_add_contact();
        await page.waitForTimeout(1000);
        await addContactPageObj.enter_first_name('firstName_neg');
        await addContactPageObj.enter_last_name('lastNamev_neg');
        await addContactPageObj.enter_phone('badPhone');
        await addContactPageObj.click_submit();
        await page.waitForTimeout(1000);
        // Verify that errror message is displayed
        let errorMessage = await addContactPageObj.get_error_message();
        console.log("Error message:", errorMessage);
        assert.strictEqual(errorMessage, 'Contact validation failed: phone: Phone number is invalid', 'Error message is not correct');
    }, 30000);

    test('login, add contact, enter wrong zip code formats Neganive Test', async ({ page }) => {
        let loginPageObj = new loginPage(page);
        let contactListPageObj = new contactListPage(page);
        let addContactPageObj = new addContactPage(page);
        await loginPageObj.login_with_credentials(testUserEmail2, testUserPassword2);
        await page.waitForTimeout(1000);
        // create wrong contact
        await contactListPageObj.click_add_contact();
        await page.waitForTimeout(1000);
        await addContactPageObj.enter_first_name('firstName_neg');
        await addContactPageObj.enter_last_name('lastNamev_neg');
        await addContactPageObj.enter_postal_code('badZipCode');
        await addContactPageObj.click_submit();
        await page.waitForTimeout(1000);
        // Verify that errror message is displayed
        let errorMessage = await addContactPageObj.get_error_message();
        console.log("Error message:", errorMessage);
        assert.strictEqual(errorMessage, 'Contact validation failed: postalCode: Postal code is invalid', 'Error message is not correct');
    }, 30000);

    test('login, add contact, cancel operation Positive Test', async ({ page }) => {
        let loginPageObj = new loginPage(page);
        let contactListPageObj = new contactListPage(page);
        let addContactPageObj = new addContactPage(page);
        await loginPageObj.login_with_credentials(testUserEmail2, testUserPassword2);
        await page.waitForTimeout(1000);
        // create wrong contact
        await contactListPageObj.click_add_contact();
        await page.waitForTimeout(1000);
        await addContactPageObj.enter_first_name('firstName_neg');
        await addContactPageObj.enter_last_name('lastNamev_neg');
        await addContactPageObj.click_cancel();
        await page.waitForTimeout(1000);
        // Verify that the redirection to contact list page is successful
        let contactListPageCurrentUrl = await page.url();
        console.log("Current URL:", contactListPageCurrentUrl);
        assert.strictEqual(contactListPageCurrentUrl, contactListPageObj.PageUrl, 'Current URL is not correct');
    }, 30000);

    test('login, add contact, logout Positive Test', async ({ page }) => {
        let loginPageObj = new loginPage(page);
        let addContactPageObj = new addContactPage(page);
        let landingPageObj = new landingPage(page);
        await loginPageObj.login_with_credentials(testUserEmail2, testUserPassword2);
        await page.waitForTimeout(1000);
        await addContactPageObj.click_logout();
        await page.waitForTimeout(1000);
        // Verify that the redirection to login page is successful
        let landingPageCurrentUrl = await page.url();
        console.log("Current URL:", landingPageCurrentUrl);
        assert.strictEqual(landingPageCurrentUrl, landingPageObj.PageUrl, 'Current URL is not correct');
    }, 30000);

    test.afterEach(async () => {
        // console.log("after each test");
    });

    test.afterAll(async () => {
        console.log("All tests completed.");
    });
})