import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import validator from "validator";

import { register } from "../../actions/auth";

import "./Register.css";

class Register extends Component {
  state = {
    email: "",
    password: "",
    confirm_password: "",
    errors: {},
    loading: false
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps(next) {
    if (next.errors) {
      const errors = {};
      if (next.errors.password) errors.password = next.errors.password;
      if (next.errors.email) errors.email = next.errors.email;
      if (next.errors.confirm_password)
        errors.confirm_password = next.errors.confirm_password;

      this.setState({ errors, loading: false });
      // console.log(next.errors);
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.register(this.state);
      this.setState({ loading: true });
    }
  };

  validate = data => {
    const errors = {};

    if (!data.email) errors.email = "Can't be blank";
    if (!data.password) errors.password = "Can't be blank";
    if (!data.confirm_password) errors.confirm_password = "Can't be blank";
    if (data.password !== data.confirm_password)
      errors.password = "passwords must match";
    if (!validator.isEmail(data.email)) errors.email = "Invalid Email";
    return errors;
  };
  render() {
    return (
      <div>
        <div id="register" className="container">
          <div className="row">
            <div className="col-md-4" />
            <div className="col-md-4 ">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    onChange={this.onChange}
                  />
                  {this.state.errors && (
                    <small id="emailHelp" className="form-text text-danger">
                      {this.state.errors.email}
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    onChange={this.onChange}
                  />
                  {this.state.errors && (
                    <small id="emailHelp" className="form-text text-danger">
                      {this.state.errors.password}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="confirm_password">Confirm Password</label>
                  <input
                    type="password"
                    name="confirm_password"
                    className="form-control"
                    id="confirm_password"
                    placeholder="Retype Password"
                    onChange={this.onChange}
                  />
                  {this.state.errors && (
                    <small id="emailHelp" className="form-text text-danger">
                      {this.state.errors.confirm_password}
                    </small>
                  )}
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
                      disabled={this.state.loading}
                      type="submit"
                      className="btn btn-primary left"
                      // style={{ float: "left" }}
                    >
                      {this.state.loading ? "Wait ..." : "Register"}
                      {/* Register */}
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
const mapStateToProps = state => ({
  errors: state.user.authError
});
export default connect(
  mapStateToProps,
  { register }
)(Register);
