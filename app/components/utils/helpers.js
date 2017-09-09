/* NYT React Search - New York Times Article Search Application
Initializing http requests */

// Include dependencies
import axios from "axios";
import moment from "moment";

// Methods that will be used to read, post, and delete articles from the database,
// including making calls to the nyt api 
var helper = {

	// Saved Component -----------------------------------------------------------------
	
	// Read all articles saved in the database
	allArticles: function(){
		return axios.get("/articles").then(response => {
			
			// Format saved date using moment. Ex: Sep 21, 2016 | 5:03PM
			for (let i=0; i < response.data.length; i++){
				if (response.data[i].date !== "not available") {
					response.data[i].date = moment(response.data[i].date, "YYYY-MM-DDTHH:mm:ss[Z]").format("MMM DD, YYYY");
				}
			}
			
			// return saved articles
			return response.data;
		});
	},

	// Remove an article from the database
	removeArticle: function(id){
		return axios.delete("/delete-article/" + id);
	},

	// Search component -----------------------------------------------------------------
	
	// Makes calls to the nyt api in order to obtain articles from the search
	runNytSearch: function(topic, startYear, endYear) {

		// API key to be used in the request
		var apiKey = "4448ba2684884498a639fe1c8ae8c822";

		// Base url
		var url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}
			&q=${topic}`;

		// If a start year is provided, add start_date to the url
		if (startYear){
			url += `&start_date=${startYear}0101`;
		}

		// If a end year is provided, add end_date to the url
		if (endYear) {
			url += `&end_date=${endYear}0101`
		}

		// Once the  results are returned from nyt api request, return 5 articles
		return axios.get(url).then(function(response) {
			var articleLimit = 5;
			var newData = response.data.response.docs;
      var newResults = [];

      // Loop throught the articles array and format the date
      for (let j=0; j < articleLimit; j++){

      	// If the date exists, format the date using moment
      	if (newData[j].pub_date) {
      		newData[j].pub_date = moment(newData[j].pub_date, moment.ISO_8601).format("MMM DD, YYYY");
      	}
      	// If the date is not available, notify the user
      	else {
      		newData[j].pub_date = "not available";
      	}

        newResults.push(newData[j]);
      }

      // Return the newResults array (articles with date formatted)
			return newResults;
		});
	},

	// Saves articles to the database
	saveArticle: function(article) {

		let {headline: {main: title}, web_url: url, pub_date: date} = article;

		if (date !== "not available") {
			date = moment(date, "MMM DD, YYYY").format("YYYY-MM-DDTHH:mm:ss[Z]");
		}
	
		// Return new article information (not needed, but maybe for future development)
		return axios.post("/save-article", {title: title, url: url, date: date})
	}

}

// Export helper
export default helper;
