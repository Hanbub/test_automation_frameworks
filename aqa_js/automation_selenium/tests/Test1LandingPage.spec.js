const addUserPage = require('../pom/adduserpage');
const landingPage = require('../pom/landingpage');
const contactListPage = require('../pom/contactlistpage');
const assert = require('assert');
const { v4: uuidv4 } = require('uuid');


describe('Landing page Test', function(){   
    global.LandingPageTestsUUID = null;
    global.LandingPageTestsShortUUID = null
    beforeAll(() => {
        LandingPageTestsUUID = uuidv4();
        console.log("Generated UUID for tests:", LandingPageTestsUUID);
        LandingPageTestsShortUUID = LandingPageTestsUUID.substring(0, 8)
        console.log("Generated ShortUUID for tests:", LandingPageTestsShortUUID);
    });
    beforeEach(function(){
        // console.log("before each test");
    });

    test('Landing page login wrong credentials Negative Test', async function(){
        await landingPage.go_to_url(landingPage.config.BASE_URL);
        await landingPage.enter_email('wrong@gmail.com');
        await landingPage.enter_password('wrongpassword');
        await landingPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        let error_message = await landingPage.getTextById('error');
        console.log("Error message text:", error_message)
        assert.strictEqual(error_message, 'Incorrect username or password', 'incorrect message not displayed');
    }, 30000);

    test('add user and login with Positive Test', async function(){
        await addUserPage.go_to_url(addUserPage.PageUrl);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Enter data into the firstName field
        await addUserPage.enter_first_name(`FName1-${global.LandingPageTestsShortUUID}`);
        // Enter data into the lastName field
        await addUserPage.enter_last_name(`LName1-${global.LandingPageTestsShortUUID}`);
        // Enter data into the emailfield
        let correct_email = `Email1-${global.LandingPageTestsShortUUID}@q.com`
        await addUserPage.enter_email(correct_email);
        // Enter data into the password field
        let correct_password = `Pwd1-${global.LandingPageTestsShortUUID}`
        await addUserPage.enter_password(correct_password);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addUserPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await landingPage.go_to_url(landingPage.config.BASE_URL);
        await landingPage.enter_email(correct_email);
        await landingPage.enter_password(correct_password);
        await landingPage.click_submit();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Validate the current URL of the driver is contactListPage URL
        let contactListUserCurrentUrl = await addUserPage.getDriverCurrentUrl();
        console.log("Current URL:", contactListUserCurrentUrl);
        assert.strictEqual(contactListUserCurrentUrl, contactListPage.PageUrl, 'Current URL is not correct');
    }
    , 30000);

    afterEach(async function(){
        // console.log("after each test");
    });
    afterAll(async () => {
        console.log("All tests completed.");
        await landingPage.closeBrowser();
    });

})