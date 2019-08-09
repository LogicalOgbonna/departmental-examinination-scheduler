import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { HomePage } from "./pages";

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact name="Home" component={HomePage} />
      </Switch>
    );
  }
}
