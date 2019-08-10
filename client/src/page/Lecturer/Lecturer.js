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
    if (Object.keys(next.createdLecturer).length > 0) {
      this.props.clear();
      this.props.getLecturers();
    }
  }

  validate = data => {
    const error = {};
    if (!data.name) error.name = "Can't be blank";
    if (!data.code) error.code = "Can't be blank";

    return error;
  };

  onSubmit = e => {
    e.preventDefault();
    const error = this.validate(this.state);
    this.setState({ error });
    if (Object.keys(error).length === 0) {
      this.props.postLecturers(this.state);
      console.log(this.state);
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
                    {Object.keys(this.props.createdLecturer).length > 0 && (
                      <div className="form-group">
                        <h3 className="text-success text-center">
                          Lecturer Added Sucessfully
                        </h3>
                      </div>
                    )}
                    <form onSubmit={this.onSubmit} className="form-group">
                      <div className="form-group">
                        <label htmlFor="name">Lecturer Name:</label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="form-control"
                          onChange={this.onChange}
                        />
                      </div>

                      {this.props.courses.length > 0 && (
                        <div className="form-group">
                          <label htmlFor="code">Select Course:</label>
                          <select
                            name="code"
                            className="form-control"
                            id="code"
                            onChange={this.onChange}
                          >
                            <option value="">Select...</option>
                            {this.props.courses.map(course => (
                              <option key={course._id} value={course.code}>
                                {course.code}
                              </option>
                            ))}
                          </select>
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
