const { defineConfig } = require('@playwright/test');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// playwright.config.js
module.exports = defineConfig({
    BASE_URL: process.env.BASE_URL,
    testDir: './tests', // Directory where test files are located
    timeout: 30000, // Maximum time one test can run in milliseconds
    // retries: 2, // Number of retries on test failure
    reporter: 'html', // Reporter to use, e.g., 'list', 'dot', 'html'
    use: {
        headless: false, // Run tests in headless mode
        viewport: { width: 1280, height: 720 }, // Default viewport size
        ignoreHTTPSErrors: true, // Ignore HTTPS errors
        // video: 'on-first-retry', // Record video only on first retry
        // screenshot: 'only-on-failure', // Take screenshots only on failure
    },
    projects: [
        {
            name: 'Chromium',
            use: { browserName: 'chromium' },
        },
        // {
        //     name: 'Firefox',
        //     use: { browserName: 'firefox' },
        // },
        // {
        //     name: 'WebKit',
        //     use: { browserName: 'webkit' },
        // },
    ],
});