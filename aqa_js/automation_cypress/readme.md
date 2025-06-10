# Cypress Automation

This folder is intended for implementing the same automation scenarios as in Playwright and Selenium, but using Cypress.

## Getting Started

1. Make sure you have [Node.js](https://nodejs.org/) installed.
2. Install Cypress in this folder (if not already installed):
   ```sh
   npm install cypress --save-dev
   ```
3. Add your Cypress tests in the `tests/` directory:
   - `aqa_js/automation_cypress/tests/`
4. Implement Page Object Model (POM) classes in the `pom/` directory:
   - `aqa_js/automation_cypress/pom/`

## Example Test Structure
- Place your test files in `aqa_js/automation_cypress/tests/`.
- Place your page object classes in `aqa_js/automation_cypress/pom/`.
- You can mirror the test scenarios from Playwright and Selenium, such as:
  - Landing Page tests
  - Signup Page tests
  - Contact List Page tests
  - Add Contact Page tests
  - Edit Contact Page tests

## Running Tests
From the `aqa_js/automation_cypress` directory, run:
```sh
npx cypress open
```
Or for headless mode:
```sh
npx cypress run
```

## References
- [Cypress Documentation](https://docs.cypress.io/)

---

_Replicate the automation logic from Playwright and Selenium here using Cypress syntax and best practices. Use the `pom/` folder for your Page Object Model classes._