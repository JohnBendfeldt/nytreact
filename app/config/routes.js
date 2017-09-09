/* NYT React Search - New York Times Article Search Application
Initializing single page routing */


// Include the React library
import React from "react";

// Include the react-router module along with...
// the Route component for displaying individual routes
// the Router component to contain all our Routes
// the hashHistory prop to handle routing client side without a server
// the IndexRoute (catch-all route)
import router, {Route, Router, hashHistory, IndexRoute} from "react-router";

// Reference the high-level components
import Main from "../components/Main";
import Search from "../components/Search";
import Saved from "../components/Saved";


// Export the Routes
export default (

  // The high level component is the Router component
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
    	<Route path="/search" component={Search}></Route>
    	<Route path="/saved-articles" component={Saved}></Route>
    	<IndexRoute component={Search} />
    </Route>
  </Router>

);
