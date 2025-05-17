const addUserPage = require('../pom/adduserpage');
const loginPage = require('../pom/loginpage');
const landingPage = require('../pom/landingpage');
const contactListPage = require('../pom/contactlistpage');
const addContactPage = require('../pom/addcontactpage');
const contactDetailsPage = require('../pom/contactdetailspage');
const editContactPage = require('../pom/editcontactpage');
const assert = require('assert');
const { v4: uuidv4 } = require('uuid');


describe('addContactPage Suite', function(){   
    global.addContactPageTestsUUID = null;
    global.addContactPageTestsShortUUID = null
    global.testUserEmail = null;
    global.testUserPassword = null;
    beforeAll(async function() {
        addContactPageTestsUUID = uuidv4();
        console.log("Generated UUID for tests:", addContactPageTestsUUID);
        addContactPageTestsShortUUID = addContactPageTestsUUID.substring(0, 8)
        console.log("Generated ShortUUID for tests:", addContactPageTestsShortUUID);
        await addUserPage.go_to_url(addUserPage.PageUrl);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Enter data into the firstName field
        await addUserPage.enter_first_name(`FNametest2-${global.addContactPageTestsShortUUID}`);
        // Enter data into the lastName field
        await addUserPage.enter_last_name(`LNametest2-${global.addContactPageTestsShortUUID}`);
        // Enter data into the emailfield
        global.testUserEmail2 = `Emailtest2-${global.addContactPageTestsShortUUID}@q.com`;        
        await addUserPage.enter_email(global.testUserEmail2);
        // Enter data into the password field
        global.testUserPassword2 = `Pwdtest2-${global.addContactPageTestsShortUUID}`;
        await addUserPage.enter_password(global.testUserPassword2);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addUserPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
    });

    // Test case to add a contact8 with only first name and last name
    test('login, add contact8, enter only first name and last name Positive Test', async function(){
        await loginPage.login_with_credentials(testUserEmail2, testUserPassword2);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // create contact8
        await contactListPage.click_add_contact();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addContactPage.enter_first_name('firstNamev8');
        await addContactPage.enter_last_name('lastNamev8');
        await addContactPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Verify that the contact8 was created successfully
        let targetContactRow = await contactListPage.get_contact_row_by_first_name("firstNamev8");
        assert.notStrictEqual(targetContactRow, null, 'Target contact row not found in the table');
        await targetContactRow.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Validate redirection to contactPage by checking the URL
        let contactDetailsPageCurrentUrl = await contactDetailsPage.getDriverCurrentUrl();
        console.log("Current URL:", contactDetailsPageCurrentUrl);
        assert.strictEqual(contactDetailsPageCurrentUrl, contactDetailsPage.PageUrl, 'Current URL is not correct');
        // validate contact details firstName
        let firstName = await contactDetailsPage.get_first_name();
        assert.strictEqual(firstName, 'firstNamev8', 'First name is not correct');
        // validate contact details lastName
        let lastName = await contactDetailsPage.get_last_name();
        assert.strictEqual(lastName, 'lastNamev8', 'Last name is not correct');
    }, 30000);

    test('login, add contact, enter wrong birthdate formats Neganive Test', async function(){
        await loginPage.login_with_credentials(testUserEmail2, testUserPassword2);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // create wrong contact
        await contactListPage.click_add_contact();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addContactPage.enter_first_name('firstName_neg');
        await addContactPage.enter_last_name('lastNamev_neg');
        await addContactPage.enter_birthdate('wrongBirthdateFormat');
        await addContactPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Verify that errror message is displayed
        let errorMessage = await addContactPage.get_error_message();
        console.log("Error message:", errorMessage);
        assert.strictEqual(errorMessage, 'Contact validation failed: birthdate: Birthdate is invalid', 'Error message is not correct');
    }, 30000);

    test('login, add contact, enter wrong email address formats Neganive Test', async function(){
        await loginPage.login_with_credentials(testUserEmail2, testUserPassword2);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // create wrong contact
        await contactListPage.click_add_contact();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addContactPage.enter_first_name('firstName_neg');
        await addContactPage.enter_last_name('lastNamev_neg');
        await addContactPage.enter_email('badEmail');
        await addContactPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Verify that errror message is displayed
        let errorMessage = await addContactPage.get_error_message();
        console.log("Error message:", errorMessage);
        assert.strictEqual(errorMessage, 'Contact validation failed: email: Email is invalid', 'Error message is not correct');
    }, 30000);

    test('login, add contact, enter wrong phone number formats Neganive Test', async function(){
        await loginPage.login_with_credentials(testUserEmail2, testUserPassword2);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // create wrong contact
        await contactListPage.click_add_contact();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addContactPage.enter_first_name('firstName_neg');
        await addContactPage.enter_last_name('lastNamev_neg');
        await addContactPage.enter_phone('badPhone');
        await addContactPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Verify that errror message is displayed
        let errorMessage = await addContactPage.get_error_message();
        console.log("Error message:", errorMessage);
        assert.strictEqual(errorMessage, 'Contact validation failed: phone: Phone number is invalid', 'Error message is not correct');
    }, 30000);

    test('login, add contact, enter wrong zip code formats Neganive Test', async function(){
        await loginPage.login_with_credentials(testUserEmail2, testUserPassword2);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // create wrong contact
        await contactListPage.click_add_contact();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addContactPage.enter_first_name('firstName_neg');
        await addContactPage.enter_last_name('lastNamev_neg');
        await addContactPage.enter_postal_code('badZipCode');
        await addContactPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Verify that errror message is displayed
        let errorMessage = await addContactPage.get_error_message();
        console.log("Error message:", errorMessage);
        assert.strictEqual(errorMessage, 'Contact validation failed: postalCode: Postal code is invalid', 'Error message is not correct');
    }, 30000);

    // Test case to add a contact and cancel the operation Neganive Test
    test('login, add contact, cancel operation Positive Test', async function(){
        await loginPage.login_with_credentials(testUserEmail2, testUserPassword2);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // create wrong contact
        await contactListPage.click_add_contact();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addContactPage.enter_first_name('firstName_neg');
        await addContactPage.enter_last_name('lastNamev_neg');
        await addContactPage.click_cancel();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Verify that the redirection to contact list page is successful
        let contactListPageCurrentUrl = await contactListPage.getDriverCurrentUrl();
        console.log("Current URL:", contactListPageCurrentUrl);
        assert.strictEqual(contactListPageCurrentUrl, contactListPage.PageUrl, 'Current URL is not correct');
    }, 30000);

    test('login, add contact, logout Positive Test', async function(){
        await loginPage.login_with_credentials(testUserEmail2, testUserPassword2);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addContactPage.click_logout();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Verify that the redirection to login page is successful
        let landingPageCurrentUrl = await landingPage.getDriverCurrentUrl();
        console.log("Current URL:", landingPageCurrentUrl);
        assert.strictEqual(landingPageCurrentUrl, landingPage.PageUrl, 'Current URL is not correct');
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