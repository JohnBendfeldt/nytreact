/* NYT React Search - New York Times Article Search Application
Initializing Query component */

// Include React
import React from "react";

// Creates and exports the Main component
export default class Query extends React.Component {

	// Initial state setup
	constructor(props){
		super(props);

		this.state = {
			topic: "",
			startYear: "",
			endYear: ""
		}
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	// This function will capture user input
	handleChange(event) {

		// As the input field changes, capture the change
		var newState = {};
		newState[event.target.id] = event.target.value;

		// Set the topic, startYear, or endYear to the the change that was captured
		this.setState(newState);
	}	

	// When the Submit button is clicked...
	handleSubmit(event) {
		event.preventDefault();

		// This function sets the search parameters in the Search component
		this.props.setSearch(this.state.topic, this.state.startYear, this.state.endYear);

		// Empty user input
		this.setState({topic: "", startYear: "", endYear: ""});
	}

  	// Render the component: displays the search form 
  	// For each input field provide the handleChange function in order to capture user input
  	render() {

	    return (
	    	<div>
	        <div className="panel panel-default">

						<div className="panel-heading">
			    		<h3 className="panel-title">Search</h3>
			  		</div>

			  		<div className="panel-body">
				    	<form onSubmit={this.handleSubmit}>
		            <div className="form-group">

		            	<h5>Topic</h5>
		            	<input
		               	value={this.state.topic}
		                type="text"
		                className="form-control"
		                id="topic"
		                onChange={this.handleChange}
		                required
		              />

	              	<h5>Start Year (Optional)</h5>
	              	<input
		               	value={this.state.startYear}
		                type="text"
		                className="form-control"
		                id="startYear"
		                onChange={this.handleChange}
				          />

		              <h5>End Year (Optional)</h5>
			            <input
			            	value={this.state.endYear}
			            	type="text"
			              className="form-control"
		                id="endYear"
		                onChange={this.handleChange}			               
		              />
		              <br />

				          <button className="btn-sm btn-primary" type="submit">Submit</button>
		            </div>
		          </form>
			  		</div>
			  		
					</div>
	    	</div>
	    );
  	}
}