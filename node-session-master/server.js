/*
 * Manage Session in Node.js and ExpressJS
 * Author : Shahid Shaikh
 * Version : 0.0.1
*/
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/SessionTest")

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
var User = require('./User.js')

app.use(session({secret: 'ssshhhhh', saveUninitialized: true, resave: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var sess;

app.get('/', function (req, res) {
    sess = req.session;
    if (sess.email) {
        res.redirect('/admin');
    }
    else {
        res.render('index.html');
    }
});

function saveUser(req, res) {
    console.log(req.body)
    var user = new User({
        email: sess.email,
        pass: req.body.pass
    });
    user.save(function (err) {
        if (err) {
            res.status(500)
            res.send(err)
        } else {
            res.end('done');
        }
    })
}

app.post('/login', function (req, res) {
    sess = req.session;
    validate(req.body.email, req.body.pass)
        .then(function (users) {
            if (users.length > 0) {
            sess.email = req.body.email;
            res.end('done');
            }
        else {
        res.redirect('/')
    }})
.catch(function (err) {
    res.send(err);
})
});

app.get('/admin', function (req, res) {
    sess = req.session;
    if (sess.email) {
        res.write('<h1>Hello ' + sess.email + '</h1><br>');
        res.end('<a href=' + '/logout' + '>Logout</a>');
    }
    else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href=' + '/' + '>Login</a>');
    }

});

app.get('/logout', function (req, res) {

    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    });

});

function validate(email, pass) {
    return User.find({email: email, pass: pass})
}


app.listen(3000, function () {
    console.log("App Started on PORT 3000");
});

module.exports = app;
