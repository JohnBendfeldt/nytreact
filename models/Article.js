/* NYT React Search - New York Times Article Search Application
Initializing Article schema and model (Mongodb) */

// Require mongoose
var mongoose = require("mongoose");

// Create Schema class
var Schema = mongoose.Schema;

// Create a ArticleSchema with the Schema class
var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  url: {
  	type: String,
  	required: true

  },
  date: {
    type: String
  }
});

var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;