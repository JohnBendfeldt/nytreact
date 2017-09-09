/* NYT React Search - New York Times Article Search Application
Express api-routes with mongoose queries */

// Requiring our models
var Article = require("../models/Article.js");

// Export routes to server.js
module.exports = function(app){

	// Grabs saved articles from the database
	app.get("/articles", function(readReq, readRes){

		// Find articles that have been saved
		Article.find({}, function(err, docs){

			readRes.json(docs)
		});
	});

	// Add new article to the database
	app.post("/save-article", function(createReq, createRes){


		// Object that will be used to save documents into Articles collection
		var results = {};

		results.title = createReq.body.title;
		results.url = createReq.body.url;
		results.date = createReq.body.date;
				
		// Create new instance of Article Model
		var newArticle = new Article(results);

		// Save newArticle to database
		newArticle.save(function(err, newDoc){
			if (err) return;

			createRes.json(newDoc);
		});
			
	});

	
	// Delete an article from the database
	app.delete("/delete-article/:id", function(deleteReq, deleteRes){

		// Find article by id and remove from Comments Collection
		Article.findByIdAndRemove(deleteReq.params.id).exec(function(err, removedDoc){
			deleteRes.json(removedDoc);
		});
	});

}