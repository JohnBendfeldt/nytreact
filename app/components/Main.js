/* NYT React Search - New York Times Article Search Application
Initializing Main component */

// Include dependencies
import React from "react";
import {Link} from "react-router";

// Creates and exports the Main component
export default class Main extends React.Component {

  // Initial state setup
  constructor(props){
    super(props);
  }

  // Render the component: displays navbar and jumbotron
  render() {

    return (
      <div>
        <nav className="z-depth-4">
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo">NYTScrubber</Link>
                <Link to="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></Link>
                <ul className="right hide-on-med-and-down">
                <li><Link to="/search">Search</Link></li>
                <li><Link to="/saved-articles">Saved Articles</Link></li>
                </ul>
                <ul className="side-nav" id="mobile-demo">
                    <li><Link to="/search">Search</Link></li>
                    <li><Link to="/saved-articles">Saved Articles</Link></li>
                </ul>
            </div>
	    </nav>

        <div className="jumbotron">
          <div>
          <h1>New York Times Article Scrubber</h1>
          <h2>Search for and save interesting articles.</h2>
          </div>
        </div>

        <div>
          {/* Displays search component or  saved component */}
          {this.props.children}
        </div>

      </div>
    );
  }
}


