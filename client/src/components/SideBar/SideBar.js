import React from "react";

export default function SideBar({page}) {
  return (
    <div className="col-md-2 col-sm-1 hidden-xs display-table-cell v-align box" id="navigation">
    <div className="logo">
        <a hef="home.html"><img src="http://jskrishna.com/work/merkury/images/logo.png" alt="merkery_logo" className="hidden-xs hidden-sm" />
            <img src="http://jskrishna.com/work/merkury/images/circle-logo.png" alt="merkery_logo" className="visible-xs visible-sm circle-logo" />
        </a>
    </div>
    <div className="navi">
        <ul>
            <li className={`${page === "home"? "active": ""}`}><a href="#"><i className="fa fa-home" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Home</span></a></li>
            <li><a href="#"><i className="fa fa-tasks" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Workflow</span></a></li>
            <li><a href="#"><i className="fa fa-bar-chart" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Statistics</span></a></li>
            <li><a href="#"><i className="fa fa-user" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Calender</span></a></li>
            <li><a href="#"><i className="fa fa-calendar" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Users</span></a></li>
            <li><a href="#"><i className="fa fa-cog" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Setting</span></a></li>
        </ul>
    </div>
</div>

  );
}
