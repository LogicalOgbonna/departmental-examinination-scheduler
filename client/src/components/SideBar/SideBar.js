import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/Lineage_OS_Logo.png";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

function SideBar({ page, logout, admin }) {
  return (
    <div
      className="col-md-2 col-sm-1 hidden-xs display-table-cell v-align box"
      id="navigation"
    >
      <div className="logo">
        <Link to="home.html">
          <img src={logo} alt="merkery_logo" className="hidden-xs hidden-sm" />
          <img
            src={logo}
            alt="merkery_logo"
            className="visible-xs visible-sm circle-logo"
          />
        </Link>
      </div>
      <div className="navi">
        <ul>
          <li className={`${page === "home" ? "active" : ""}`}>
            <Link to="/dashboard">
              <i className="fa fa-home" aria-hidden="true" />
              <span className="hidden-xs hidden-sm">Home</span>
            </Link>
          </li>
          {admin && (
            <React.Fragment>
              <li className={`${page === "courses" ? "active" : ""}`}>
                <Link to="/courses">
                  <i className="fa fa-tasks" aria-hidden="true" />
                  <span className="hidden-xs hidden-sm">Courses</span>
                </Link>
              </li>
              <li className={`${page === "lecturers" ? "active" : ""}`}>
                <Link to="/lecturers">
                  <i className="fa fa-bar-chart" aria-hidden="true" />
                  <span className="hidden-xs hidden-sm">Lecturers</span>
                </Link>
              </li>
              <li className={`${page === "halls" ? "active" : ""}`}>
                <Link to="/halls">
                  <i className="fa fa-institution" aria-hidden="true" />
                  <span className="hidden-xs hidden-sm">Halls</span>
                </Link>
              </li>
              <li className={`${page === "scheduler" ? "active" : ""}`}>
                <Link to="/scheduler">
                  <i className="fa fa-calendar" aria-hidden="true" />
                  <span className="hidden-xs hidden-sm">Scheduler</span>
                </Link>
              </li>
              <li className={`${page === "complaints" ? "active" : ""}`}>
                <Link to="/complaints">
                  <i className="fa fa-paste" aria-hidden="true" />
                  <span className="hidden-xs hidden-sm">Complaints</span>
                </Link>
              </li>
              <li className={`${page === "settings" ? "active" : ""}`}>
                <Link to="/settings">
                  <i className="fa fa-cog" aria-hidden="true" />
                  <span className="hidden-xs hidden-sm">Setting</span>
                </Link>
              </li>
            </React.Fragment>
          )}

          {!admin && (
            <li className={`${page === "complaints" ? "active" : ""}`}>
              <Link to="/complaints">
                <i className="fa fa-paste" aria-hidden="true" />
                <span className="hidden-xs hidden-sm">Make a Complain</span>
              </Link>
            </li>
          )}
          <li>
            <Link onClick={() => logout()} to="/">
              <i className="fa fa-user-times" aria-hidden="true" />
              <span className="hidden-xs hidden-sm">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  admin: state.user.user.admin
});

export default connect(
  mapStateToProps,
  { logout }
)(SideBar);
