import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return; // Page loading
      case false:
        return (
          <li>
            <a href="/api/users/login">Log in</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/users/logout">Logout</a>
          </li>
        );
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? "/protected" : "/"}
            className="#"
            class="brand-logo"
          >
            Project
          </Link>
          <ul class="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
