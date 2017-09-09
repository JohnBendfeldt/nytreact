/* NYT React Search - New York Times Article Search Application
Initializing Search component */

// Import dependencies
import React from "react";
import helper from "./utils/helpers";

// Import children components
import Query from "./Query";
import Results from "./Results";

// Creates and exports the Search component
export default class Search extends React.Component {

  // Initial state setup
  constructor(props) {
    super(props);

    this.state = {
      topic: "",
      startYear: "",
      endYear: "",
      results: [] 
    }

    this.setSearch = this.setSearch.bind(this);
    this.findArticle = this.findArticle.bind(this);
  }

  // Sets the search parameters for the nyt api search
  setSearch(topic, startYear, endYear) {

    // Sets state for topic, startYear, endYear according to user input
    // from the search form in the Query Component
    this.setState({topic: topic, startYear: startYear, endYear: endYear});
  }

  // Saves the article to the database and removes it from the page
  findArticle(event){

    // event.target.value is obtained from the Results component,
    // it represents the index of the article in the results array
    var index = event.target.value

    // Saves the article to the database and then removes it from the
    // results array so that it won't be displayed any longer
    helper.saveArticle(this.state.results[index]).then(() => {

      var currentArticles = this.state.results;
      currentArticles.splice(index,1);

      this.setState({results: currentArticles});
    });
  }

  // Everytime the state of the component is updated...
  componentDidUpdate(prevProps, prevState){
    
    // If search parameters changed...
    if (prevState.topic !== this.state.topic || prevState.startYear !== this.state.startYear 
      || prevState.endYear !== this.state.endYear) {
      
      // Run a new nyt search to obtain new results
      helper.runNytSearch(this.state.topic, this.state.startYear, this.state.endYear).then(response => {
        
        // If results changed from previous results, set results array to the new data
        if (response !== this.state.results) {
          this.setState({results: response});
        }
      });
    }
  }
  
  // Render the component: displays search form/results panel
  render() {

    // If we have data in the results array, display the results panel
    if (this.state.results.length !== 0) {
      return (
        <div className="container">
          <Query setSearch={this.setSearch} />
          <Results newResults={this.state.results} findArticle={this.findArticle} />
        </div>
      );
    }

    // If results arrays is empty, then only display search form
    return (
      <div className="container">
        <Query setSearch={this.setSearch}/>
      </div>
    );
  }
}

