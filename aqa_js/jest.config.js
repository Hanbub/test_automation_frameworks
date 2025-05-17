module.exports = {
  testMatch: ['**/tests/**/*.spec.js'],
  testPathIgnorePatterns: ['/node_modules/', '/automation_playwright/tests/'],
  watch: false, // Ensure Jest does not run in watch mode
  maxWorkers: 1, // Run tests sequentially
  testEnvironment: "node",
  };