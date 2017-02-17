const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const checkPassword = require('./passwordhashing/hash').checkPassword;

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
    if (req.session.username) {
        MongoClient.connect(url, function(err, db){
            assert.equal(null, err);
            console.log("Conected successfully to server");
            db.collection('userData')
            .aggregate([
                    { $match: { username: req.session.username } },
                    { $unwind: "$items"},
                    { $group: { _id : '$items.collection', genre: { $addToSet: '$items.genre'}, platform: {$addToSet: '$items.platform'}, media: {$addToSet:'$items.media'}}},
                    { $sort: {_id: 1}}
                ]).toArray(function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({
                        navbar: result,
                        loggedIn: true
                    })
                }
            })
        })
    } else {
        res.json({
            loggedIn: false
        })
    }
})

router.get('/userdata', function(req, res) {
    const currentUser = req.session.username;
    console.log(currentUser);
    if (req.session.username) {
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);
            db.collection('userData').find({username: req.session.username}).toArray(function(err, result){
                if (err) {
                    console.log(err)
                } else if (result.length){
                    db.collection('friendships').find({ $or: [{username_one: currentUser}, {username_two: currentUser}], $and: [{ $or: [{currentStatus: "yes"}]}]}).count(function(err, count){
                        const friendsTotal = count;
                        console.log(err, count);

                        res.json({
                            userData: result,
                            friendsTotal,
                            loggedIn: true
                        })
                    })
                } else {
                    res.send('no document found')
                }
            })
        })
    } else {
        res.json({
            loggedIn: false
        })
    }
})

router.get('/frienddata/:id', function(req, res) {
    const currentFriend = req.params.id;
    const currentUser = req.session.username;
    console.log(currentFriend);
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('userData').find({username: currentFriend}, {password:0}).toArray(function(err, result){
            const userData = { result }
            if (err) {
                console.log(err)
            } else if (result.length){
                db.collection('friendships').find({$or: [{username_one: currentUser}, {username_two: currentFriend}], $and: [{ $or: [{username_one: currentFriend}, { username_two: currentUser
                        }]}], $and: [{currentStatus: "yes"}]}
                ).toArray(function(err, result){
                    console.log(result);
                    if (result.length > 0) {
                        const friendsCheck = true;
                        db.collection('friendships').find({ $or: [{username_one: currentUser}, {username_two: currentUser}], $and: [{ $or: [{currentStatus: "yes"}]}]}).count(function(err, result){
                            const friendsTotal = result
                            res.json({
                                userData,
                                friendsCheck,
                                friendsTotal
                            })
                        })
                    } else {
                            const friendsCheck = false;
                            res.json({
                                userData,
                                friendsCheck,
                                friendsTotal
                            })
                        }
                    })
            } else {
                console.log("error" + err);
                res.send('user not found')
            }
        })
    })
})




router.get('/friendslist', function(req, res){
    const currentUser = req.session.username
    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        db.collection('friendships').find({ username_one: currentUser, currentStatus: "pending"}).toArray(function (err, result){
            if (err) {
                console.log(err);
            } else {
                const waitingList = result;
                    db.collection('friendships').find({ username_two: currentUser, currentStatus: "pending" }).toArray(function(err, result){
                        if (err) {
                            console.log(err);
                        } else {
                            const replyList = result
                            db.collection('friendships').find({ $or:[{ username_one: currentUser}, {username_two: currentUser}], $and: [{ currentStatus: "yes"}]
                            }).toArray(function(err, result){
                                if(err) {
                                    console.log(err);
                                } else {
                                    const friendsList = result
                                    res.json({
                                        waitingList, replyList, friendsList, currentUser
                                    })
                                }
                            })
                        }
                    })
                }
            })
        })
})


router.get('/singleitem/:id', function(req, res){
    var itemId = req.params.id;
    MongoClient.connect(url, function (err, db){
        assert.equal(null, err);
        db.collection('userData')
        .aggregate([
            { $match: { username: "guilhermedelucas" } },
            { $unwind: "$items"},
            { $match: { "items._id": ObjectId(itemId)}},
            { $project: { item: "$items" } }
        ]).toArray( function (err, result) {
            if (err) {
                console.log(err)
            } else if (result.length){
                console.log(result);
                res.json({
                    itemData: result
                })
            } else {
                res.send('no document found')
            }
        })
    })
})

router.get('/logout', function(req, res){
    req.session = null;
    if (!req.session) {
        res.json({
            loggedOut: true
        })
    } else {
        res.json({
            loggedOut: false
        })
    }
});

router.get('/loggedin', function(req, res){
    if (req.session.username) {
        res.json({
            loggedIn: true
        })
    } else {
        res.json({
            loggedIn: false
        })
    }
})

router.get('/search/:id', function(req, res){
    const searchType = req.query.searchtype;
    const currentUser = req.session.username
    var search = req.params.id;
    if (searchType == "friends") {
        var regex = RegExp("/.*" + search + ".*/");
        var query = { username: new RegExp('^' + search) };
        console.log(query);
        MongoClient.connect(url, function(err, db){
            assert.equal(null, err);
            db.collection('userData').find(query).toArray(function(err, result){
                const searchData = result;
                db.collection('userData').find({username: currentUser}).toArray(function(err, result){
                    const currentUserData = result;
                    db.collection('friendships').find({ $or: [{username_one: currentUser}, {username_two: currentUser}], $and: [{ $or: [{currentStatus: "yes"}, {currentStatus:"no"}, {currentStatus:"pending"}]}]}).toArray(function(err, result){
                        const friendsRequest = result;
                        res.json({
                            searchData,
                            currentUserData,
                            friendsRequest
                        })
                    })
                })
            })
        })
    }
    // else {
    //     var regex = RegExp("/.*" + search + ".*/");
    //     var query = { username: new RegExp('^' + search) };
    //     console.log(query);
    //     MongoClient.connect(url, function(err, db){
    //         assert.equal(null, err);
    //         db.collection('userData').find(query).toArray(function(err, result){
    //             res.json({
    //                 searchData: result
    //             })
    //         })
    //
    // }
    //need to add friends to list to search the objects on others lists
})


router.post('/login', function(req, res){
    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        console.log(req.body.email);
        db.collection('userData').find({email: req.body.email}).toArray(function(err, result){
            console.log(result);
            if (err || result.length == 0){
                console.log(err);
                res.json({
                    loggedIn: false,
                    incorrectEmail: true
                })
            } else {
                checkPassword(req.body.password, result[0].password).then(function(data){
                    if (data) {
                        req.session.username = result[0].username;
                        res.json({
                            loggedIn: true
                        })
                    } else {
                        res.json({
                            loggedIn: false,
                            incorrectPassword: true
                        })
                    }
                }).catch(function(err){
                    console.log(err);
                })
            }
        })
    })
});

module.exports = router;
