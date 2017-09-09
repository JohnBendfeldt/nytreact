/* NYT React Search - New York Times Article Search Application
Initializing Saved component */

// Import dependencies
import React from "react";
import helper from "./utils/helpers";

// Creates and exports the Saved component
export default class Saved extends React.Component {

  // Inital state setup
  constructor(props) {
    super(props);

    this.state = {
      results: [] // array that holds articles saved in the database
    }

    this.removeArticle = this.removeArticle.bind(this);
  }

  // During initial load...
  componentDidMount() {

    // Grab the saved articles from the database
    helper.allArticles().then(data => {
      
      // Sets articles from the db to the results array
      this.setState({results: data}); 
    });
  }

  // This method will remove saved articles 
  removeArticle(event){

    // Delete the article from the dabase
    helper.removeArticle(event.target.value).then(() => {

      // Grab articles from the db in order to re-render component
      helper.allArticles().then(data => this.setState({results: data}));
    });
  }

  // Render the component: displays the saved articles 
  // or notifies user to start saving articles
  render() {

    // If there are articles saved, it renders a panel with the articles
    if (this.state.results.length !== 0) {
      return (
        <div className="container">
          <div className="panel panel-default">

            <div className="panel-heading">
              <h3 className="panel-title">Saved Articles</h3>
            </div>

            <div className="panel-body">
          {/* for each article saved in the database, render it in a well */}
              {this.state.results.map(search => {
                return (
                  <div className="well" key={search._id}>
                    <h4>{search.title}</h4>

                    <button 
                      value={search._id} 
                      className="btn-sm btn-danger" 
                      onClick={this.removeArticle}>
                        Delete
                    </button>

                    <a href={search.url} target="_blank">
                      <button className="btn-sm btn-primary view">
                        View Article
                      </button>
                    </a>

                    <p>Publication Date: {search.date}</p>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      );
    }

    // If there no articles, notify the user there are no articles saved
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-body" id="no-saved">
          No saved articles! Head to the Search page.
          </div>
        </div>
      </div>
    );

  }
}



