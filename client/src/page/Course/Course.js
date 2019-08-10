import React from "react";
import { connect } from "react-redux";

import { Header, Footer, SideBar } from "../../components";
import {
  postCourses,
  clear,
  viewCourse,
  deleteCourse,
  getCourses
} from "../../actions/courses";
import { CourseTable } from "../../components/Table/Table";
import { CourseModal } from "../../components/Modal/Modal";

class Course extends React.Component {
  state = {
    title: "",
    code: "",
    number: "",
    errors: {},
    loading: false
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  validate = data => {
    console.log(data);
    const errors = {};
    if (data.title.length < 5)
      errors.title = "Courses Title should be greater than 5";
    if (!data.title) errors.title = "Can't be blank";
    if (!data.code) errors.code = "Can't be blank";
    if (!data.number) errors.number = "Can't be blank";

    return errors;
  };
  onSubmit = e => {
    const errors = this.validate(this.state);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.postCourses(this.state);
      this.setState({ loading: true });
    } else {
      console.log("submit");
    }
    e.preventDefault();
  };

  componentDidMount() {
    this.props.getCourses();
  }
  componentWillReceiveProps(next) {
    // if()
    if (Object.keys(next.createdCourse).length > 0) {
      this.props.clear();
      this.props.getCourses();
    }
  }

  render() {
    return (
      <div>
        <div className="container-fluid display-table">
          <div className="row display-table-row">
            <SideBar page="courses" />
            <div className="col-md-10 col-sm-11 display-table-cell v-align">
              <Header />
              <div className="user-dashboard">
                <h1>Courses</h1>
                <div className="row">
                  <div className="col-md-5">
                    {Object.keys(this.props.createdCourse).length > 0 && (
                      <div className="form-group">
                        <h3 className="text-success text-center">
                          Course Added Sucessfully
                        </h3>
                      </div>
                    )}
                    <form onSubmit={this.onSubmit} className="form-group">
                      <div className="form-group">
                        <label htmlFor="title">Course Title:</label>
                        <input
                          className="form-control"
                          type="text"
                          name="title"
                          id="title"
                          onChange={this.onChange}
                        />
                        {this.state.errors.title && (
                          <span style={{ color: "red" }}>
                            {this.state.errors.title}
                          </span>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="code">Course Code:</label>
                        <input
                          className="form-control"
                          type="text"
                          name="code"
                          id="code"
                          onChange={this.onChange}
                        />
                        {this.state.errors.code && (
                          <span style={{ color: "red" }}>
                            {this.state.errors.code}
                          </span>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="number">Number of Students:</label>
                        <input
                          className="form-control"
                          type="number"
                          name="number"
                          id="number"
                          onChange={this.onChange}
                        />
                        {this.state.errors.number && (
                          <span style={{ color: "red" }}>
                            {this.state.errors.number}
                          </span>
                        )}
                      </div>

                      <div className="form-group">
                        <button
                          type="button"
                          className="btn btn-secondary mr-auto"
                          onClick={this.onSubmit}
                        >
                          Add Course
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-7">
                    <CourseTable
                      courses={this.props.courses}
                      viewCourse={this.props.viewCourse}
                      deleteCourse={this.props.deleteCourse}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CourseModal course={this.props.singleCourse} />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  createdCourse: state.course.createdCourse,
  courses: state.course.courses,
  singleCourse: state.course.singleCourse
});

export default connect(
  mapStateToProps,
  { postCourses, clear, viewCourse, deleteCourse, getCourses }
)(Course);
