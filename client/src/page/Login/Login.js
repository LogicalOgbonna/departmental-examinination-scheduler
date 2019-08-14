import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
  render() {
    return (
      <div>
        <div style={{ marginTop: 200 }} id="login" className="container">
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
                <div className="row">
                  <div className="col-md-6">
                    <Link
                      // style={{ float: "left" }}
                      to="/register"
                      className=" mt-3"
                    >
                      I already have an account
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
                      Login
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
