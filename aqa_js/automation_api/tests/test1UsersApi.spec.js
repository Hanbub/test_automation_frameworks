
const axios = require('axios');
const assert = require('assert');
const config = require('../config');
const { v4: uuidv4 } = require('uuid');

describe('Login API Test Suite', () => {
    global.userApiTestsUUID = null;
    global.userApiTestsShortUUID = null
    global.testEmail = null;
    beforeAll(async function() {
        userApiTestsUUID = uuidv4();
        console.log("Generated UUID for tests:", userApiTestsUUID);
        userApiTestsShortUUID = userApiTestsUUID.substring(0, 8)
        console.log("Generated ShortUUID for tests:", userApiTestsShortUUID);
    }, 30000);
    test('successfully sign up with correct credentials Positive Test', async () => {
        const response = await axios.post(`${config.BASE_URL}/users`, {
            email: `api${userApiTestsShortUUID}@q.com`,
            firstName: "testFname",
            lastName: "testLname",
            password: "testpassword",
        });
        assert.strictEqual(response.status, 201); // Check if the response status is 201
        assert.strictEqual(response.statusText, "Created"); // Check if the status text is "OK"
    }, 30000);

    test('successfully log in and return user data', async () => {
        // add user
        const addUserResponse = await axios.post(`${config.BASE_URL}/users`, {
            email: `api1${userApiTestsShortUUID}@q.com`,
            firstName: "testFname",
            lastName: "testLname",
            password: "testpassword",
        });
        assert.strictEqual(addUserResponse.status, 201); // Check if the response status is 201
        assert.strictEqual(addUserResponse.statusText, "Created"); // Check if the status text is "OK"
        // login
        const loginUserResponse = await axios.post(`${config.BASE_URL}/users/login`, {
            email: `api1${userApiTestsShortUUID}@q.com`, 
            password: "testpassword"
        });
        assert.strictEqual(loginUserResponse.status, 200); // Check if the response status is 200
        assert.strictEqual(loginUserResponse.statusText, "OK"); // Check if the status text is "OK"
        assert.strictEqual(loginUserResponse.headers['content-type'], "application/json; charset=utf-8"); // Check if the content type is JSON
        // check data is defined and has a token
        assert.notStrictEqual(loginUserResponse.data, null); // Check if the response data is not null
        assert.notStrictEqual(loginUserResponse.data.token, null); // Example: Check if a token is returned
    }, 30000);

    test('duplicate email should return 400 Negative Test', async () => {
        // add user
        const addUserResponse1 = await axios.post(`${config.BASE_URL}/users`, {
            email: `api2${userApiTestsShortUUID}@q.com`,
            firstName: "testFname",
            lastName: "testLname",
            password: "testpassword",
        });
        assert.strictEqual(addUserResponse1.status, 201); // Check if the response status is 201
        assert.strictEqual(addUserResponse1.statusText, "Created"); // Check if the status text is "OK"
        // add duplicate user
        try {
            const addUserResponse2 = await axios.post(`${config.BASE_URL}/users`, {
                email: `api2${userApiTestsShortUUID}@q.com`,
                firstName: "testFname",
                lastName: "testLname",
                password: "testpassword",
            });
            assert.strictEqual(addUserResponse2.status, 400);
            assert.strictEqual(addUserResponse2.statusText, "Bad Request");
        } catch (error) {
            assert.strictEqual(error.response.status, 400);
            assert.strictEqual(error.response.statusText, "Bad Request");
        }
    }, 30000);

    test('sign up with wrong email Negative Test', async () => {
        try {
            const addUserResponse = await axios.post(`${config.BASE_URL}/users`, {
                email: `wrongemail`,
                firstName: "testFname",
                lastName: "testLname",
                password: "testpassword",
            });
            assert.strictEqual(addUserResponse.status, 400);
            assert.strictEqual(addUserResponse.statusText, "Bad Request");
        } catch (error) {
            console.log("Error response:", error); // Log the error response for debugging
            assert.strictEqual(error.response.status, 400);
            assert.strictEqual(error.response.statusText, "Bad Request");
        }
    }, 30000);

    test('sign up with short password Negative Test', async () => {
        try {
            const addUserResponse = await axios.post(`${config.BASE_URL}/users`, {
                email: `api4${userApiTestsShortUUID}@q.com`,
                firstName: "testFname",
                lastName: "testLname",
                password: "123",
            });
            assert.strictEqual(addUserResponse.status, 400);
            assert.strictEqual(addUserResponse.statusText, "Bad Request");
        } catch (error) {
            assert.strictEqual(error.response.status, 400);
            assert.strictEqual(error.response.statusText, "Bad Request");
        }
    }, 30000);

    test('sign up without firstName Negative Test', async () => {
        try {
            const addUserResponse = await axios.post(`${config.BASE_URL}/users`, {
                email: `api5${userApiTestsShortUUID}@q.com`,
                lastName: "testLname",
                password: "testpassword",
            });
            assert.strictEqual(addUserResponse.status, 400);
            assert.strictEqual(addUserResponse.statusText, "Bad Request");
        } catch (error) {
            assert.strictEqual(error.response.status, 400);
            assert.strictEqual(error.response.statusText, "Bad Request");
        }
    }, 30000);

    test('sign up without lastName Negative Test', async () => {
        try {
            const addUserResponse = await axios.post(`${config.BASE_URL}/users`, {
                email: `api6${userApiTestsShortUUID}@q.com`,
                firstName: "testFname",
                password: "testpassword",
            });
            assert.strictEqual(addUserResponse.status, 400);
            assert.strictEqual(addUserResponse.statusText, "Bad Request");
        } catch (error) {
            assert.strictEqual(error.response.status, 400);
            assert.strictEqual(error.response.statusText, "Bad Request");
        }
    }, 30000);

    // logout test
    test('logout user Positive Test', async () => {
        // add user
        const addUserResponse = await axios.post(`${config.BASE_URL}/users`, {
            email: `api7${userApiTestsShortUUID}@q.com`,
            firstName: "testFname",
            lastName: "testLname",
            password: "testpassword",
        });
        assert.strictEqual(addUserResponse.status, 201);
        assert.strictEqual(addUserResponse.statusText, "Created"); // Check if the status text is "OK"
        // login
        const loginUserResponse = await axios.post(`${config.BASE_URL}/users/login`, {
            email: `api7${userApiTestsShortUUID}@q.com`,
            firstName: "testFname",
            lastName: "testLname",
            password: "testpassword",
        });
        assert.strictEqual(loginUserResponse.status, 200);
        assert.strictEqual(loginUserResponse.statusText, "OK");
        console.log("Login response data:", loginUserResponse.data);
        assert.notStrictEqual(loginUserResponse.data, null);
        // logout
        const logoutToken = `Bearer ${loginUserResponse.data.token}`;
        const logoutUserResponse = await axios.post(`${config.BASE_URL}/users/logout`, {}, {
            headers: {
                'Authorization': logoutToken,
            },
        });
        assert.strictEqual(logoutUserResponse.status, 200);
        assert.strictEqual(logoutUserResponse.statusText, "OK");
    }, 30000);
        

});