// Cypress BasePage for POM structure
class BasePage {
  visit(path = '/') {
    cy.visit(path);
  }
  sleep(milliseconds) {
    cy.wait(milliseconds);
  }
  enterTextByCss(css, text) {
    cy.get(css).type(text);
  }
  enterTextById(id, text) {
    cy.get(`#${id}`).type(text);
  }
  replaceTextById(id, text) {
    cy.get(`#${id}`).clear().type(text);
  }
  clickById(id) {
    cy.get(`#${id}`).click();
  }
  getTextById(id) {
    return cy.get(`#${id}`).invoke('text');
  }
  getPlaceholderById(id) {
    return cy.get(`#${id}`).invoke('attr', 'placeholder');
  }
  getDriverCurrentUrl() {
    return cy.url();
  }
  getElementById(id) {
    return cy.get(`#${id}`);
  }
  getElementByCss(css) {
    return cy.get(css);
  }
  getElementsByTagName(tag) {
    return cy.get(tag);
  }
  closeBrowser() {
    // Not needed in Cypress; browser closes automatically
  }
}

export default BasePage;