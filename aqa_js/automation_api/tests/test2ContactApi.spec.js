const axios = require('axios');
const assert = require('assert');
const config = require('../config');
const { v4: uuidv4 } = require('uuid');

describe('Contact API Test Suite', () => {
    global.contactApiTestsUUID = null;
    global.contactApiTestsShortUUID = null
    global.testEmail = null;
    global.apiClient = null;
    beforeAll(async function() {
        contactApiTestsUUID = uuidv4();
        console.log("Generated UUID for tests:", contactApiTestsUUID);
        contactApiTestsShortUUID = contactApiTestsUUID.substring(0, 8)
        console.log("Generated ShortUUID for tests:", contactApiTestsShortUUID);
        global.apiClient = axios.create({
            baseURL: config.BASE_URL,
            withCredentials: true, // Allows cookies to be sent with requests
        });
        // add test user
        global.testEmail = `api${contactApiTestsShortUUID}@q.com`
        const addUserResponse = await apiClient.post('/users', {
            email: global.testEmail,
            firstName: "testApiContactFname",
            lastName: "testApiContactLname",
            password: "testApiContactpassword",
        });
        assert.strictEqual(addUserResponse.status, 201);
        assert.strictEqual(addUserResponse.statusText, "Created");
        // login test user
        const loginUserResponse = await apiClient.post('/users/login', {
            email: global.testEmail,
            password: "testApiContactpassword"
        });
        assert.strictEqual(loginUserResponse.status, 200);
        assert.strictEqual(loginUserResponse.statusText, "OK");
        assert.notStrictEqual(loginUserResponse.data.token, null);
        // Set the Authorization header with the token for subsequent requests
        global.apiClient.defaults.headers.common['Authorization'] = `Bearer ${loginUserResponse.data.token}`;
        
    }, 30000);
    test('create sample contact Positive Test', async () => {
        const addContactResponse = await apiClient.post('/contacts', {
            birthdate: "1990-10-01",
            city: "qqqqqq",
            country: "eeeeeee",
            email: "qq@gmail.com",
            firstName: "aaaa",
            lastName: "bbbb",
            phone: "215453262",
            postalCode: "12345",
            stateProvince: "wwwwww",
            street1: "ewqewq",
            street2: "weqqwe",
        });
        assert.strictEqual(addContactResponse.status, 201);
        assert.strictEqual(addContactResponse.statusText, "Created");
    }, 30000);

    test('get all contacts Positive Test', async () => {
        // add sample contact
        const contactFname = "getContactsFname1"
        const contactLname = "getContactsLname1"
        const addContactResponse = await apiClient.post('/contacts', {
            firstName: contactFname,
            lastName: contactLname,
        });
        assert.strictEqual(addContactResponse.status, 201);
        assert.strictEqual(addContactResponse.statusText, "Created");
        console.log("Contact created successfully:", addContactResponse.data);
        // get all contacts
        const getContactsResponse = await apiClient.get('/contacts');
        assert.strictEqual(getContactsResponse.status, 200);
        assert.strictEqual(getContactsResponse.statusText, "OK");
        assert.strictEqual(getContactsResponse.headers['content-type'], "application/json; charset=utf-8");
        // check data is defined
        assert.notStrictEqual(getContactsResponse.data, null);
        assert.notStrictEqual(getContactsResponse.data.length, 0);
        console.log("Contacts retrieved successfully:", getContactsResponse.data);
        // check if the contact is in the list
        const contact = getContactsResponse.data.find(contact => contact.firstName === contactFname && contact.lastName === contactLname);
        assert.notStrictEqual(contact, undefined); // Check if the contact is found in the list
    } ,30000);

    test('get contact by id Positive Test', async () => {
        // add sample contact
        const contactFname = "getContactByIdFname2"
        const contactLname = "getContactByIdLname2"
        const addContactResponse = await apiClient.post('/contacts', {
            firstName: contactFname,
            lastName: contactLname,
        });
        assert.strictEqual(addContactResponse.status, 201);
        assert.strictEqual(addContactResponse.statusText, "Created");
        console.log("Contact created successfully:", addContactResponse.data);
        // get contact by id
        const getContactByIdResponse = await apiClient.get(`/contacts/${addContactResponse.data._id}`);
        assert.strictEqual(getContactByIdResponse.status, 200);
        assert.strictEqual(getContactByIdResponse.statusText, "OK");
        assert.strictEqual(getContactByIdResponse.headers['content-type'], "application/json; charset=utf-8");
        // check data is defined
        assert.notStrictEqual(getContactByIdResponse.data, null);
        console.log("Contact retrieved successfully:", getContactByIdResponse.data);
    }, 30000);

    test('update contact by id Positive Test', async () => {
        // add sample contact
        const contactFname = "ContactByIdFname3"
        const contactLname = "ContactByIdLname3"
        const addContactResponse = await apiClient.post('/contacts', {
            firstName: contactFname,
            lastName: contactLname,
        });
        assert.strictEqual(addContactResponse.status, 201);
        assert.strictEqual(addContactResponse.statusText, "Created");
        console.log("Contact created successfully:", addContactResponse.data);
        // update contact by id
        const updatedFname = "updContactByIdFname3"
        const updatedLname = "updContactByIdLname3"
        const updateContactResponse = await apiClient.put(`/contacts/${addContactResponse.data._id}`, {
            firstName: updatedFname,
            lastName: updatedLname,
        });
        assert.strictEqual(updateContactResponse.status, 200);
        assert.strictEqual(updateContactResponse.statusText, "OK");
        assert.strictEqual(updateContactResponse.headers['content-type'], "application/json; charset=utf-8");
        // check data is defined
        assert.notStrictEqual(updateContactResponse.data, null);
        console.log("Contact updated successfully:", updateContactResponse.data);
    }, 30000);

    test('delete contact by id Positive Test', async () => {
        // add sample contact
        const contactFname = "ContactByIdFname4"
        const contactLname = "ContactByIdLname4"
        const addContactResponse = await apiClient.post('/contacts', {
            firstName: contactFname,
            lastName: contactLname,
        });
        assert.strictEqual(addContactResponse.status, 201);
        assert.strictEqual(addContactResponse.statusText, "Created");
        console.log("Contact created successfully:", addContactResponse.data);
        // delete contact by id
        const deleteContactResponse = await apiClient.delete(`/contacts/${addContactResponse.data._id}`);
        assert.strictEqual(deleteContactResponse.status, 200);
        assert.strictEqual(deleteContactResponse.statusText, "OK");
        // check data is defined
        assert.notStrictEqual(deleteContactResponse.data, null);    
        console.log("Contact deleted successfully:", deleteContactResponse.data);
        // check if the contact is deleted
        try {
            const getContactByIdResponse = await apiClient.get(`/contacts/${addContactResponse.data._id}`);
            assert.fail("Expected error not thrown");
        }
        catch (error) {
            assert.strictEqual(error.response.status, 404);
            assert.strictEqual(error.response.statusText, "Not Found");
        }
    }, 30000);
});