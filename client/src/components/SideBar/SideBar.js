import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/Lineage_OS_Logo.png";

export default function SideBar({ page }) {
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
            <Link to="/">
              <i className="fa fa-home" aria-hidden="true" />
              <span className="hidden-xs hidden-sm">Home</span>
            </Link>
          </li>
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
          <li className={`${page === "scheduler" ? "active" : ""}`}>
            <Link to="/scheduler">
              <i className="fa fa-user" aria-hidden="true" />
              <span className="hidden-xs hidden-sm">Scheduler</span>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className="fa fa-calendar" aria-hidden="true" />
              <span className="hidden-xs hidden-sm">Users</span>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className="fa fa-cog" aria-hidden="true" />
              <span className="hidden-xs hidden-sm">Setting</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
