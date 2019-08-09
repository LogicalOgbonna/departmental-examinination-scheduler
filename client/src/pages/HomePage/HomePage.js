import React from "react";
import { Header, Footer, SideBar } from "../../components";

export default function HomePage() {
  return (
    <div>
      <div className="container-fluid display-table">
        <div className="row display-table-row">
          <SideBar page="home" />
          <div className="col-md-10 col-sm-11 display-table-cell v-align">
            <Header />
            <div className="user-dashboard">
              <h1>Hello, JS</h1>
              <div className="row">
                <div className="col-md-5 col-sm-5 col-xs-12 gutter">
                  <div className="sales">
                    <h2>Your Sale</h2>

                    <div className="btn-group">
                      <button
                        className="btn btn-secondary btn-lg dropdown-toggle"
                        type="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span>Period:</span> Last Year
                      </button>
                      <div className="dropdown-menu">
                        <a href="#">2012</a>
                        <a href="#">2014</a>
                        <a href="#">2015</a>
                        <a href="#">2016</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-7 col-sm-7 col-xs-12 gutter">
                  <div className="sales report">
                    <h2>Report</h2>
                    <div className="btn-group">
                      <button
                        className="btn btn-secondary btn-lg dropdown-toggle"
                        type="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span>Period:</span> Last Year
                      </button>
                      <div className="dropdown-menu">
                        <a href="#">2012</a>
                        <a href="#">2014</a>
                        <a href="#">2015</a>
                        <a href="#">2016</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
          </div>
        </div>
      </div>
      <div id="add_project" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header login-header">
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
              <h4 className="modal-title">Add Project</h4>
            </div>
            <div className="modal-body">
              <input type="text" placeholder="Project Title" name="name" />
              <input type="text" placeholder="Post of Post" name="mail" />
              <input type="text" placeholder="Author" name="passsword" />
              <textarea placeholder="Desicrption" />
            </div>
            <div className="modal-footer">
              <button type="button" className="cancel" data-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                className="add-project"
                data-dismiss="modal"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
