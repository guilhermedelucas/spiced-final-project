const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const checkPassword = require('./passwordhashing/hash').checkPassword;
const _ = require("underscore");

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
                db.collection('friendships').find({ $or: [{ $and: [{username_one: currentUser}, {username_two: currentFriend}, {currentStatus: "yes"}]}, { $and: [{username_one: currentFriend}, {username_two: currentUser}, {currentStatus: "yes"} ]}]}).toArray(function(err, result){
                    if (result.length > 0) {
                        const friendsCheck = true;
                        db.collection('friendships').find({ $or: [{username_one: currentFriend}, {username_two: currentFriend}], $and: [{ $or: [{currentStatus: "yes"}]}]}).toArray(function(err, result){
                            const friendsTotal = result.length;
                            const friendsData = result
                            res.json({
                                userData, friendsCheck, friendsTotal, friendsData
                            })
                        })
                    } else {
                            const friendsCheck = false;
                            res.json({
                                userData,
                                friendsCheck
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

router.get('/frienditems/:id', function(req, res){
    const currentFriend = req.params.id;
    MongoClient.connect(url, function (err, db){
        assert.equal(null, err);
        db.collection('userData').find({username: currentFriend}, {password: 0}).toArray(function(err,result){
            if (err){
                console.log(err);
                res.json({
                    success: false
                })
            } else {
                console.log(result);
                var user
                const userItems = result
                res.json({
                    currentFriend, userItems
                })
            }
        })
    })
})

router.get('/mymessages', function(req, res){
    const currentUser = req.session.username;
    MongoClient.connect(url, function (err,db){
        assert.equal(null, err);
        db.collection('messages').find({ $or: [{from: currentUser}, {to: currentUser}]}).sort({sent: -1}).toArray(function(err, result){
            if(err){
                res.json({
                    success: false
                })
            } else {
                const messages = result;
                var friendsArray = [];
                result.map(function(item, index){
                    if ( item.from == currentUser ){
                        friendsArray.push(item.to);
                    } if (item.to == currentUser ){
                        friendsArray.push(item.from)
                    }
                })
                const uniqueFrienList = _.uniq(friendsArray)
                db.collection('userData').aggregate([{ $match: { username: { $in: uniqueFrienList }}}, { $project: { username: true, picture: true }}]).toArray(function(err, result){
                    console.log(result);
                    const friendData = result;
                    res.json({
                        messages, friendData, currentUser
                    })
                })
            }
        })
    })
})

router.get('/singleitem/:id', function(req, res){
    var itemId = req.params.id;
    var currentUser = req.session.username;
    MongoClient.connect(url, function (err, db){
        assert.equal(null, err);
        db.collection('userData')
        .aggregate([
            { $match: { username: currentUser } },
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
        var regex = RegExp("/.*" + search + ".*/i");
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
    } else {
        // var regex = RegExp("/.*" + search + ".*/");

        MongoClient.connect(url, function(err, db){
            assert.equal(null, err);
            db.collection('friendships').find({ $or: [{username_one: currentUser}, {username_two: currentUser}], $and: [{currentStatus: "yes"}]}).toArray(function(err, result){
                var friendsArray = [];
                result.map(function(item, index){
                    if ( item.username_one == currentUser ){
                        friendsArray.push(item.username_two);
                    } if (item.username_two == currentUser ){
                        friendsArray.push(item.username_one)
                    }
                })
                db.collection('userData').aggregate([{ $match: { username: { $in: friendsArray }}}, { $unwind: "$items"}, { $match: { "items.name": { $regex : "" + search + "", '$options' : 'i' }}}, { $project: { item: "$items", username: true}}]).toArray(function(err, result){
                    console.log(result);
                    const searchData = result;
                    res.json({
                        searchData,
                        currentUser,
                    })
                    // console.log(result);
                    // now display results and also paginate the results
                });
        })

    })
}

// ([{ $match: { username: { $in: ["guilhermedelucas", "lukearscott"] }}}, { $unwind: "$items"}, { $match: { "items.name": { $regex : /^Super/i } } }, { $project: { item: "$items", username: true}}])

    // { $match: { username: "guilhermedelucas" } },
    // { $unwind: "$items"},
    // { $match: { "items._id": ObjectId(itemId)}},
    // { $project: { item: "$items" } }
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
