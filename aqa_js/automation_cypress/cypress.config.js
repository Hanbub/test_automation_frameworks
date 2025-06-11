const { defineConfig } = require("cypress");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.env.baseUrl = process.env.BASE_URL;
      return config;
    },
    specPattern: "**/tests/*.cy.js",
  },
});
