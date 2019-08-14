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
        <a href="home.html">
          <img src={logo} alt="merkery_logo" className="hidden-xs hidden-sm" />
          <img
            src={logo}
            alt="merkery_logo"
            className="visible-xs visible-sm circle-logo"
          />
        </a>
      </div>
      <div className="navi">
        <ul>
          <li className={`${page === "home" ? "active" : ""}`}>
            <a href="/">
              <i className="fa fa-home" aria-hidden="true" />
              <span className="hidden-xs hidden-sm">Home</span>
            </a>
          </li>
          <li className={`${page === "courses" ? "active" : ""}`}>
            <a href="/courses">
              <i className="fa fa-tasks" aria-hidden="true" />
              <span className="hidden-xs hidden-sm">Courses</span>
            </a>
          </li>
          <li className={`${page === "lecturers" ? "active" : ""}`}>
            <a href="/lecturers">
              <i className="fa fa-bar-chart" aria-hidden="true" />
              <span className="hidden-xs hidden-sm">Lecturers</span>
            </a>
          </li>
          <li className={`${page === "scheduler" ? "active" : ""}`}>
            <a href="/scheduler">
              <i className="fa fa-calendar" aria-hidden="true" />
              <span className="hidden-xs hidden-sm">Scheduler</span>
            </a>
          </li>
          <li className={`${page === "settings" ? "active" : ""}`}>
            <a href="/settings">
              <i className="fa fa-cog" aria-hidden="true" />
              <span className="hidden-xs hidden-sm">Setting</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
