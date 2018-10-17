import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

// React-Redux setup
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers"; // Import reducers
const store = createStore(reducers, {}, applyMiddleware(reduxThunk)); // Create Redux store

ReactDOM.render(
  // Create app component as child of a provider
  // component providing it with a Redux store
  // and informing all components with updatet states
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
