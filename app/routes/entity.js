const router = require('express').Router();
let Entity = require('../entity.model');

// get all all documents from entity collection
router.route('/').get((req, res) => {
    // actually i should find the document with category and check if exists first, if not create it first 
    Entity.find()
        .then(entities => res.json(entities))   // return entities in json to requester
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    // i need to extract from flask's json and get identified text
    const entity = req.body.entity;

    // then create new one and push to db
    const newEntity = new Entity({entity})
})

module.exports = router;