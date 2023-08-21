const client = require("../dbConnection")

let collection = client.db().collection('Cats');

function postCat(data, callback) {
    collection.insertOne(data, callback)
}

async function getAllCats(callback) {
    collection.find({}).toArray(callback);   
}

module.exports = {postCat, getAllCats}