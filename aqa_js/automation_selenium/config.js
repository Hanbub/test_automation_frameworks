const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });


module.exports = {
    BASE_URL: process.env.BASE_URL,
};