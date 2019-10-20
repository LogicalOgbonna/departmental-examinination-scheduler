import React from "react";
import { connect } from "react-redux";
import { Header, Footer, SideBar } from "../../components";
import {
  getDetails,
  // schedule,
  select,
  addToTemp,
  displayTimeTable,
  onChange
} from "../../actions/scheduler";
import { getLecturers } from "../../actions/lecturer";
import { getCourses } from "../../actions/courses";
import { getHalls } from "../../actions/halls";
import MaterialTable from "material-table";
class Scheduler extends React.Component {
  state = {
    tempTable: [],
    date: "",
    lecturers: [],
    halls: [],
    courses: [],
    errors: {},
    oldData: {
      lecturers: [],
      halls: [],
      courses: []
    },
    session: ""
  };
  componentDidMount() {
    this.props.getDetails();
    // this.props.schedule();
    this.props.getHalls();
    this.props.getLecturers();
    this.props.getCourses();

    this.setState({
      oldData: {
        lecturers: this.props.lecturers,
        halls: this.props.halls,
        courses: this.props.courses
      }
    });
  }

  select(data, type) {
    const { oldData, lecturers, halls, courses, date } = this.state;
    if (type === "lecturers") {
      let oldLecturers = lecturers;
      if (!data.length) {
        oldLecturers.pop();
      } else {
        oldLecturers.push(data[0]);
      }
      this.setState({ lecturers: oldLecturers });
    }

    if (type === "courses") {
      let oldCourses = courses;
      let newCourses = oldData.courses.filter(
        (lecturer, i) => lecturer._id !== data[0]._id
      );
      oldCourses.push(data[0]);
      this.setState({
        oldData: {
          ...this.state.oldData,
          courses: newCourses
        },
        courses: oldCourses
      });
    }
    if (type === "halls") {
      let oldHalls = halls;
      if (!data.length) {
        oldHalls.pop();
      } else {
        oldHalls.push(data[0]);
      }
      this.setState({ halls: oldHalls });
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  validate = data => {
    const errors = {};
    if (!data.lecturers.length) {
      errors.lecturers = "Select at least one lecturer";
    }
    if (!data.courses.length) {
      errors.courses = "Select at least one course";
    }
    if (!data.halls.length) {
      errors.halls = "Select at least one hall";
    }
    if (!data.date.length) {
      errors.date = "Set a data";
    }
    return errors;
  };
  addToTemp = () => {
    const errors = this.validate(this.state);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      // alert("success");
      const { lecturers, halls, courses, date } = this.state;
      let tempTable = this.state.tempTable;
      tempTable.push({
        halls: halls,
        lecturers: lecturers,
        date: date,
        courses: courses
      });
      this.setState({
        tempTable,
        date: "",
        lecturers: [],
        halls: [],
        courses: [],
        errors: {}
      });
    }
  };
  onSubmit = () => {
    const errors = {};
    const { tempTable, session } = this.state;
    if (!tempTable.length) {
      return alert("Please Use The Add Button");
    }
    if (!session.length) {
      errors.session = "Please Input a Session";
      this.setState({ errors });
      return;
    }
    this.props.displayTimeTable(tempTable, session);
  };
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
                  </div>

                  <div className="col-md-6 col-sm-6 col-xs-12 gutter">
                    <div className="sales">
                      <h2>Number of Halls</h2>

                      <div className="btn-group">
                        <button
                          className="btn btn-secondary btn-lg dropdown-toggle"
                          type="button"
                          // data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span>
                            {this.props.halls && this.props.halls.length}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  <div style={{ marginTop: 50 }} className="col-md-6">
                    {" "}
                    <MaterialTable
                      title="Lecturers Table"
                      columns={[
                        { title: "Name", field: "name" },
                        { title: "Email", field: "email" }
                      ]}
                      data={this.state.oldData.lecturers}
                      options={{
                        selection: true
                      }}
                      onSelectionChange={rows => {
                        this.select(rows, "lecturers");
                      }}
                      detailPanel={rowData => {
                        return (
                          <div style={{ margin: 20 }} className="row">
                            <div className="col-md-1"></div>
                            <div className="col-md-10">
                              <MaterialTable
                                title="Lecture's Courses"
                                columns={[
                                  { title: " Title", field: "title" },
                                  { title: " Code", field: "code" },
                                  {
                                    title: "Capacity",
                                    field: "numberOfStudents",
                                    type: "numeric"
                                  }
                                ]}
                                data={rowData.courses}
                              />
                            </div>
                            <div className="col-md-1"></div>
                          </div>
                        );
                      }}
                    />
                    <span className="text-danger text-center">
                      {this.state.errors.lecturers}
                    </span>
                  </div>
                  <div style={{ marginTop: 50 }} className="col-md-6">
                    <MaterialTable
                      title="Courses Table"
                      columns={[
                        { title: "Course Title", field: "title" },
                        { title: "Course Code", field: "code" },
                        {
                          title: "Capacity",
                          field: "numberOfStudents",
                          type: "numeric"
                        }
                      ]}
                      data={this.state.oldData.courses}
                      options={{
                        selection: true
                      }}
                      onSelectionChange={rows => {
                        this.select(rows, "courses");
                      }}
                    />
                    <span className="text-danger text-center">
                      {this.state.errors.courses}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div style={{ marginTop: 50 }} className="col-md-6">
                    <MaterialTable
                      title="Halls Table"
                      columns={[
                        { title: "Name", field: "name" },
                        { title: "Capacity", field: "numberOfStudents" }
                      ]}
                      data={this.state.oldData.halls}
                      options={{
                        selection: true
                      }}
                      onSelectionChange={rows => {
                        this.select(rows, "halls");
                      }}
                    />
                    <span className="text-danger text-center">
                      {this.state.errors.halls}
                    </span>
                  </div>
                  <div style={{ marginTop: 50 }} className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="date">Choose a Date:</label>
                      <input
                        className="form-control"
                        type="datetime-local"
                        name="date"
                        id="date"
                        value={this.state.date}
                        onChange={this.onChange}
                      />
                      <span className="text-danger text-center">
                        {this.state.errors.date}
                      </span>
                    </div>
                    <div className="form-group">
                      <button
                        onClick={this.addToTemp}
                        className="btn btn-primary pull-right"
                      >
                        <i className="fa fa-plus"></i>
                        {/* Add */}
                      </button>
                    </div>

                    <div className="form-group">
                      <label htmlFor="session">Session:</label>
                      <input
                        className="form-control"
                        type="text"
                        name="session"
                        id="session"
                        placeholder="2015/2016"
                        value={this.state.session}
                        onChange={this.onChange}
                      />
                      <span className="text-danger text-center">
                        {this.state.errors.session}
                      </span>
                    </div>

                    <div
                      // style={{ marginTop: "50%" }}
                      onClick={this.onSubmit}
                      className=" form-group mt-5"
                    >
                      <button className="btn btn-primary col-md-12">
                        Schedule Now
                      </button>
                    </div>
                  </div>
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
  scheduler: state.scheduler,
  halls: state.hall.halls,
  courses: state.course.courses,
  lecturers: state.lecturer.lecturers
});

export default connect(
  mapStateToProps,
  {
    getDetails,
    // schedule,
    select,
    getLecturers,
    getCourses,
    getHalls,
    addToTemp,
    displayTimeTable,
    onChange
  }
)(Scheduler);
