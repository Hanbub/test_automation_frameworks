const { test } = require('@playwright/test');
const addUserPage = require('../pom/adduserpage');
const loginPage = require('../pom/loginpage');
const landingPage = require('../pom/landingpage');
const contactListPage = require('../pom/contactlistpage');
const addContactPage = require('../pom/addcontactpage');
const contactDetailsPage = require('../pom/contactdetailspage');
const editContactPage = require('../pom/editcontactpage');
const assert = require('assert');
const { v4: uuidv4 } = require('uuid');

test.describe('editContactPage Suite', () => {
    global.editContactPageTestsUUID = null;
    global.editContactPageTestsShortUUID = null
    global.testUserEmail3 = null;
    global.testUserPassword3 = null;
    test.beforeAll(async ({ browser }) => {
        let context = await browser.newContext();
        let page = await context.newPage();
        let addUserPageObj = new addUserPage(page);
        let addContactPageObj = new addContactPage(page);
        let contactListPageObj = new contactListPage(page);
        editContactPageTestsUUID = uuidv4();
        console.log("Generated UUID for tests:", editContactPageTestsUUID);
        editContactPageTestsShortUUID = editContactPageTestsUUID.substring(0, 8)
        console.log("Generated ShortUUID for tests:", editContactPageTestsShortUUID);
        await addUserPageObj.navigate();
        await page.waitForTimeout(1000);
        // Enter data into the firstName field
        await addUserPageObj.enter_first_name(`PWFName-t3-${global.editContactPageTestsShortUUID}`);
        // Enter data into the lastName field
        await addUserPageObj.enter_last_name(`PWLNamet-t3-${global.editContactPageTestsShortUUID}`);
        // Enter data into the emailfield
        global.testUserEmail3 = `PWEmail-t3-${global.editContactPageTestsShortUUID}@q.com`;        
        await addUserPageObj.enter_email(global.testUserEmail3);
        // Enter data into the password field
        global.testUserPassword3 = `PWPwd-t3-${global.editContactPageTestsShortUUID}`;
        await addUserPageObj.enter_password(global.testUserPassword3);
        await page.waitForTimeout(1000);
        await addUserPageObj.click_submit();
        await page.waitForTimeout(1000);
        await contactListPageObj.click_add_contact();
        await page.waitForTimeout(1000);
        await addContactPageObj.enter_first_name('firstNamev9');
        await addContactPageObj.enter_last_name('lastNamev9');
        await page.waitForTimeout(1000);
        await addContactPageObj.click_submit();
        await page.waitForTimeout(1000);
        await page.close()
    });
    test.beforeEach( async () => {
        // console.log("before each test");
    });

    test('Edit contact with only first name and last name', async ({ page }) => {
        let loginPageObj = new loginPage(page);
        let contactListPageObj = new contactListPage(page);
        let contactDetailsPageObj = new contactDetailsPage(page);
        let editContactPageObj = new editContactPage(page);
        await loginPageObj.login_with_credentials(global.testUserEmail3, global.testUserPassword3);
        await page.waitForTimeout(1000);
        // enter contact9
        let targetContactRow = await contactListPageObj.get_contact_row_by_first_name("firstNamev9");
        assert.notStrictEqual(targetContactRow, null, 'Target contact row not found in the table');
        await targetContactRow.click();
        await page.waitForTimeout(1000);
        await contactDetailsPageObj.click_edit_contact();
        await page.waitForTimeout(1000);
        await editContactPageObj.edit_first_name('edited_firstNamev9');
        await editContactPageObj.edit_last_name('edited_lastNamev9');
        await page.waitForTimeout(1000);
        await editContactPageObj.click_submit();
        await page.waitForTimeout(1000);
        const firstName = await contactDetailsPageObj.get_first_name();
        const lastName = await contactDetailsPageObj.get_last_name();
        assert.strictEqual(firstName, 'edited_firstNamev9');
        assert.strictEqual(lastName, 'edited_lastNamev9');
    }, 30000);

    test('Edit contact with wrong birthdate formats', async ({ page }) => {
        let loginPageObj = new loginPage(page);
        let contactListPageObj = new contactListPage(page);
        let contactDetailsPageObj = new contactDetailsPage(page);
        let editContactPageObj = new editContactPage(page);
        await loginPageObj.login_with_credentials(global.testUserEmail3, global.testUserPassword3);
        await page.waitForTimeout(1000);
        // enter contact9
        let targetContactRow = await contactListPageObj.get_contact_row_by_first_name("firstNamev9");
        assert.notStrictEqual(targetContactRow, null, 'Target contact row not found in the table');
        await targetContactRow.click();
        await page.waitForTimeout(1000);
        await contactDetailsPageObj.click_edit_contact();
        await page.waitForTimeout(1000);
        await editContactPageObj.edit_birthdate('badDate');
        await page.waitForTimeout(1000);
        await editContactPageObj.click_submit();
        await page.waitForTimeout(1000);
        const errorMessage = await editContactPageObj.get_error_message();
        assert.strictEqual(errorMessage, 'Validation failed: birthdate: Birthdate is invalid');
    }, 30000);

    test('Edit contact with wrong email address formats', async ({ page }) => {
        let loginPageObj = new loginPage(page);
        let contactListPageObj = new contactListPage(page);
        let contactDetailsPageObj = new contactDetailsPage(page);
        let editContactPageObj = new editContactPage(page);
        await loginPageObj.login_with_credentials(global.testUserEmail3, global.testUserPassword3);
        await page.waitForTimeout(1000);
        // enter contact9
        let targetContactRow = await contactListPageObj.get_contact_row_by_first_name("firstNamev9");
        assert.notStrictEqual(targetContactRow, null, 'Target contact row not found in the table');
        await targetContactRow.click();
        await page.waitForTimeout(1000);
        await contactDetailsPageObj.click_edit_contact();
        await page.waitForTimeout(1000);
        await editContactPageObj.edit_email('badEmail');
        await page.waitForTimeout(1000);
        await editContactPageObj.click_submit();
        await page.waitForTimeout(1000);
        const errorMessage = await editContactPageObj.get_error_message();
        assert.strictEqual(errorMessage, 'Validation failed: email: Email is invalid');
    }, 30000);

    test('Edit contact with wrong phone number formats', async ({ page }) => {
        let loginPageObj = new loginPage(page);
        let contactListPageObj = new contactListPage(page);
        let contactDetailsPageObj = new contactDetailsPage(page);
        let editContactPageObj = new editContactPage(page);
        await loginPageObj.login_with_credentials(global.testUserEmail3, global.testUserPassword3);
        await page.waitForTimeout(1000);
        // enter contact9
        let targetContactRow = await contactListPageObj.get_contact_row_by_first_name("firstNamev9");
        assert.notStrictEqual(targetContactRow, null, 'Target contact row not found in the table');
        await targetContactRow.click();
        await page.waitForTimeout(1000);
        await contactDetailsPageObj.click_edit_contact();
        await page.waitForTimeout(1000);
        await editContactPageObj.edit_phone('badPhone');
        await page.waitForTimeout(1000);
        await editContactPageObj.click_submit();
        await page.waitForTimeout(1000);
        const errorMessage = await editContactPageObj.get_error_message();
        assert.strictEqual(errorMessage, 'Validation failed: phone: Phone number is invalid');
    }, 30000);

    test('Edit contact with wrong zip code formats', async ({ page }) => {
        let loginPageObj = new loginPage(page);
        let contactListPageObj = new contactListPage(page);
        let contactDetailsPageObj = new contactDetailsPage(page);
        let editContactPageObj = new editContactPage(page);
        await loginPageObj.login_with_credentials(global.testUserEmail3, global.testUserPassword3);
        await page.waitForTimeout(1000);
        // enter contact9
        let targetContactRow = await contactListPageObj.get_contact_row_by_first_name("firstNamev9");
        assert.notStrictEqual(targetContactRow, null, 'Target contact row not found in the table');
        await targetContactRow.click();
        await page.waitForTimeout(1000);
        await contactDetailsPageObj.click_edit_contact();
        await page.waitForTimeout(1000);
        await editContactPageObj.edit_postal_code('badZipCode');
        await page.waitForTimeout(1000);
        await editContactPageObj.click_submit();
        await page.waitForTimeout(1000);
        const errorMessage = await editContactPageObj.get_error_message();
        assert.strictEqual(errorMessage, 'Validation failed: postalCode: Postal code is invalid');
    }, 30000);

    test('Edit contact and cancel', async ({ page }) => {
        let loginPageObj = new loginPage(page);
        let contactListPageObj = new contactListPage(page);
        let contactDetailsPageObj = new contactDetailsPage(page);
        let editContactPageObj = new editContactPage(page);
        await loginPageObj.login_with_credentials(global.testUserEmail3, global.testUserPassword3);
        await page.waitForTimeout(1000);
        // enter contact9
        let targetContactRow = await contactListPageObj.get_contact_row_by_first_name("firstNamev9");
        assert.notStrictEqual(targetContactRow, null, 'Target contact row not found in the table');
        await targetContactRow.click();
        await page.waitForTimeout(1000);
        await contactDetailsPageObj.click_edit_contact();
        await page.waitForTimeout(1000);
        await editContactPageObj.click_cancel();
        await page.waitForTimeout(1000);
        // Verify that the redirection to contact details page is successful
        let contactDetailsCurrentUrl = await page.url();
        console.log("Current URL:", contactDetailsCurrentUrl);
        assert.strictEqual(contactDetailsCurrentUrl, contactDetailsPageObj.PageUrl, 'Current URL is not correct')
    }, 30000);

    test('Edit contact and logout', async ({ page }) => {
        let loginPageObj = new loginPage(page);
        let landingPageObj = new landingPage(page);
        let contactListPageObj = new contactListPage(page);
        let contactDetailsPageObj = new contactDetailsPage(page);
        let editContactPageObj = new editContactPage(page);
        await loginPageObj.login_with_credentials(global.testUserEmail3, global.testUserPassword3);
        await page.waitForTimeout(1000);
        // enter contact9
        let targetContactRow = await contactListPageObj.get_contact_row_by_first_name("firstNamev9");
        assert.notStrictEqual(targetContactRow, null, 'Target contact row not found in the table');
        await targetContactRow.click();
        await page.waitForTimeout(1000);
        await contactDetailsPageObj.click_edit_contact();
        await page.waitForTimeout(1000);
        await editContactPageObj.click_logout();
        await page.waitForTimeout(1000);
        // Verify that the redirection to login page is successful
        let landingPageCurrentUrl = await page.url();
        console.log("Current URL:", landingPageCurrentUrl);
        assert.strictEqual(landingPageCurrentUrl, landingPageObj.PageUrl, 'Current URL is not correct')
    }, 30000);

    test.afterEach(async () => {
        // console.log("after each test");
    });

    test.afterAll(async () => {
        console.log("All tests completed.");
    });
})