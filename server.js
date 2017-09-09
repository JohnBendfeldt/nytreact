/* NYT React Search - New York Times Article Search Application
Initializing express server and mongo database */

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Require Article Schema
var Article = require("./models/Article");

// Create Instance of Express
var app = express();

// Set initial port
var PORT = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Default public directory
app.use(express.static("public"));

// -------------------------------------------------
// MongoDB Configuration

// Local connection
// mongoose.connect("mongodb://localhost/nytreact"); Changed to Heroku mLab;
mongoose.connect("mongodb://heroku_m9sqc6p1:804l1i6ag8575gtj5j7sbe2ffk@ds129374.mlab.com:29374/heroku_m9sqc6p1");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Requiring our api-routes
require("./routes/api-routes.js")(app);

// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
