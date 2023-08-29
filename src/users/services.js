const { ObjectId } = require("mongodb")

const { Database } = require("../database/index");

const COLLECTION = "users";

const getAll = async() => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray()
}

const getByID = async(id) => {
    const collection = await Database(COLLECTION);
    return collection.findOne({ _id: new ObjectId(id) })
};

const create = async(product) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product)
    return result.insertedId
}

//update
//delete

module.exports.UsersService = {
    getAll,
    getByID,
    create,
}