/// <reference types="cypress" />
import landingPage from "../pages/landingpage";
import addUserPage from "../pages/adduserpage";
import contactListPage from "../pages/contactlistpage";
const assert = require('assert');
const { v4: uuidv4 } = require('uuid');

describe('example contact app', () => {
  global.LandingPageTestsUUID = null;
  global.LandingPageTestsShortUUID = null
  before(function() {
    LandingPageTestsUUID = uuidv4();
    console.log("Generated UUID for tests:", LandingPageTestsUUID);
    LandingPageTestsShortUUID = LandingPageTestsUUID.substring(0, 8)
    console.log("Generated ShortUUID for tests:", LandingPageTestsShortUUID);
  });
  beforeEach(function(){
    // console.log("before each test");
  });
  it('Landing page login wrong credentials Negative Test', () => {
    cy.log('Landing page URL:', landingPage.PageUrl);
    landingPage.goToPageUrl();
    cy.wait(1000);
    landingPage.enterEmail('wrong@gmail.com');
    landingPage.enterPassword('wrongpassword');
    landingPage.clickSubmit();
    cy.wait(1000);
    cy.get('#error').invoke('text').then((text) => {
      cy.log(`Error message: ${text}`);
      assert.strictEqual(text, 'Incorrect username or password', 'Error message should be "Incorrect username or password"');
    });
  });
  it('add user and login with Positive Test', () => {
    addUserPage.goToPageUrl();
    cy.wait(1000);
    addUserPage.enterFirstName(`FName1-${global.LandingPageTestsShortUUID}`);
    addUserPage.enterLastName(`LName1-${global.LandingPageTestsShortUUID}`);
    let correct_email = `Email1-${global.LandingPageTestsShortUUID}@q.com`
    addUserPage.enterEmail(correct_email);
    let correct_password = `Pwd1-${global.LandingPageTestsShortUUID}`
    addUserPage.enterPassword(correct_password);
    cy.wait(1000);
    addUserPage.clickSubmit();
    cy.wait(1000);
    cy.url().then((currentUrl) => {
      cy.log(`Current URL: ${currentUrl}`);
      assert.strictEqual(currentUrl, contactListPage.PageUrl, 'Current URL is not correct');
    });
  });
})
