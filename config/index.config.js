const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    MONGO_CONNECTION_URL: process.env.MONGO_CONNECTION_URL,
    JWT_SECRET: process.env.JWT_SECRET
};