import React from "react";
import { connect } from "react-redux";
import { Header, Footer, SideBar } from "../../components";
import { getDetails, schedule } from "../../actions/scheduler";
import { ScheduleTabel } from "../../components/Table/Table";

class Scheduler extends React.Component {
  componentDidMount() {
    this.props.getDetails();
    this.props.schedule();
  }
  render() {
    return (
      <div>
        <div className="container-fluid display-table">
          <div className="row display-table-row">
            <SideBar page="scheduler" />
            <div className="col-md-10 col-sm-11 display-table-cell v-align">
              <Header />
              <div className="user-dashboard">
                <h1>Time Table Scheduler</h1>
                <div className="row">
                  <div className="col-md-6 col-sm-6 col-xs-12 gutter">
                    <div className="sales">
                      <h2>Number of Lecturers</h2>

                      <div className="btn-group">
                        <button
                          className="btn btn-secondary btn-lg dropdown-toggle"
                          type="button"
                          // data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span>
                            {this.props.details && this.props.details.lecturers}
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="">
                      <h2 className="text-muted">Setting</h2>
                      <hr />
                      <div className="row">
                        <div className="col-md-6">
                          <p className="text">
                            <span
                              className="text-bold"
                              style={{ color: "red" }}
                            >{`${this.props.details &&
                              this.props.details.settings[0]
                                .numberOfLectures} Lecturer(s) per ${this.props
                              .details &&
                              this.props.details.settings[0]
                                .numberOfStudents} Student(s)`}</span>
                          </p>
                        </div>
                        <div className="col-md-6 ">
                          <a
                            href="/settings"
                            style={{ float: "right" }}
                            className="btn btn-primary ml-auto"
                          >
                            Edit
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-xs-12 gutter">
                    <div className="sales report">
                      <h2>Number of Courses</h2>
                      <div className="btn-group">
                        <button
                          className="btn btn-secondary btn-lg dropdown-toggle"
                          type="button"
                          // data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span>
                            {this.props.details && this.props.details.courses}
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <h2 className="text-muted">Schedule Now</h2>
                        <hr />
                        <div className="row">
                          <div className="col-md-4" />
                          <div className="col-md-4">
                            <button
                              onClick={this.props.schedule}
                              className="btn btn-primary ml-auto mr-auto"
                            >
                              Schedul Now
                            </button>
                          </div>
                          <div className="col-md-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-2" />
                  <div className="col-md-8">
                    <ScheduleTabel schedule={this.props.schedules} />
                  </div>
                  <div className="col-md-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  details: state.scheduler.details,
  schedules: state.scheduler.schedule
});

export default connect(
  mapStateToProps,
  { getDetails, schedule }
)(Scheduler);
