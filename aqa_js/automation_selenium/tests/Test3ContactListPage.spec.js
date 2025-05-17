const addUserPage = require('../pom/adduserpage');
const loginPage = require('../pom/loginpage');
const landingPage = require('../pom/landingpage');
const contactListPage = require('../pom/contactlistpage');
const addContactPage = require('../pom/addcontactpage');
const contactDetailsPage = require('../pom/contactdetailspage');
const editContactPage = require('../pom/editcontactpage');
const assert = require('assert');
const { v4: uuidv4 } = require('uuid');


describe('contactListPage Suite', function(){   
    global.contactListPageTestsUUID = null;
    global.contactListPageTestsShortUUID = null
    global.testUserEmail = null;
    global.testUserPassword = null;
    beforeAll(async function() {
        contactListPageTestsUUID = uuidv4();
        console.log("Generated UUID for tests:", contactListPageTestsUUID);
        contactListPageTestsShortUUID = contactListPageTestsUUID.substring(0, 8)
        console.log("Generated ShortUUID for tests:", contactListPageTestsShortUUID);
        await addUserPage.go_to_url(addUserPage.PageUrl);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Enter data into the firstName field
        await addUserPage.enter_first_name(`FNametest-${global.contactListPageTestsShortUUID}`);
        // Enter data into the lastName field
        await addUserPage.enter_last_name(`LNametest-${global.contactListPageTestsShortUUID}`);
        // Enter data into the emailfield
        global.testUserEmail = `Emailtest-${global.contactListPageTestsShortUUID}@q.com`;        
        await addUserPage.enter_email(global.testUserEmail);
        // Enter data into the password field
        global.testUserPassword = `Pwdtest-${global.contactListPageTestsShortUUID}`;
        await addUserPage.enter_password(global.testUserPassword);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addUserPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
    });

    beforeEach(async function () {
        // console.log("before each test");
    });

    test('login and create contact1 Positive Test', async function(){
        await loginPage.login_with_credentials(testUserEmail, testUserPassword);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // create contact1
        await contactListPage.click_add_contact();
        // Validate redirection to addContactPage by checking the URL
        let addContactCurrentUrl = await addContactPage.getDriverCurrentUrl(); 
        console.log("Current URL:", addContactCurrentUrl);
        assert.strictEqual(addContactCurrentUrl, addContactPage.PageUrl, 'Current URL is not correct');
        // fill in contact1 details
        await addContactPage.add_sample_contact_with_index("1");
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addContactPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Validate redirection to contactListPage by checking the URL 
        let contactCreatedCurrentUrl = await contactListPage.getDriverCurrentUrl();
        console.log("Current URL:", contactCreatedCurrentUrl);
        assert.strictEqual(contactCreatedCurrentUrl, contactListPage.PageUrl, 'Current URL is not correct');
        // logout
        await contactListPage.click_logout();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Validate redirection to loginPage by checking the URL
        let landingPageCurrentUrl = await landingPage.getDriverCurrentUrl();
        console.log("Current URL:", landingPageCurrentUrl);
        assert.strictEqual(landingPageCurrentUrl, landingPage.PageUrl, 'Current URL is not correct');
    }, 30000); 
    
    test('login, create contact2, enter contactpage and logout Positive Test', async function(){
        await loginPage.login_with_credentials(testUserEmail, testUserPassword);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // create contact2
        await contactListPage.click_add_contact();
        // Validate redirection to addContactPage by checking the URL
        let addContactCurrentUrl = await addContactPage.getDriverCurrentUrl(); 
        console.log("Current URL:", addContactCurrentUrl);
        assert.strictEqual(addContactCurrentUrl, addContactPage.PageUrl, 'Current URL is not correct');
        // fill in contact2 details
        await addContactPage.add_sample_contact_with_index("2");
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addContactPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // enter contact2 page
        let targetContactRow = await contactListPage.get_contact_row_by_first_name("firstNamev2");
        assert.notStrictEqual(targetContactRow, null, 'Target contact row not found in the table');
        await targetContactRow.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Validate redirection to contactPage by checking the URL
        let contactDetailsPageCurrentUrl = await contactDetailsPage.getDriverCurrentUrl();
        console.log("Current URL:", contactDetailsPageCurrentUrl);
        assert.strictEqual(contactDetailsPageCurrentUrl, contactDetailsPage.PageUrl, 'Current URL is not correct');
        // validate created contact details
        assert.strictEqual(await contactDetailsPage.get_first_name(), "firstNamev2", 'First name is not correct');
        assert.strictEqual(await contactDetailsPage.get_last_name(), "lastNamev2", 'Last name is not correct'); 
        assert.strictEqual(await contactDetailsPage.get_email(), "emailv2@q.com", 'Email is not correct');
        assert.strictEqual(await contactDetailsPage.get_birthdate(), "2023-10-01", 'Birthdate is not correct');
        assert.strictEqual(await contactDetailsPage.get_phone(), "1234567890", 'Phone is not correct');
        assert.strictEqual(await contactDetailsPage.get_street1(), "street1v2", 'Street1 is not correct');
        assert.strictEqual(await contactDetailsPage.get_street2(), "street2v2", 'Street2 is not correct');
        assert.strictEqual(await contactDetailsPage.get_city(), "cityv2", 'City is not correct');
        assert.strictEqual(await contactDetailsPage.get_state(), "statev2", 'State is not correct');
        assert.strictEqual(await contactDetailsPage.get_postal_code(), "12345", 'Postal code is not correct');
        assert.strictEqual(await contactDetailsPage.get_country(), "countryv2", 'Country is not correct');
        // logout
        await contactDetailsPage.click_logout();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Validate redirection to loginPage by checking the URL
        let landingPageCurrentUrl = await landingPage.getDriverCurrentUrl();
        console.log("Current URL:", landingPageCurrentUrl);
        assert.strictEqual(landingPageCurrentUrl, landingPage.PageUrl, 'Current URL is not correct');
    }, 30000); 

    test('login, create contact3, enter contactpage3 and return to contact list Positive Test', async function(){
        await loginPage.login_with_credentials(testUserEmail, testUserPassword);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // create contact3
        await contactListPage.click_add_contact();
        // fill in contact3 details
        await addContactPage.add_sample_contact_with_index("3");
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addContactPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // enter contact3 page
        let targetContactRow = await contactListPage.get_contact_row_by_first_name("firstNamev3");
        assert.notStrictEqual(targetContactRow, null, 'Target contact row not found in the table');
        await targetContactRow.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // return to contact list
        await contactDetailsPage.click_back_to_contact_list();
        // Validate redirection to contactListPage by checking the URL
        let contactListPageCurrentUrl = await contactListPage.getDriverCurrentUrl();
        console.log("Current URL:", contactListPageCurrentUrl);
        assert.strictEqual(contactListPageCurrentUrl, contactListPage.PageUrl, 'Current URL is not correct');
    }, 30000);
    
    test('login, create contact4, enter contactpage4, edit contact4 and logout Positive Test', async function(){
        await loginPage.login_with_credentials(testUserEmail, testUserPassword);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // create contact4
        await contactListPage.click_add_contact();
        // fill in contact4 details
        await addContactPage.add_sample_contact_with_index("4");
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addContactPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // enter contact4 page
        let targetContactRow = await contactListPage.get_contact_row_by_first_name("firstNamev4");
        assert.notStrictEqual(targetContactRow, null, 'Target contact row not found in the table');
        await targetContactRow.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // click on edit contact button
        await contactDetailsPage.click_edit_contact();
        // Validate redirection to editContactPage by checking the URL
        let editContactPageCurrentUrl = await editContactPage.getDriverCurrentUrl();
        console.log("Current URL:", editContactPageCurrentUrl);
        assert.strictEqual(editContactPageCurrentUrl, editContactPage.PageUrl, 'Current URL is not correct');
        // edit all fields in contact4
        await editContactPage.edit_sample_contact("4");
        // logout
        await editContactPage.click_logout();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Validate redirection to loginPage by checking the URL
        let landingPageCurrentUrl = await landingPage.getDriverCurrentUrl();
        console.log("Current URL:", landingPageCurrentUrl);
        assert.strictEqual(landingPageCurrentUrl, landingPage.PageUrl, 'Current URL is not correct');
    }, 30000)
    
    test('login, create contact5, enter contactpage5, edit contact5 and submit Positive Test', async function(){
        await loginPage.login_with_credentials(testUserEmail, testUserPassword);
        let contact_index = "5";
        await new Promise(resolve => setTimeout(resolve, 1000));
        // create contact5
        await contactListPage.click_add_contact();
        // fill in contact5 details
        await addContactPage.add_sample_contact_with_index(contact_index);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addContactPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // enter contact5 page
        let targetContactRow = await contactListPage.get_contact_row_by_first_name("firstNamev5");
        assert.notStrictEqual(targetContactRow, null, 'Target contact row not found in the table');
        await targetContactRow.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // click on edit contact button
        await contactDetailsPage.click_edit_contact();
        // Validate redirection to editContactPage by checking the URL
        let editContactPageCurrentUrl = await editContactPage.getDriverCurrentUrl();
        console.log("Current URL:", editContactPageCurrentUrl);
        assert.strictEqual(editContactPageCurrentUrl, editContactPage.PageUrl, 'Current URL is not correct');
        // edit all fields in contact5
        await editContactPage.edit_sample_contact(contact_index);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await editContactPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // todo: validate contact5 details
        assert.strictEqual(await contactDetailsPage.get_first_name(), "edited_firstNamev5", 'First name is not correct');
        assert.strictEqual(await contactDetailsPage.get_last_name(), "edited_lastNamev5", 'Last name is not correct'); 
        assert.strictEqual(await contactDetailsPage.get_email(), "edited_emailv5@q.com", 'Email is not correct');
        assert.strictEqual(await contactDetailsPage.get_birthdate(), "1970-01-01", 'Birthdate is not correct');
        assert.strictEqual(await contactDetailsPage.get_phone(), "001234567890", 'Phone is not correct');
        assert.strictEqual(await contactDetailsPage.get_street1(), "edited_street1v5", 'Street1 is not correct');
        assert.strictEqual(await contactDetailsPage.get_street2(), "edited_street2v5", 'Street2 is not correct');
        assert.strictEqual(await contactDetailsPage.get_city(), "edited_cityv5", 'City is not correct');
        assert.strictEqual(await contactDetailsPage.get_state(), "edited_statev5", 'State is not correct');
        assert.strictEqual(await contactDetailsPage.get_postal_code(), "0012345", 'Postal code is not correct');
        assert.strictEqual(await contactDetailsPage.get_country(), "edited_countryv5", 'Country is not correct');
    }, 30000);

    test('login, create contact6, enter contactpage6, edit contact6 and cancel Positive Test', async function(){
        await loginPage.login_with_credentials(testUserEmail, testUserPassword);
        let contact_index = "6";
        await new Promise(resolve => setTimeout(resolve, 1000));
        // create contact6
        await contactListPage.click_add_contact();
        // fill in contact6 details
        await addContactPage.add_sample_contact_with_index(contact_index);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addContactPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // enter contact6 page
        let targetContactRow = await contactListPage.get_contact_row_by_first_name("firstNamev6");
        assert.notStrictEqual(targetContactRow, null, 'Target contact row not found in the table');
        await targetContactRow.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // click on edit contact button
        await contactDetailsPage.click_edit_contact();
        // Validate redirection to editContactPage by checking the URL
        let editContactPageCurrentUrl = await editContactPage.getDriverCurrentUrl();
        console.log("Current URL:", editContactPageCurrentUrl);
        assert.strictEqual(editContactPageCurrentUrl, editContactPage.PageUrl, 'Current URL is not correct');
        // edit all fields in contact6
        await editContactPage.edit_sample_contact(contact_index);
        await editContactPage.click_cancel();
        // Validate redirection to contactDetailsPage by checking the URL
        let contactDetailsPageCurrentUrl = await contactDetailsPage.getDriverCurrentUrl();
        console.log("Current URL:", contactDetailsPageCurrentUrl);
        assert.strictEqual(contactDetailsPageCurrentUrl, contactDetailsPage.PageUrl, 'Current URL is not correct');
    }, 30000)

    test('login, create contact7, enter contactpage7, delete contact7 and validate contact7 does not exist Positive Test', async function(){
        await loginPage.login_with_credentials(testUserEmail, testUserPassword);
        let contact_index = "7";
        await new Promise(resolve => setTimeout(resolve, 1000));
        // create contact7
        await contactListPage.click_add_contact();
        // fill in contact7 details
        await addContactPage.add_sample_contact_with_index(contact_index);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addContactPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // enter contact7 page
        let targetContactRow = await contactListPage.get_contact_row_by_first_name("firstNamev7");
        assert.notStrictEqual(targetContactRow, null, 'Target contact row not found in the table');
        await targetContactRow.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // click on delete contact button
        await contactDetailsPage.click_delete_contact();
        // UnexpectedAlertOpenError: unexpected alert open: {Alert text : Are you sure you want to delete this contact?}
        // click on confirm delete button
        await contactDetailsPage.confirm_alert();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Validate redirection to contactListPage by checking the URL
        let contactListPageCurrentUrl = await contactListPage.getDriverCurrentUrl();
        console.log("Current URL:", contactListPageCurrentUrl);
        assert.strictEqual(contactListPageCurrentUrl, contactListPage.PageUrl, 'Current URL is not correct');
        // validate that the deleted contact does not exist in the list
        let deletedContactRow = await contactListPage.get_contact_row_by_first_name("firstNamev7");
        assert.strictEqual(deletedContactRow, null, 'Deleted contact row should not be found in the table');
    }, 30000);

    afterEach(async function(){
        // console.log("after each test");
    });

    afterAll(async () => {
        console.log("All tests completed.");
        await addUserPage.closeBrowser();
    });
})