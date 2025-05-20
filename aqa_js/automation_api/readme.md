## API Automation Project Setup

This guide provides instructions to set up and run the API automation tests located in the `automation_api` directory.

### Clone the Repository

    git clone https://github.com/Hanbub/test_automation_frameworks.git

### Install Dependencies

    cd ./aqa_js
    npm install
    cd ./automation_api
    npm install

### Configure Environment Variables

Configure a `.env` file in the `automation_api` directory and add the necessary environment variables required for your API tests. For example:

    BASE_URL=http://localhost:3000
    API_TIMEOUT=30000

### Run Tests
    npm run test

## Project Structure

- `tests/` – Contains all API test cases
- `package.json` – Project dependencies and scripts
