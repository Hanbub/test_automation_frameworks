# UI Selenium Automation Project Setup

This guide provides instructions to set up and run the UI automation tests located in the `automation_selenium` directory.

## Clone the Repository

git clone https://github.com/Hanbub/test_automation_frameworks.git

## Install Dependencies

    cd ./aqa_js
    npm install
    cd ./automation_selenium
    npm install
    npx playwright install


### Configure Environment Variables

Configure a `.env` file in the `automation_selenium` directory and add the necessary environment variables required for your UI tests. For example:

    BASE_URL=http://localhost:3000

### Run Tests

    npm run test

## Project Structure

- `tests/` – Contains all API test cases
- `package.json` – Project dependencies and scripts
