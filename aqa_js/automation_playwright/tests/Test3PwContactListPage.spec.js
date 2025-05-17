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

test.describe('addContactPage Suite', () => {
    global.contactListPageTestsUUID = null;
    global.contactListPageTestsShortUUID = null
    global.testUserEmail = null;
    global.testUserPassword = null;
    test.beforeAll(async ({ browser }) => {
        let context = await browser.newContext();
        let page = await context.newPage();
        let addUserPageObj = new addUserPage(page);
        contactListPageTestsUUID = uuidv4();
        console.log("Generated UUID for tests:", contactListPageTestsUUID);
        contactListPageTestsShortUUID = contactListPageTestsUUID.substring(0, 8)
        console.log("Generated ShortUUID for tests:", contactListPageTestsShortUUID);
        await addUserPageObj.navigate();
        await page.waitForTimeout(1000);
        // Enter data into the firstName field
        await addUserPageObj.enter_first_name(`PWFNametest-${global.contactListPageTestsShortUUID}`);
        // Enter data into the lastName field
        await addUserPageObj.enter_last_name(`PWLNametest-${global.contactListPageTestsShortUUID}`);
        // Enter data into the emailfield
        global.testUserEmail = `PWEmailtest-${global.contactListPageTestsShortUUID}@q.com`;        
        await addUserPageObj.enter_email(global.testUserEmail);
        // Enter data into the password field
        global.testUserPassword = `PWPwdtest-${global.contactListPageTestsShortUUID}`;
        await addUserPageObj.enter_password(global.testUserPassword);
        await page.waitForTimeout(1000);
        await addUserPageObj.click_submit();
        await page.waitForTimeout(1000);
        await page.close()
    });
    test.beforeEach( async () => {
        // console.log("before each test");
    });

    test('login and create contact1 Positive Test', async ({ page }) => {
        let loginPageObj = new loginPage(page);
        let landingPageObj = new landingPage(page);
        let contactListPageObj = new contactListPage(page);
        let addContactPageObj = new addContactPage(page);
        await loginPageObj.login_with_credentials(testUserEmail, testUserPassword);
        await page.waitForTimeout(1000);
        // create contact1
        await contactListPageObj.click_add_contact();
        // Validate redirection to addContactPage by checking the URL
        let addContactCurrentUrl = await page.url(); 
        console.log("Current URL:", addContactCurrentUrl);
        assert.strictEqual(addContactCurrentUrl, addContactPageObj.PageUrl, 'Current URL is not correct');
        // fill in contact1 details
        await addContactPageObj.add_sample_contact_with_index("1");
        await page.waitForTimeout(1000);
        await addContactPageObj.click_submit();
        await page.waitForTimeout(1000);
        // Validate redirection to contactListPage by checking the URL 
        let contactCreatedCurrentUrl = await page.url();
        console.log("Current URL:", contactCreatedCurrentUrl);
        assert.strictEqual(contactCreatedCurrentUrl, contactListPageObj.PageUrl, 'Current URL is not correct');
        // logout
        await contactListPageObj.click_logout();
        await page.waitForTimeout(1000);
        // Validate redirection to landingPage by checking the URL
        let landingPageCurrentUrl = await page.url();
        console.log("Current URL:", landingPageCurrentUrl);
        assert.strictEqual(landingPageCurrentUrl, landingPageObj.PageUrl, 'Current URL is not correct');
    }, 30000);  

    test('login, create contact2, enter contactpage and logout Positive Test', async ({ page }) => {
        let loginPageObj = new loginPage(page);
        let landingPageObj = new landingPage(page);
        let contactListPageObj = new contactListPage(page);
        let addContactPageObj = new addContactPage(page);
        let contactDetailsPageObj = new contactDetailsPage(page);
        await loginPageObj.login_with_credentials(testUserEmail, testUserPassword);
        await page.waitForTimeout(1000);
        // create contact2
        await contactListPageObj.click_add_contact();
        // Validate redirection to addContactPage by checking the URL
        let addContactCurrentUrl = await page.url();
        console.log("Current URL:", addContactCurrentUrl);
        assert.strictEqual(addContactCurrentUrl, addContactPageObj.PageUrl, 'Current URL is not correct');
        // fill in contact2 details
        await addContactPageObj.add_sample_contact_with_index("2");
        await page.waitForTimeout(1000);
        await addContactPageObj.click_submit();
        await page.waitForTimeout(1000);
        // enter contact2 page
        let targetContactRow = await contactListPageObj.get_contact_row_by_first_name("firstNamev2");
        assert.notStrictEqual(targetContactRow, null, 'Target contact row not found in the table');
        await targetContactRow.click();
        await page.waitForTimeout(1000);
        // Validate redirection to contactPage by checking the URL
        let contactDetailsPageCurrentUrl = await page.url();
        console.log("Current URL:", contactDetailsPageCurrentUrl);
        assert.strictEqual(contactDetailsPageCurrentUrl, contactDetailsPageObj.PageUrl, 'Current URL is not correct');
        // validate created contact details
        assert.strictEqual(await contactDetailsPageObj.get_first_name(), "firstNamev2", 'First name is not correct');
        assert.strictEqual(await contactDetailsPageObj.get_last_name(), "lastNamev2", 'Last name is not correct'); 
        assert.strictEqual(await contactDetailsPageObj.get_email(), "emailv2@q.com", 'Email is not correct');
        assert.strictEqual(await contactDetailsPageObj.get_birthdate(), "2023-10-01", 'Birthdate is not correct');
        assert.strictEqual(await contactDetailsPageObj.get_phone(), "1234567890", 'Phone is not correct');
        assert.strictEqual(await contactDetailsPageObj.get_street1(), "street1v2", 'Street1 is not correct');
        assert.strictEqual(await contactDetailsPageObj.get_street2(), "street2v2", 'Street2 is not correct');
        assert.strictEqual(await contactDetailsPageObj.get_city(), "cityv2", 'City is not correct');
        assert.strictEqual(await contactDetailsPageObj.get_state(), "statev2", 'State is not correct');
        assert.strictEqual(await contactDetailsPageObj.get_postal_code(), "12345", 'Postal code is not correct');
        assert.strictEqual(await contactDetailsPageObj.get_country(), "countryv2", 'Country is not correct');
        // logout
        await contactDetailsPageObj.click_logout();
        await page.waitForTimeout(1000);
        // Validate redirection to loginPage by checking the URL
        let landingPageCurrentUrl = await page.url();
        console.log("Current URL:", landingPageCurrentUrl);
        assert.strictEqual(landingPageCurrentUrl, landingPageObj.PageUrl, 'Current URL is not correct');
    }, 30000); 

    test('login, create contact3, enter contactpage3 and return to contact list Positive Test', async ({ page }) => {
        let loginPageObj = new loginPage(page);
        let contactListPageObj = new contactListPage(page);
        let addContactPageObj = new addContactPage(page);
        let contactDetailsPageObj = new contactDetailsPage(page);
        await loginPageObj.login_with_credentials(testUserEmail, testUserPassword);
        await page.waitForTimeout(1000);
        // create contact3
        await contactListPageObj.click_add_contact();
        // fill in contact3 details
        await addContactPageObj.add_sample_contact_with_index("3");
        await page.waitForTimeout(1000);
        await addContactPageObj.click_submit();
        await page.waitForTimeout(1000);
        // enter contact3 page
        let targetContactRow = await contactListPageObj.get_contact_row_by_first_name("firstNamev3");
        assert.notStrictEqual(targetContactRow, null, 'Target contact row not found in the table');
        await targetContactRow.click();
        await page.waitForTimeout(1000);
        // return to contact list
        await contactDetailsPageObj.click_back_to_contact_list();
        await page.waitForTimeout(1000);
        // Validate redirection to contactListPage by checking the URL
        let contactListPageCurrentUrl = await page.url();
        console.log("Current URL:", contactListPageCurrentUrl);
        assert.strictEqual(contactListPageCurrentUrl, contactListPageObj.PageUrl, 'Current URL is not correct');
    }, 30000);

    test('login, create contact4, enter contactpage4, edit contact4 and logout Positive Test', async ({ page }) => {
        let loginPageObj = new loginPage(page);
        let landingPageObj = new landingPage(page);
        let contactListPageObj = new contactListPage(page);
        let addContactPageObj = new addContactPage(page);
        let contactDetailsPageObj = new contactDetailsPage(page);
        let editContactPageObj = new editContactPage(page);
        await loginPageObj.login_with_credentials(testUserEmail, testUserPassword);
        await page.waitForTimeout(1000);
        // create contact4
        await contactListPageObj.click_add_contact();
        await page.waitForTimeout(1000);
        // fill in contact4 details
        await addContactPageObj.add_sample_contact_with_index("4");
        await page.waitForTimeout(1000);
        await addContactPageObj.click_submit();
        await page.waitForTimeout(1000);
        // enter contact4 page
        let targetContactRow = await contactListPageObj.get_contact_row_by_first_name("firstNamev4");
        assert.notStrictEqual(targetContactRow, null, 'Target contact row not found in the table');
        await targetContactRow.click();
        await page.waitForTimeout(1000);
        // click on edit contact button
        await contactDetailsPageObj.click_edit_contact();
        await page.waitForTimeout(1000);
        // Validate redirection to editContactPage by checking the URL
        let editContactPageCurrentUrl = await page.url();
        console.log("Current URL:", editContactPageCurrentUrl);
        assert.strictEqual(editContactPageCurrentUrl, editContactPageObj.PageUrl, 'Current URL is not correct');
        // edit all fields in contact4
        await editContactPageObj.edit_sample_contact("4");
        await editContactPageObj.click_logout();
        await page.waitForTimeout(1000);
        // Validate redirection to landingPage by checking the URL
        let landingPageCurrentUrl = await page.url();
        console.log("Current URL:", landingPageCurrentUrl);
        assert.strictEqual(landingPageCurrentUrl, landingPageObj.PageUrl, 'Current URL is not correct');
    }, 30000)

    test('login, create contact5, enter contactpage5, edit contact5 and submit Positive Test', async ({ page }) => {
        let loginPageObj = new loginPage(page);
        let contactListPageObj = new contactListPage(page);
        let addContactPageObj = new addContactPage(page);
        let contactDetailsPageObj = new contactDetailsPage(page);
        let editContactPageObj = new editContactPage(page);
        await loginPageObj.login_with_credentials(testUserEmail, testUserPassword);
        let contact_index = "5";
        await page.waitForTimeout(1000);
        // create contact5
        await contactListPageObj.click_add_contact();
        await page.waitForTimeout(1000);
        // fill in contact5 details
        await addContactPageObj.add_sample_contact_with_index(contact_index);
        await page.waitForTimeout(1000);
        await addContactPageObj.click_submit();
        await page.waitForTimeout(1000);
        // enter contact5 page
        let targetContactRow = await contactListPageObj.get_contact_row_by_first_name("firstNamev5");
        assert.notStrictEqual(targetContactRow, null, 'Target contact row not found in the table');
        await targetContactRow.click();
        await page.waitForTimeout(1000);
        // click on edit contact button
        await contactDetailsPageObj.click_edit_contact();
        await page.waitForTimeout(1000);
        // Validate redirection to editContactPage by checking the URL
        let editContactPageCurrentUrl = await page.url();
        console.log("Current URL:", editContactPageCurrentUrl);
        assert.strictEqual(editContactPageCurrentUrl, editContactPageObj.PageUrl, 'Current URL is not correct');
        // edit all fields in contact5
        await editContactPageObj.edit_sample_contact(contact_index);
        await editContactPageObj.click_submit();
        await page.waitForTimeout(1000);
        // todo: validate contact5 details
        assert.strictEqual(await contactDetailsPageObj.get_first_name(), "edited_firstNamev5", 'First name is not correct');
        assert.strictEqual(await contactDetailsPageObj.get_last_name(), "edited_lastNamev5", 'Last name is not correct'); 
        assert.strictEqual(await contactDetailsPageObj.get_email(), "edited_emailv5@q.com", 'Email is not correct');
        assert.strictEqual(await contactDetailsPageObj.get_birthdate(), "1970-01-01", 'Birthdate is not correct');
        assert.strictEqual(await contactDetailsPageObj.get_phone(), "001234567890", 'Phone is not correct');
        assert.strictEqual(await contactDetailsPageObj.get_street1(), "edited_street1v5", 'Street1 is not correct');
        assert.strictEqual(await contactDetailsPageObj.get_street2(), "edited_street2v5", 'Street2 is not correct');
        assert.strictEqual(await contactDetailsPageObj.get_city(), "edited_cityv5", 'City is not correct');
        assert.strictEqual(await contactDetailsPageObj.get_state(), "edited_statev5", 'State is not correct');
        assert.strictEqual(await contactDetailsPageObj.get_postal_code(), "0012345", 'Postal code is not correct');
        assert.strictEqual(await contactDetailsPageObj.get_country(), "edited_countryv5", 'Country is not correct');
    }, 30000);

    test('login, create contact6, enter contactpage6, edit contact6 and cancel Positive Test', async ({ page }) => {
        let loginPageObj = new loginPage(page);
        let contactListPageObj = new contactListPage(page);
        let addContactPageObj = new addContactPage(page);
        let contactDetailsPageObj = new contactDetailsPage(page);
        let editContactPageObj = new editContactPage(page);
        await loginPageObj.login_with_credentials(testUserEmail, testUserPassword);
        let contact_index = "6";
        await page.waitForTimeout(1000);
        // create contact6
        await contactListPageObj.click_add_contact();
        await page.waitForTimeout(1000);
        // fill in contact6 details
        await addContactPageObj.add_sample_contact_with_index(contact_index);
        await page.waitForTimeout(1000);
        await addContactPageObj.click_submit();
        await page.waitForTimeout(1000);
        // enter contact6 page
        let targetContactRow = await contactListPageObj.get_contact_row_by_first_name("firstNamev6");
        assert.notStrictEqual(targetContactRow, null, 'Target contact row not found in the table');
        await targetContactRow.click();
        await page.waitForTimeout(1000);
        // click on edit contact button
        await contactDetailsPageObj.click_edit_contact();
        await page.waitForTimeout(1000);
        // Validate redirection to editContactPage by checking the URL
        let editContactPageCurrentUrl = await page.url();
        console.log("Current URL:", editContactPageCurrentUrl);
        assert.strictEqual(editContactPageCurrentUrl, editContactPageObj.PageUrl, 'Current URL is not correct');
        // edit all fields in contact6
        await editContactPageObj.edit_sample_contact(contact_index);
        await page.waitForTimeout(1000);
        await editContactPageObj.click_cancel();
        await page.waitForTimeout(1000);
        // Validate redirection to contactDetailsPage by checking the URL
        let contactDetailsPageCurrentUrl = await page.url();
        console.log("Current URL:", contactDetailsPageCurrentUrl);
        assert.strictEqual(contactDetailsPageCurrentUrl, contactDetailsPageObj.PageUrl, 'Current URL is not correct');
    }, 30000)

    test('login, create contact7, enter contactpage7, delete contact7 and validate contact7 does not exist Positive Test', async ({ page }) => {
        let loginPageObj = new loginPage(page);
        let contactListPageObj = new contactListPage(page);
        let addContactPageObj = new addContactPage(page);
        let contactDetailsPageObj = new contactDetailsPage(page);
        await loginPageObj.login_with_credentials(testUserEmail, testUserPassword);
        let contact_index = "7";
        await page.waitForTimeout(1000);
        // create contact7
        await contactListPageObj.click_add_contact();
        await page.waitForTimeout(1000);
        // fill in contact7 details
        await addContactPageObj.add_sample_contact_with_index(contact_index);
        await page.waitForTimeout(1000);
        await addContactPageObj.click_submit();
        await page.waitForTimeout(1000);
        // enter contact7 page
        let targetContactRow = await contactListPageObj.get_contact_row_by_first_name("firstNamev7");
        assert.notStrictEqual(targetContactRow, null, 'Target contact row not found in the table');
        await targetContactRow.click();
        await page.waitForTimeout(1000);
        // click on delete contact button and confirm alert
        page.once('dialog', async dialog => {
            await dialog.accept();
        });
        await contactDetailsPageObj.click_delete_contact()
        console.log("contact 7 deleted")
        await page.waitForTimeout(1000);
        // Validate redirection to contactListPage by checking the URL
        let contactListPageCurrentUrl = await page.url();
        console.log("Current URL:", contactListPageCurrentUrl);
        assert.strictEqual(contactListPageCurrentUrl, contactListPageObj.PageUrl, 'Current URL is not correct');
        // validate that the deleted contact does not exist in the list
        await page.waitForTimeout(5000);
        let table_header_locator = await page.locator('tr', { hasText: 'State/Province,'})
        let found_table_header_locators = await table_header_locator.count()
        console.log(`locators tr with text 'State/Province,' count: ${found_table_header_locators}`)
        assert.strictEqual(found_table_header_locators, 1, 'Column with "State/Province," should exist on the page');
        let removed_raw_locator = await page.locator('tr', { hasText: 'firstNamev7' })
        let found_removed_raw_locators = await removed_raw_locator.count()
        console.log(`locators tr with text 'firstNamev7' count: ${found_removed_raw_locators}`)
        assert.strictEqual(found_removed_raw_locators, 0, 'Contact "firstNamev7" should not exist on the page');
    }, 30000);

    test.afterEach(async () => {
        // console.log("after each test");
    });

    test.afterAll(async () => {
        console.log("All tests completed.");
    });
})