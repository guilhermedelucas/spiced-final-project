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
            db.collection('finalapp')
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
    if (req.session.username) {
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);
            db.collection('finalapp').find({username: req.session.username}).toArray(function(err, result){
                if (err) {
                    console.log(err)
                } else if (result.length){
                    res.json({
                        userData: result,
                        loggedIn: true
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
            db.collection('finalapp').find(query).toArray(function(err, result){
                const searchData = result;
                db.collection('finalapp').find({username: currentUser}).toArray(function(err, result){
                    const currentUserData = result;
                    res.json({
                        searchData,
                        currentUserData
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
    //         db.collection('finalapp').find(query).toArray(function(err, result){
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
        db.collection('finalapp').find({email: req.body.email}).toArray(function(err, result){
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
                    console.log(data);
                }).catch(function(err){
                    console.log(err);
                })
            }
        })
    })
});




// console.log(data);
// var checkPass = hashingAndChecking.checkPassword(req.body.password, data.rows[0].password); //typedPass, dbPass
// return checkPass.then(function(data) {
//     // if pass match >> data = true
//     if (data === true) {
//         console.log("password match");
//         req.session = {
//             username: req.body.username
//         }
//         res.json({
//             success: true,
//             session: req.body.username
//         })
//         console.log("response sent");
//     } else if (data === false) {
//         console.log("password doesn't match");
//         res.json({
//             error: "Password is wrong! Please check and submit again."
//         })
//     }
// })
// }).catch(function(err) {
// console.log(err);
// res.json({
//     error: "Username is not correct!"
// });
// });




module.exports = router;
