require('dotenv').config();

module.exports.Config = {
    port: process.env.PORT,
    uri: process.env.MONGO_URI,
    dbname: process.env.MONGO_DBNAME
};