import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";

import {
  HomePage,
  Course,
  Lecturer,
  Scheduler,
  Settings,
  Login,
  Register
} from "./page";
import { UserRoute, GuestRoute } from "./routes";

class App extends Component {
  render() {
    const isAuthenticated = this.props.isAuthenticated;

    return (
      <Switch>
        <GuestRoute
          path="/login"
          exact
          name="Login"
          component={Login}
          isAuthenticated={isAuthenticated}
        />
        <GuestRoute
          path="/"
          exact
          name="Login"
          component={Login}
          isAuthenticated={isAuthenticated}
        />
        <GuestRoute
          path="/register"
          exact
          name="Register"
          component={Register}
          isAuthenticated={isAuthenticated}
        />
        <UserRoute
          path="/dashboard"
          exact
          name="Dashboard"
          component={HomePage}
          isAuthenticated={isAuthenticated}
        />
        {/* <Route path="/dashboard" exact name="Home" component={HomePage} /> */}
        {/* <Route path="/lecturers" exact name="Lecturers" component={Lecturer} /> */}
        <UserRoute
          path="/lecturers"
          exact
          name="Lecturers"
          component={Lecturer}
          isAuthenticated={isAuthenticated}
        />
        {/* <Route path="/courses" exact name="Courses" component={Course} /> */}
        <UserRoute
          path="/courses"
          exact
          name="Courses"
          component={Course}
          isAuthenticated={isAuthenticated}
        />
        {/* <Route path="/scheduler" exact name="Scheduler" component={Scheduler} /> */}
        <UserRoute
          path="/scheduler"
          exact
          name="Scheduler"
          component={Scheduler}
          isAuthenticated={isAuthenticated}
        />
        {/* <Route path="/settings" exact name="Settings" component={Settings} /> */}
        <UserRoute
          path="/settings"
          exact
          name="Settings"
          component={Settings}
          isAuthenticated={isAuthenticated}
        />
      </Switch>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps)(App);
