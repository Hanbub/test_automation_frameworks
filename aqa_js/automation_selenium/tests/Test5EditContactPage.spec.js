const addUserPage = require('../pom/adduserpage');
const loginPage = require('../pom/loginpage');
const landingPage = require('../pom/landingpage');
const contactListPage = require('../pom/contactlistpage');
const addContactPage = require('../pom/addcontactpage');
const contactDetailsPage = require('../pom/contactdetailspage');
const editContactPage = require('../pom/editcontactpage');
const assert = require('assert');
const { v4: uuidv4 } = require('uuid');


describe('editContactPage Suite', function(){   
    global.editContactPageTestsUUID = null;
    global.editContactPageTestsShortUUID = null
    global.testUserEmail3 = null;
    global.testUserPassword3 = null;
    beforeAll(async function() {
        editContactPageTestsUUID = uuidv4();
        console.log("Generated UUID for tests:", editContactPageTestsUUID);
        editContactPageTestsShortUUID = editContactPageTestsUUID.substring(0, 8)
        console.log("Generated ShortUUID for tests:", editContactPageTestsShortUUID);
        await addUserPage.go_to_url(addUserPage.PageUrl);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Enter data into the firstName field
        await addUserPage.enter_first_name(`FNametest3-${global.editContactPageTestsShortUUID}`);
        // Enter data into the lastName field
        await addUserPage.enter_last_name(`LNametest3-${global.editContactPageTestsShortUUID}`);
        // Enter data into the emailfield
        global.testUserEmail3 = `Emailtest3-${global.editContactPageTestsShortUUID}@q.com`;        
        await addUserPage.enter_email(global.testUserEmail3);
        // Enter data into the password field
        global.testUserPassword3 = `Pwdtest3-${global.editContactPageTestsShortUUID}`;
        await addUserPage.enter_password(global.testUserPassword3);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addUserPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await contactListPage.click_add_contact();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addContactPage.enter_first_name('firstNamev9');
        await addContactPage.enter_last_name('lastNamev9');
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addContactPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }, 30000);
    
    test('Edit contact with only first name and last name', async function() {
        await loginPage.login_with_credentials(testUserEmail3, testUserPassword3);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // enter contact9
        let targetContactRow = await contactListPage.get_contact_row_by_first_name("firstNamev9");
        assert.notStrictEqual(targetContactRow, null, 'Target contact row not found in the table');
        await targetContactRow.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await contactDetailsPage.click_edit_contact();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await editContactPage.edit_first_name('edited_firstNamev9');
        await editContactPage.edit_last_name('edited_lastNamev9');
        await new Promise(resolve => setTimeout(resolve, 1000));
        await editContactPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        const firstName = await contactDetailsPage.get_first_name();
        const lastName = await contactDetailsPage.get_last_name();
        assert.strictEqual(firstName, 'edited_firstNamev9');
        assert.strictEqual(lastName, 'edited_lastNamev9');
    }, 30000);

    test('Edit contact with wrong birthdate formats', async function() {
        await loginPage.login_with_credentials(testUserEmail3, testUserPassword3);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // enter contact9
        let targetContactRow = await contactListPage.get_contact_row_by_first_name("firstNamev9");
        assert.notStrictEqual(targetContactRow, null, 'Target contact row not found in the table');
        await targetContactRow.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await contactDetailsPage.click_edit_contact();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await editContactPage.edit_birthdate('badDate');
        await new Promise(resolve => setTimeout(resolve, 1000));
        await editContactPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        const errorMessage = await editContactPage.get_error_message();
        assert.strictEqual(errorMessage, 'Validation failed: birthdate: Birthdate is invalid');
    }, 30000);

    test('Edit contact with wrong email address formats', async function() {
        await loginPage.login_with_credentials(testUserEmail3, testUserPassword3);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // enter contact9
        let targetContactRow = await contactListPage.get_contact_row_by_first_name("firstNamev9");
        assert.notStrictEqual(targetContactRow, null, 'Target contact row not found in the table');
        await targetContactRow.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await contactDetailsPage.click_edit_contact();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await editContactPage.edit_email('badEmail');
        await new Promise(resolve => setTimeout(resolve, 1000));
        await editContactPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        const errorMessage = await editContactPage.get_error_message();
        assert.strictEqual(errorMessage, 'Validation failed: email: Email is invalid');
    }, 30000);

    test('Edit contact with wrong phone number formats', async function() {
        await loginPage.login_with_credentials(testUserEmail3, testUserPassword3);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // enter contact9
        let targetContactRow = await contactListPage.get_contact_row_by_first_name("firstNamev9");
        assert.notStrictEqual(targetContactRow, null, 'Target contact row not found in the table');
        await targetContactRow.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await contactDetailsPage.click_edit_contact();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await editContactPage.edit_phone('badPhone');
        await new Promise(resolve => setTimeout(resolve, 1000));
        await editContactPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        const errorMessage = await editContactPage.get_error_message();
        assert.strictEqual(errorMessage, 'Validation failed: phone: Phone number is invalid');
    }, 30000);

    test('Edit contact with wrong zip code formats', async function() {
        await loginPage.login_with_credentials(testUserEmail3, testUserPassword3);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // enter contact9
        let targetContactRow = await contactListPage.get_contact_row_by_first_name("firstNamev9");
        assert.notStrictEqual(targetContactRow, null, 'Target contact row not found in the table');
        await targetContactRow.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await contactDetailsPage.click_edit_contact();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await editContactPage.edit_postal_code('badZipCode');
        await new Promise(resolve => setTimeout(resolve, 1000));
        await editContactPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        const errorMessage = await editContactPage.get_error_message();
        assert.strictEqual(errorMessage, 'Validation failed: postalCode: Postal code is invalid');
    }, 30000);

    test('Edit contact and cancel', async function() {
        await loginPage.login_with_credentials(testUserEmail3, testUserPassword3);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // enter contact9
        let targetContactRow = await contactListPage.get_contact_row_by_first_name("firstNamev9");
        assert.notStrictEqual(targetContactRow, null, 'Target contact row not found in the table');
        await targetContactRow.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await contactDetailsPage.click_edit_contact();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await editContactPage.click_cancel();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Verify that the redirection to contact details page is successful
        let contactDetailsCurrentUrl = await contactDetailsPage.getDriverCurrentUrl();
        console.log("Current URL:", contactDetailsCurrentUrl);
        assert.strictEqual(contactDetailsCurrentUrl, contactDetailsPage.PageUrl, 'Current URL is not correct')
    }, 30000);

    test('Edit contact and logout', async function() {
        await loginPage.login_with_credentials(testUserEmail3, testUserPassword3);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // enter contact9
        let targetContactRow = await contactListPage.get_contact_row_by_first_name("firstNamev9");
        assert.notStrictEqual(targetContactRow, null, 'Target contact row not found in the table');
        await targetContactRow.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await contactDetailsPage.click_edit_contact();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await editContactPage.click_logout();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Verify that the redirection to login page is successful
        let landingPageCurrentUrl = await landingPage.getDriverCurrentUrl();
        console.log("Current URL:", landingPageCurrentUrl);
        assert.strictEqual(landingPageCurrentUrl, landingPage.PageUrl, 'Current URL is not correct')
    }, 30000);

    beforeEach(async function () {
        // console.log("before each test");
    });
    afterEach(async function(){
            // console.log("after each test");
        });
    
    afterAll(async () => {
        console.log("All tests completed.");
        await addUserPage.closeBrowser();
    });
})