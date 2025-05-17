const axios = require('axios');
const config = require('../config'); // Adjust the path to your config file


class ApiClient {
    constructor() {
        this.baseUrl = config.apiBaseUrl;
        this.apiTimeout = config.API_TIMEOUT; // Default timeout if not specified in config
        this.client = axios.create({
            baseURL: this.baseUrl,
            timeout: this.apiTimeout, // Default timeout if not specified in config
        });
    }

    async get(endpoint, params = {}) {
        try {
            const response = await this.client.get(endpoint, { params });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async post(endpoint, data = {}) {
        try {
            const response = await this.client.post(endpoint, data);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async put(endpoint, data = {}) {
        try {
            const response = await this.client.put(endpoint, data);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async delete(endpoint) {
        try {
            const response = await this.client.delete(endpoint);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    handleError(error) {
        console.error('API Client Error:', error.message);
        throw error;
    }
}

module.exports = new ApiClient();