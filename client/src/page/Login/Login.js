import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import validator from "validator";

import { login } from "../../actions/auth";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    loading: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      const errors = {};
      if (nextProps.errors.email) errors.email = nextProps.errors.email;
      if (nextProps.errors.password) errors.email = nextProps.errors.password;
      this.setState({ errors, loading: false });
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validate = data => {
    const errors = {};
    if (!data.email) errors.email = "Can't be blank";
    if (!data.password) errors.password = "Can't be blank";
    if (!validator.isEmail(data.email)) errors.email = "Invalid email address";

    return errors;
  };

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.login(this.state);
      this.setState({ loading: true });
    }
  };
  render() {
    return (
      <div>
        <div style={{ marginTop: 200 }} id="login" className="container">
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
                <div className="row">
                  <div className="col-md-6">
                    <Link
                      // style={{ float: "left" }}
                      to="/register"
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
                      {this.state.loading ? "Wait ..." : "Login"}
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
  { login }
)(Login);
