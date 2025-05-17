const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });


module.exports = {
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
};