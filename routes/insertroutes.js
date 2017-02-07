const express = require('express');
const router = express.Router();
const multer = require('multer');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectID;


//Mongo import and config
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/finalapp';
const assert = require('assert');

router.use(bodyParser.urlencoded({
    limit: '5mb',
    extended: false
}));

router.use(bodyParser.json({
    limit: '5mb'
}));

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        var dir = __dirname;
        var dirname = dir.replace('routes','');
        callback(null, dirname + '/public/uploads');
    },
    filename: function(req, file, callback) {
        callback(null, Date.now() + '_' + Math.floor(Math.random() * 99999999) + '_' + file.originalname);
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        filesize: 5097152
    }
});

router.post('/saveimage', uploader.single('file'), function(req, res) {
    console.log("hello");
    if (req.file) {
        res.json({
            success: true,
            file: req.file.filename
        })
    } else {
        res.json({
            success: false
        });
    }
})

router.post('/addbook', function(req, res)  {
    var imgUrl = "../uploads/" + req.body.imgUrl
    MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        db.collection('finalapp')
        .update({username: "guilhermedelucas"},
            {$push: { items:
                {   _id: new ObjectID(),
                    collection: req.body.collection,
                    name: req.body.name,
                    genre: req.body.genre,
                    publisher: req.body.publisher,
                    imgUrl: imgUrl,
                    pages: req.body.pages,
                    author: req.body.author,
                    borrow: req.body.borrow,
                    dateadded: new Date()
            }}}, function(err) {
                if (err) {
                    res.json({
                        success: false
                    })
                } else {
                    res.json({
                        success: true
                    })
                }
            })
    })
})

router.post('/addgame', function(req, res) {
    var imgUrl = "../uploads/" + req.body.imgUrl
    MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        db.collection('finalapp')
        .update({username: "guilhermedelucas"},
            {$push: { items:
                {   _id: new ObjectID(),
                    collection: req.body.collection,
                    name: req.body.name,
                    genre: req.body.genre,
                    platform: req.body.platform,
                    publisher: req.body.publisher,
                    developer: req.body.developer,
                    borrow: req.body.borrow,
                    imgUrl: imgUrl,
                    dateadded: new Date()
            }}}, function(err) {
                if (err) {
                    res.json({
                        success: false
                    })
                } else {
                    res.json({
                        success: true
                    })
                }
            })
    })
})

router.post('/addmovie', function(req, res) {
    var imgUrl = "../uploads/" + req.body.imgUrl
    MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        db.collection('finalapp')
        .update({username: "guilhermedelucas"},
            {$push: { items:
                {   _id: new ObjectID(),
                    collection: req.body.collection,
                    name: req.body.name,
                    genre: req.body.genre,
                    actors: req.body.actors,
                    media: req.body.media,
                    director: req.body.director,
                    borrow: req.body.borrow,
                    imgUrl: imgUrl,
                    dateadded: new Date()
            }}}, function(err) {
                if (err) {
                    res.json({
                        success: false
                    })
                } else {
                    res.json({
                        success: true
                    })
                }
            })
    })
})

router.post('/addmusic', function(req, res) {
    var imgUrl = "../uploads/" + req.body.imgUrl
    MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        db.collection('finalapp')
        .update({username: "guilhermedelucas"},
            {$push: { items:
                {   _id: new ObjectID(),
                    collection: req.body.collection,
                    name: req.body.name,
                    genre: req.body.genre,
                    artist: req.body.artist,
                    media: req.body.media,
                    borrow: req.body.borrow,
                    imgUrl: imgUrl,
                    dateadded: new Date()
            }}}, function(err) {
                if (err) {
                    res.json({
                        success: false
                    })
                } else {
                    res.json({
                        success: true
                    })
                }
            })
    })
})

module.exports = router;
