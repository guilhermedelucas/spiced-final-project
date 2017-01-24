const express = require('express');
const app = express();
var userData = require('./jsonsample.json');
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

app.get('/test', function(req, res){
    res.json({
        userData
    });
});



app.listen(8080, function() {
    console.log("I'm listening.")
});
