import React from "react";
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";

export default function Profile() {
  return (
    <div>
      <div className="container-fluid display-table">
        <div className="row display-table-row">
          <SideBar page="home" />
          <div className="col-md-10 col-sm-11 display-table-cell v-align">
            <Header />
            <div className="user-dashboard">
              <h1>Dashboard</h1>
              <div className="row">
                <div className="col-md-5 col-sm-5 col-xs-12 gutter">
                  <div className="sales ">
                    <h2>Courses</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
