const addUserPage = require('../pom/adduserpage');
const landingPage = require('../pom/landingpage');
const loginPage = require('../pom/loginpage');
const contactListPage = require('../pom/contactlistpage');
const assert = require('assert');
const { v4: uuidv4 } = require('uuid');


describe('addUserPage Suite', function(){   
    global.AddUserPageTestsUUID = null;
    global.AddUserPageTestsShortUUID = null
    beforeAll(() => {
        AddUserPageTestsUUID = uuidv4();
        console.log("Generated UUID for tests:", AddUserPageTestsUUID);
        AddUserPageTestsShortUUID = AddUserPageTestsUUID.substring(0, 8)
        console.log("Generated ShortUUID for tests:", AddUserPageTestsShortUUID);
    });
    beforeEach(async function () {
        // console.log("before each test");
    });

    test('signup page redirection validation Positive Test', async function(){
        await landingPage.go_to_url(landingPage.config.BASE_URL);
        await landingPage.click_signup();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Validate the current URL of the driver is contactListPage URL
        let addUserCurrentUrl = await addUserPage.getDriverCurrentUrl();
        console.log("Current URL:", addUserCurrentUrl);
        assert.strictEqual(addUserCurrentUrl, addUserPage.PageUrl, 'Current URL is not correct');
        // firstName field check
        let firstName = await addUserPage.getPlaceholderById(addUserPage.ids.firstNameFieldId);
        console.log("First Name field placeholder:", firstName);
        assert.strictEqual(firstName, 'First Name', 'First Name field placeholder is not correct');
        // lastName field check
        let lastName_placeholder = await addUserPage.getPlaceholderById(addUserPage.ids.lastNameFieldId);
        console.log("Last Name field placeholder:", lastName_placeholder);
        assert.strictEqual(lastName_placeholder, 'Last Name', 'Last Name field placeholder is not correct');
        // email field check
        let email_placeholder = await addUserPage.getPlaceholderById(addUserPage.ids.emailFieldId);
        console.log("Email field placeholder:", email_placeholder);
        assert.strictEqual(email_placeholder, 'Email', 'Email field placeholder is not correct');
        // password field check
        let password_placeholder = await addUserPage.getPlaceholderById(addUserPage.ids.passwordFieldId);
        console.log("Password field placeholder:", password_placeholder);
        assert.strictEqual(password_placeholder, 'Password', 'Password field placeholder is not correct');
        // submit button check
        let submit_button_text = await addUserPage.getTextById(addUserPage.ids.submitButtonId);
        console.log("Submit button text:", submit_button_text); 
        assert.strictEqual(submit_button_text, 'Submit', 'Submit button text is not correct');
        // cancel button check
        let cancel_button_text = await addUserPage.getTextById(addUserPage.ids.cancelButtonId);
        console.log("Cancel button text:", cancel_button_text);
        assert.strictEqual(cancel_button_text, 'Cancel', 'Cancel button text is not correct');
        // Enter data into the firstName field
        await addUserPage.enter_first_name(`FName2-${global.AddUserPageTestsShortUUID}`);
        // Enter data into the lastName field
        await addUserPage.enter_last_name(`LName2-${global.AddUserPageTestsShortUUID}`);
        // Enter data into the emailfield
        await addUserPage.enter_email(`Email2-${global.AddUserPageTestsShortUUID}@q.com`);
        // Enter data into the password field
        await addUserPage.enter_password(`Pwd2-${global.AddUserPageTestsShortUUID}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addUserPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Validate the current URL of the driver is contactListPage URL
        let contactListUserCurrentUrl = await addUserPage.getDriverCurrentUrl();
        console.log("Current URL:", contactListUserCurrentUrl);
        assert.strictEqual(contactListUserCurrentUrl, contactListPage.PageUrl, 'Current URL is not correct');
    }, 30000);

    test('create user that already exists Negative Test', async function(){
        await addUserPage.go_to_url(addUserPage.PageUrl);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Enter data into the firstName field
        await addUserPage.enter_first_name(`FName3-${global.AddUserPageTestsShortUUID}`);
        // Enter data into the lastName field
        await addUserPage.enter_last_name(`LName3-${global.AddUserPageTestsShortUUID}`);
        // Enter data into the emailfield
        await addUserPage.enter_email(`Email3-${global.AddUserPageTestsShortUUID}@q.com`);
        // Enter data into the password field
        await addUserPage.enter_password(`Pwd3-${global.AddUserPageTestsShortUUID}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addUserPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // add same user again
        await addUserPage.go_to_url(addUserPage.PageUrl);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Enter data into the firstName field
        await addUserPage.enter_first_name(`FName3-${global.AddUserPageTestsShortUUID}`);
        // Enter data into the lastName field
        await addUserPage.enter_last_name(`LName3-${global.AddUserPageTestsShortUUID}`);
        // Enter data into the emailfield
        await addUserPage.enter_email(`Email3-${global.AddUserPageTestsShortUUID}@q.com`);
        // Enter data into the password field
        await addUserPage.enter_password(`Pwd3-${global.AddUserPageTestsShortUUID}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addUserPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Check that the text in the element with id=error is not empty
        let errorText = await addUserPage.getTextById('error');
        console.log("Error text:", errorText);
        assert.notStrictEqual(errorText.trim(), '', 'Error text is empty');
    }, 30000); 

    test('create another user with direct url access to addUser page Positive Test', async function(){
        await addUserPage.go_to_url(addUserPage.PageUrl);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Enter data into the firstName field
        await addUserPage.enter_first_name(`FName4-${global.AddUserPageTestsShortUUID}`);
        // Enter data into the lastName field
        await addUserPage.enter_last_name(`LName4-${global.AddUserPageTestsShortUUID}`);
        // Enter data into the emailfield
        await addUserPage.enter_email(`Email4-${global.AddUserPageTestsShortUUID}@q.com`);
        // Enter data into the password field
        await addUserPage.enter_password(`Pwd4-${global.AddUserPageTestsShortUUID}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addUserPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Check that the redirection to the contactListPage was successful
        let contactListUserCurrentUrl = await addUserPage.getDriverCurrentUrl();
        console.log("Current URL:", contactListUserCurrentUrl);
        assert.strictEqual(contactListUserCurrentUrl, contactListPage.PageUrl, 'Current URL is not correct');
    }, 30000); 

    test('click cancel on addUser page Positive Test', async function(){
        await addUserPage.go_to_url(addUserPage.PageUrl);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addUserPage.click_cancel();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Check that the redirection to the contactListPage was successful
        let loginPageCurrentUrl = await loginPage.getDriverCurrentUrl();
        console.log("Current URL:", loginPageCurrentUrl);
        assert.strictEqual(loginPageCurrentUrl, loginPage.PageUrl, 'Current URL is not correct');
    }, 30000); 

    test('add user with empty forms Negative Test', async function(){
        await addUserPage.go_to_url(addUserPage.PageUrl);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addUserPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Check that the text in the element with id=error is not empty
        let errorText = await addUserPage.getTextById('error');
        console.log("Error text:", errorText);
        assert.notStrictEqual(errorText.trim(), '', 'Error text is empty');
    }, 30000); 
    
    test('add user with short password forms Negative Test', async function(){
        await addUserPage.go_to_url(addUserPage.PageUrl);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Enter data into the firstName field
        await addUserPage.enter_first_name('firstname');
        // Enter data into the lastName field
        await addUserPage.enter_last_name('lastname');
        // Enter data into the emailfield
        await addUserPage.enter_email('email@q.com');
        // Enter data into the password field (short password 3 symbols)
        await addUserPage.enter_password('pwd');
        await addUserPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Check that the text in the element with id=error is not empty
        let errorText = await addUserPage.getTextById('error');
        console.log("Error text:", errorText);
        assert.notStrictEqual(errorText.trim(), '', 'Error text is empty');
    }, 30000); 
    
    test('add user with incorrect email forms Negative Test', async function(){
        await addUserPage.go_to_url(addUserPage.PageUrl);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Enter data into the firstName field
        await addUserPage.enter_first_name('firstname');
        // Enter data into the lastName field
        await addUserPage.enter_last_name('lastname');
        // Enter data into the emailfield (incorrect email)
        await addUserPage.enter_email('email@');
        // Enter data into the password field
        await addUserPage.enter_password('correctpassword');
        await addUserPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Check that the text in the element with id=error is not empty
        let errorText = await addUserPage.getTextById('error');
        console.log("Error text:", errorText);
        assert.notStrictEqual(errorText.trim(), '', 'Error text is empty');
    }, 30000); 

    afterEach(async function(){
        // console.log("after each test");
    });

    afterAll(async () => {
        console.log("All tests completed.");
        await landingPage.closeBrowser();
    });
})