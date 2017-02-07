const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

//Mongo import and config
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/finalapp';
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;

router.use(bodyParser.urlencoded({
    limit: '5mb',
    extended: false
}));

router.use(bodyParser.json({
    limit: '5mb'
}));

router.get('/navbar', function(req, res) {
    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        console.log("Conected successfully to server");
        db.collection('finalapp')
        .aggregate([
             { $match: { username: "guilhermedelucas" } },
             { $unwind: "$items"},
             { $group: { _id : '$items.collection', genre: { $addToSet: '$items.genre'}, platform: {$addToSet: '$items.platform'}, media: {$addToSet:'$items.media'}}},
             { $sort: {_id: 1}}
         ]).toArray(function(err, result) {
            if (err) {
                console.log(err);
            } else if (result.length){
                res.json({
                    navbar: result
                })
            } else {
                res.send('no document found');
            }
        })
    })
})

router.get('/userdata', function(req, res) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('finalapp').find({username:"guilhermedelucas"}).toArray(function(err, result){
            if (err) {
                console.log(err)
            } else if (result.length){
                res.json({
                    userData: result
                })
            } else {
                res.send('no document found')
            }
        })
    })
})

router.get('/singleitem/:id', function(req, res){
    var itemId = req.params.id;
    MongoClient.connect(url, function (err, db){
        assert.equal(null, err);
        db.collection('finalapp')
        .aggregate([
            { $match: { username: "guilhermedelucas" } },
            { $unwind: "$items"},
            { $match: { "items._id": ObjectId(itemId)}},
            { $project: { item: "$items" } }
        ]).toArray( function (err, result) {
            if (err) {
                console.log(err)
            } else if (result.length){
                res.json({
                    itemData: result
                })
            } else {
                res.send('no document found')
            }
        })
    })
})


module.exports = router;
