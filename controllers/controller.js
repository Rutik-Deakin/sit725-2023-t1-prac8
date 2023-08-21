let collection = require('../models/cat')

const postCat = (req, res) => {
    let cat = req.body;
    collection.postCat(cat, (err, result) => {
        if (!err) {
            res.json({ statusCode: 201, data: result, message: 'success' })
        }
    });
}

const getAllCats = (req, res) => {
    collection.getAllCats((err, result) => {
        console.log("Result: ", result);
        if (!err) {
            res.json({ statusCode: 200, data: result, message: 'success!!' });
        } else {
            console.error("Error while fetching cats:", err);
            res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
        }
    })
}

module.exports = {postCat, getAllCats}