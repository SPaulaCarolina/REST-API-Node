const { MongoClient } = require('mongodb');
const debug = require('debug')('app:database');

const { Config } = require("../config/index");

const uri = "mongodb+srv://paulacarolinaserra:<password>@cluster0.3kuvik9.mongodb.net/?retryWrites=true&w=majority"
let connection = null;

module.exports.Database = (collection) => new Promise( async(res, rej) => {
    try {
        if(!connection) {
            const client = new MongoClient(Config.uri)
            connection = await client.connect();
            debug('New connection opened with Mongo DB Atlas')
        }
        
        const db = connection.db(Config.dbname)
        res( db.collection(collection) )
    } catch(error) {
        rej(error)
    }
});