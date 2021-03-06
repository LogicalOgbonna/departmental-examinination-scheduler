import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route } from "react-router-dom";
import history from "./utils/history";
import store from "./store";
import setAuthorization from "./utils/setAuthorizationHeader";
// import "bootstrap";
// import "jquery";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
if (localStorage.cost) {
  setAuthorization(JSON.parse(localStorage.cost));
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={App} />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
