import React from "react";
import { connect } from "react-redux";
import { Header, Footer, SideBar } from "../../components";
import { getCourses } from "../../actions/courses";
import {
  getLecturers,
  postLecturers,
  clear,
  viewLecturer,
  deleteLecturer,
  deleteLecturerCourse
} from "../../actions/lecturer";
import { LecturerTable } from "../../components/Table/Table";
import { LecturerModal } from "../../components/Modal/Modal";

class Lecturer extends React.Component {
  state = {
    name: "",
    code: "",
    email: "",
    password: "",
    confirm_password: "",
    error: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentDidMount() {
    this.props.getCourses();
    this.props.getLecturers();
  }
  componentWillReceiveProps(next) {
    if (next.createdLecturer && Object.keys(next.createdLecturer).length > 0) {
      this.props.clear();
      this.props.getLecturers();
      this.setState({
        name: "",
        code: "",
        email: "",
        password: "",
        confirm_password: ""
      });
    }
  }

  validate = data => {
    const error = {};
    if (!data.name) error.name = "Can't be blank";
    if (!data.code) error.code = "Can't be blank";
    if (!data.email) error.email = "Can't be blank";
    if (!data.password) error.password = "Can't be blank";
    if (!data.confirm_password) error.confirm_password = "Can't be blank";
    if (data.password !== data.confirm_password)
      error.password = "Password Does Not Match";
    return error;
  };

  onSubmit = e => {
    e.preventDefault();
    const error = this.validate(this.state);
    this.setState({ error });
    if (Object.keys(error).length === 0) {
      this.props.postLecturers(this.state);
    }
  };
  reload = () => {
    this.props.getLecturers();
  };
  render() {
    return (
      <div>
        <div className="container-fluid display-table">
          <div className="row display-table-row">
            <SideBar page="lecturers" />
            <div className="col-md-10 col-sm-11 display-table-cell v-align">
              <Header />
              <div className="user-dashboard">
                <h1>Lecturers</h1>
                <div className="row">
                  <div className="col-md-4">
                    {this.props.createdLecturer &&
                      Object.keys(this.props.createdLecturer).length > 0 && (
                        <div className="form-group">
                          <h3 className="text-success text-center">
                            Lecturer Added Sucessfully
                          </h3>
                        </div>
                      )}
                    <form onSubmit={this.onSubmit} className="form-group">
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          id="name"
                          aria-describedby="nameHelp"
                          placeholder="Enter Full Name"
                          onChange={this.onChange}
                          required
                        />
                        {this.state.error && (
                          <small
                            id="nameHelp"
                            className="form-text text-danger"
                          >
                            {this.state.error.name}
                          </small>
                        )}
                      </div>

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
                          required
                        />
                        {this.state.error && (
                          <small
                            id="emailHelp"
                            className="form-text text-danger"
                          >
                            {this.state.error.email}
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
                          required
                        />
                        {this.state.error && (
                          <small
                            id="emailHelp"
                            className="form-text text-danger"
                          >
                            {this.state.error.password}
                          </small>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="confirm_password">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          name="confirm_password"
                          className="form-control"
                          id="confirm_password"
                          placeholder="Retype Password"
                          onChange={this.onChange}
                          required
                        />
                        {this.state.error && (
                          <small
                            id="emailHelp"
                            className="form-text text-danger"
                          >
                            {this.state.error.confirm_password}
                          </small>
                        )}
                      </div>

                      {this.props.courses.length > 0 && (
                        <div className="form-group">
                          <label htmlFor="code">Select Course:</label>
                          <select
                            name="code"
                            className="form-control"
                            id="code"
                            onChange={this.onChange}
                            required
                          >
                            <option value="">Select...</option>
                            {this.props.courses.map(course => (
                              <option key={course._id} value={course.code}>
                                {course.code}
                              </option>
                            ))}
                          </select>
                          {this.state.error && (
                            <small
                              id="emailHelp"
                              className="form-text text-danger"
                            >
                              {this.state.error.code}
                            </small>
                          )}
                        </div>
                      )}

                      <div className="form-group">
                        <button
                          type="button"
                          className="btn btn-secondary mr-auto"
                          onClick={this.onSubmit}
                        >
                          Add Lecturer
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-8">
                    <LecturerTable
                      lecturers={this.props.lecturers}
                      viewLecturer={this.props.viewLecturer}
                      deleteLecturer={this.props.deleteLecturer}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <LecturerModal
          lecturer={this.props.singleLecturer}
          deleteLecturerCourse={this.props.deleteLecturerCourse}
          reload={this.reload}
        />
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  courses: state.course.courses,
  createdLecturer: state.lecturer.createdLecturer,
  lecturers: state.lecturer.lecturers,
  singleLecturer: state.lecturer.singleLecturer
});

export default connect(
  mapStateToProps,
  {
    getCourses,
    getLecturers,
    postLecturers,
    clear,
    viewLecturer,
    deleteLecturer,
    deleteLecturerCourse
  }
)(Lecturer);
