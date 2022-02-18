const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    //   MONGO_URI: process.env.MONGO_URI,
    //   MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    PORT: process.env.PORT,
    MONGO_CONNECTION_URL: process.env.MONGO_CONNECTION_URL,
    JWT_SECRET: process.env.JWT_SECRET
};