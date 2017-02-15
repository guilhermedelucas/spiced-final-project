const express = require('express');
const router = express.Router();
const multer = require('multer');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;
const hashPassword = require('./passwordhashing/hash').hashPassword;

router.use(cookieParser());
router.use(cookieSession({
    secret: process.env.SESSION_SECRET || 'Moalways late to Spiced Academy',
    //add this secret to vars on heroku;
    maxAge: 1000 * 60 * 60 * 24 * 14
}));

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
    console.log(req.file);
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
        .update({username: req.session.username},
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
        .update({username: req.session.username},
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
        .update({username: req.session.username},
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
        .update({username: req.session.username},
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

router.post('/addfriend', function(req, res){
    var usernameToAdd = req.body.username;
    var currentUser = req.session.username;


    console.log(usernameToAdd, currentUser);
    MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        db.collection('finalapp').update({username: currentUser}, {$push: { friends: {
            username: usernameToAdd,
            currentStatus: "pending",
            dateadded: new Date()
        }}}, function (err) {
            if (err){
                res.json({
                    success: false
                })
            } else {
                db.collection('finalapp').update({username: usernameToAdd}, {$push: { friends: {
                    username: currentUser,
                    currentStatus: "pending",
                    dateadded: new Date()
                }}}, function (err){
                    if (err){
                        res.json({
                            sucess: false
                        })
                    } else {
                        res.json({
                            sucess: true
                        })
                    }
                })
            }
        })
    })
})

router.post('/registeruser', function(req, res){
    const { username, email, password } = req.body;
    MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        db.collection('finalapp').find({username: username}, {limit: 1})
        .toArray(function(err, results) {
            if (results.length == 0) {
                db.collection('finalapp').find({email: email}, {limit: 1})
                .toArray(function(err, results) {
                    if (results.length == 0) {
                        hashPassword(password).then(function(hash){
                        // console.log("email and username are unique");
                            db.collection('finalapp').insert({
                                username,
                                email,
                                password: hash
                            }, function(err){
                                if(err){
                                    res.json({
                                        sucess: false
                                    })
                                } else {
                                    console.log(username);
                                    req.session.username = username;
                                    console.log(req.session);
                                    res.json({
                                        sucess: true
                                    })
                                }
                            })
                        })
                    } else {
                        // console.log("email already in use");
                        res.json({
                            email: false
                        })
                    }
                })
            } else {
                // console.log("username already in use");
                res.json({
                    username: false
                })
            }
        })
    })
})

router.post('/updateprofile', function(req, res){
    const username = req.session.username;
    const { firstName, lastName, birthday, job, city, country, phone, picture } = req.body;
    MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        db.collection('finalapp').update({username: username}, {$set: { firstName, lastName, birthday, job, city, country, phone, picture }},
            function(err){
                if(err){
                    console.log(err);
                    res.json({
                        success: false
                    })
                } else {
                    console.log("Updated profile");
                    res.json({
                        success: true
                    })
                }
            })
    })
})

module.exports = router;
