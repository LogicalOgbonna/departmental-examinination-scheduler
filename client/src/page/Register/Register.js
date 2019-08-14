import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Register.css";

export default class Register extends Component {
  render() {
    return (
      <div>
        <div id="register" className="container">
          <div className="row">
            <div className="col-md-4" />
            <div className="col-md-4 ">
              <form
              // onSubmit={this.onSubmit}
              >
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    // onChange={this.onChange}
                  />
                  {/* {this.state.errors && (
                    <small id="emailHelp" className="form-text text-danger">
                      {this.state.errors.email}
                    </small>
                  )} */}
                </div>
                <div className="form-group">
                  <label htmlFor="reason">Purpose</label>
                  <select
                    id="reason"
                    name="reason"
                    className="form-control"
                    // value={this.state.reason}
                    // onChange={this.onChange}
                  >
                    <option value="">Select Purpose...</option>
                    <option value="Research">Research</option>
                    <option value="Developer">Developer</option>
                    <option value="Company">Company</option>
                  </select>
                  {/* {this.state.errors && (
                    <small id="emailHelp" className="form-text text-danger">
                      {this.state.errors.reason}
                    </small>
                  )} */}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    // onChange={this.onChange}
                  />
                  {/* {this.state.errors && (
                    <small id="emailHelp" className="form-text text-danger">
                      {this.state.errors.password}
                    </small>
                  )} */}
                </div>

                <div className="form-group">
                  <label htmlFor="confirm_password">Confirm Password</label>
                  <input
                    type="password"
                    name="confirm_password"
                    className="form-control"
                    id="confirm_password"
                    placeholder="Retype Password"
                    // onChange={this.onChange}
                  />
                  {/* {this.state.errors && (
                    <small id="emailHelp" className="form-text text-danger">
                      {this.state.errors.confirm_password}
                    </small>
                  )} */}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Link
                      // style={{ float: "left" }}
                      to="/login"
                      className=" mt-3"
                    >
                      I don't have an account
                    </Link>
                  </div>
                  <div className="col-md-6">
                    <button
                      // disabled={this.state.loading}
                      type="submit"
                      className="btn btn-primary left"
                      // style={{ float: "left" }}
                    >
                      {/* {this.state.loading ? "Wait ..." : "Register"} */}
                      Register
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-4" />
          </div>
        </div>
      </div>
    );
  }
}
