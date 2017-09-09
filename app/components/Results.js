/* NYT React Search - New York Times Article Search Application
Initializing Results component */

// Include dependencies
import React from "react";

// Creates and exports Results component
export default class Results extends React.Component {

	// Initial state setup
	constructor(props){
		super(props);
	}

  // Render the component: displays the search results in a panel
  render() {

    return (
      <div>
        <div className="panel panel-default">

				  <div className="panel-heading">
				    <h3 className="panel-title">Results</h3>
				  </div>

		  		<div className="panel-body">

		    		{/* Loop through the search results and display each article in a well 
		    				with a view artile button and save article button */}
				    {this.props.newResults.map((search, i) => {
		          return (
		            <div className="well" key={i}>
		              <h4>{search.headline.main}</h4>

		              <button 
		              	value={i} // Set the value to the index of the article
		              	className="btn-sm btn-danger save"
		              	// When the button is clicked, it will trigger the findArticle
		              	// function from the Search component
		              	onClick={this.props.findArticle}> 
		              	Save
		              </button>

		              <a href={search.web_url} target="_blank"><button className="btn-sm btn-primary view">View Article</button></a>
		              
		              <p>Publication date: {search.pub_date}</p>
		            </div>
		          );
		        })} 
		  		</div>
		  		
				</div>
      </div>
    ); 
  }
}