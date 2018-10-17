import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Protected extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return "Loading...";
      case false:
        return "You are logged out";
      default:
        return "You are logged in";
    }
  }
  render() {
    return (
      <div>
        <p>This is protected</p>
        {this.renderContent()}
        <br />
        <Link to={this.props.auth ? "/" : "/whatever"}>Go to Homepage</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Protected);
