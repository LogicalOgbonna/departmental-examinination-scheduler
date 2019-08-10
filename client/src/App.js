import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { HomePage, Course, Lecturer, Scheduler } from "./page";

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact name="Home" component={HomePage} />
        <Route path="/lecturers" exact name="Lecturers" component={Lecturer} />
        <Route path="/courses" exact name="Courses" component={Course} />
        <Route path="/scheduler" exact name="Scheduler" component={Scheduler} />
      </Switch>
    );
  }
}
