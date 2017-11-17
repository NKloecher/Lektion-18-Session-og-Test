"use strict";

// INITIALIZATION
// =============================================================================
var config = require('./config');

var express = require('express');        // call express
var app = express();                     // define our app using express
var bodyParser = require('body-parser'); // parses JSON and url-encoded forms on requests
var morgan = require('morgan');          // logs all incoming requests to std.out

app.set('port', (process.env.PORT || config.defaultPort)); // Set the port
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public')); // static files from the public folder

// MONGODB & MONGOOSE SETUP
// =============================================================================
var mongoose = require('mongoose');
mongoose.Promise = global.Promise; // Use new EcmaScript 6 promises
var mongoConnection = mongoose.connect(config.mongoDBhost).connection;
mongoConnection.on('error', function(err) {
    console.error(err.message);
    console.error("MongoDB connection failed");
});
mongoConnection.once('open', function() {
    console.log("MongoDB connection open");
});

// ROUTES FOR THE APP
// =============================================================================
var companyRouter = require('./routes/company')(express);
var employeeRouter = require('./routes/employee')(express);
app.use(companyRouter);
app.use(employeeRouter);

// START THE SERVER
// =============================================================================
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

// Export for use in tests
module.exports = app;

