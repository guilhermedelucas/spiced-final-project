const express = require('express');
const app = express();
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');
var userData = require('./jsonsample2.json');
var url = 'mongodb://localhost:27017/finalapp';
console.log(userData);

if (process.env.NODE_ENV != 'production') {
    app.use(require('./webpack.config.js'));
}

app.use(function(req, res, next){
    console.log(req.method);
    console.log(req.url);
    next();
})


app.use(express.static(__dirname + '/public'));

app.get('/getnavbar', function(req, res){
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Coneected successfully to server");
        db.collection('finalapp')
        .aggregate([
             { $match: { username: "guilhermedelucas" } },
             { $unwind: "$items"},
             { $group: { _id : '$items.collection', genre: { $addToSet: '$items.genre'}, platform: {$addToSet: '$items.platform'}, media: {$addToSet:'$items.media'}}},
             { $sort: {_id: 1}}
            ]).toArray(function(err, result){
            if (err) {
                console.log(err);
            } else if (result.length){
                res.json({
                    navbar: result
                })
            } else {
                res.send('no documen found');
            }
        })
    })
})

app.get('/test', function(req, res){
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      db.collection('finalapp').aggregate([
                     { $match: { username: "guilhermedelucas" } },
                     { $unwind: "$items"},
                     { $match: { 'items.collection': "Music" } },
                     { $group: { _id : '$items.collection', genre: { $addToSet: '$items.genre'}, items: { $push : '$items'} } },
                 ]).toArray(function(err, result) {
                     if (err) {
                         console.log(err);
                     } else {
                         console.log(result);
                     }
                 });
      db.close();
    });
    res.json({
        userData
    });
});

app.get('*', function(req, res){
    res.redirect('/')
});



app.listen(8080, function() {
    console.log("I'm listening.")
});
