let express = require('express');
let router = express.Router();
let controller = require('../controllers/controller')

router.post('/', (req, res) => {
    console.log("Called");
    controller.postCat(req, res);
})

router.get('/', (req, res) => {
    controller.getAllCats(req, res);
});

module.exports = router;