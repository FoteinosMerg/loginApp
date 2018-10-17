import React, { Component } from "react";

// React router setup
import { BrowserRouter, Route } from "react-router-dom";
//  Gives the components the ability to call certain action creators
import { connect } from "react-redux";
import * as actions from "../actions";

import Protected from "./Protected";
import Header from "./Header";
import Landing from "./Landing";

/*
const Landing = () => (
  <div>
    <p>This is developer frontend</p>
    <a href="/index" target="_blank" rel="noopener noreferrer">
      Go to developer backend
    </a>
    <br />
    <a href="/protected" rel="noopener noreferrer">
      Go to protected endpoint
    </a>
    <br />
    <a href="/api/test" target="_blank" rel="noopener noreferrer">
      Test api proxy
    </a>
  </div>
);
*/

class App extends Component {
  componentDidMount() {
    /* Here is the right place to call action creators
      (immediately after loading inside the DOM tree) */
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/protected" component={Protected} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions // Assigned to the App component as props!
)(App);
