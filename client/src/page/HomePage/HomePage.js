import React from "react";
import { connect } from "react-redux";

import { Header, Footer, SideBar } from "../../components";
import {
  getLecturers,
  viewLecturer,
  deleteLecturer,
  deleteLecturerCourse
} from "../../actions/lecturer";
import { CourseTable, LecturerTable } from "../../components/Table/Table";
import { getCourses, viewCourse, deleteCourse } from "../../actions/courses";
import { CourseModal, LecturerModal } from "../../components/Modal/Modal";
class HomePage extends React.Component {
  reload = () => {
    this.props.getLecturers();
  };
  componentDidMount() {
    this.props.getLecturers();
    this.props.getCourses();
  }
  render() {
    return (
      <div>
        <div className="container-fluid display-table">
          <div className="row display-table-row">
            <SideBar page="home" />
            <div className="col-md-10 col-sm-11 display-table-cell v-align">
              <Header />
              <div className="user-dashboard">
                <h1>Dashboard</h1>
                {this.props.user.admin && (
                  <div className="row">
                    <div className="col-md-5 col-sm-5 col-xs-12 gutter">
                      <div className="sales ">
                        <h2>Courses</h2>
                      </div>
                      <div style={{ marginTop: "2%" }} className="center">
                        <CourseTable
                          courses={this.props.courses}
                          viewCourse={this.props.viewCourse}
                          deleteCourse={this.props.deleteCourse}
                        />
                      </div>
                    </div>
                    <div className="col-md-7 col-sm-7 col-xs-12 gutter">
                      <div className="sales report">
                        <h2>Lecturers</h2>
                      </div>
                      <div style={{ marginTop: "2%" }} className="center">
                        <LecturerTable
                          deleteLecturerCourse={this.props.deleteLecturer}
                          viewLecturer={this.props.viewLecturer}
                          lecturers={this.props.lecturers}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {!this.props.user.admin && (
                  <div className="row">
                    <div className="col-md-5 col-sm-5 col-xs-12 gutter">
                      <div className="sales ">
                        <h2>Assigned Courses</h2>
                      </div>
                      <div style={{ marginTop: "2%" }} className="center">
                        {this.props.user.courses && (
                          <table className="table">
                            <thead className="thead-dark">
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Code</th>
                                <th scope="col">Capacity</th>
                                <th scope="col">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.props.user.courses.length > 0 ? (
                                this.props.user.courses.map((course, index) => (
                                  <tr key={course._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{course.title}</td>
                                    <td>{course.code}</td>
                                    <td>{course.numberOfStudents}</td>
                                    <td>
                                      <button
                                        onClick={() =>
                                          this.props.viewCourse(course._id)
                                        }
                                        style={{ margin: 3 }}
                                        className="m-3 btn btn-secondary btn-sm"
                                        data-toggle="modal"
                                        data-target="#course_modal"
                                      >
                                        View
                                      </button>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <th scope="row" />
                                  <td />
                                  <td />
                                  <td />
                                  <td />
                                </tr>
                              )}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                    <div className="col-md-7 col-sm-7 col-xs-12 gutter">
                      <div className="sales report">
                        <h2>Schedule</h2>
                      </div>
                      <div style={{ marginTop: "2%" }} className="center">
                        {/* <LecturerTable
                        deleteLecturerCourse={this.props.deleteLecturer}
                        viewLecturer={this.props.viewLecturer}
                        lecturers={this.props.lecturers}
                      /> */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <CourseModal course={this.props.singleCourse} />
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
  lecturers: state.lecturer.lecturers,
  singleLecturer: state.lecturer.singleLecturer,
  courses: state.course.courses,
  singleCourse: state.course.singleCourse,
  lecturersError: state.lecturer.lecturersError,
  coursesError: state.course.coursesError,
  user: state.user.user
});

export default connect(
  mapStateToProps,
  {
    getCourses,
    viewCourse,
    deleteCourse,
    getLecturers,
    viewLecturer,
    deleteLecturer,
    deleteLecturerCourse
  }
)(HomePage);
