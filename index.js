const express = require('express');
const app = express();
const insertDataRouter = require('./routes/insertroutes');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const getDataRouter = require('./routes/getdataroutes');
const bodyParser = require('body-parser');
const fs = require('fs');
const request = require('request');


app.use(cookieParser());
app.use(cookieSession({
    secret: process.env.SESSION_SECRET || 'Moalways late to Spiced Academy',
    //add this secret to vars on heroku;
    maxAge: 1000 * 60 * 60 * 24 * 14
}));

//Setting the webpack
if (process.env.NODE_ENV != 'production') {
    app.use(require('./webpack.config.js'));
}

app.use(bodyParser.urlencoded({
    limit: '5mb', extended: false }));

app.use(bodyParser.json({
    limit: '5mb' }));

app.use(express.static('uploads'));

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next){
    console.log(req.method);
    console.log(req.url);
    next();
});

app.use('/insertdata', insertDataRouter);
app.use('/getdata', getDataRouter);

// Routes Get
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

setInterval(function() {
    request('https://source.unsplash.com/random/1440x900', {
        encoding: 'binary'
    }, function(req, res, body) {
        fs.writeFile('./public/imgs/background.jpg', body, 'binary', function(err) {
            console.log(err);
        });
    });
}, 1000000);

app.listen(8080, () => {
    console.log("I'm listening.")
});
