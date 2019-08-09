import React from "react";
import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
import { Router, Route } from "react-router-dom";
import history from "./utils/history";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Router history={history}>
    <Route component={App} />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
