import React from "react";

export const CourseModal = props => {
  return (
    <div id="course_modal" className="modal fade" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          {props.course && Object.keys(props.course).length > 0 && (
            <React.Fragment>
              <div className="modal-header login-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">{props.course.title}</h4>
              </div>

              <div className="modal-body">
                <form
                  // onSubmit={this.onSubmit}
                  className="form-group"
                >
                  <div className="form-group">
                    <label htmlFor="title">Course Title:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="title"
                      id="title"
                      defaultValue={props.course.title}
                      // onChange={this.onChange}
                    />
                    {/* {this.state.errors.title && (
                              <span style={{ color: "red" }}>
                                {this.state.errors.title}
                              </span>
                            )} */}
                  </div>

                  <div className="form-group">
                    <label htmlFor="code">Course Code:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="code"
                      id="code"
                      defaultValue={props.course.code}
                      // onChange={this.onChange}
                    />
                    {/* {this.state.errors.code && (
                              <span style={{ color: "red" }}>
                                {this.state.errors.code}
                              </span>
                            )} */}
                  </div>

                  <div className="form-group">
                    <label htmlFor="number">Number of Students:</label>
                    <input
                      className="form-control"
                      type="number"
                      name="number"
                      id="number"
                      value={props.course.numberOfStudents}
                      // onChange={this.onChange}
                    />
                    {/* {this.state.errors.number && (
                              <span style={{ color: "red" }}>
                                {this.state.errors.number}
                              </span>
                            )} */}
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  style={{ margin: 3 }}
                  type="button"
                  className="cancel"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  // onClick={this.onSubmit}
                  type="button"
                  className="ml-2 add-project"
                  data-dismiss="modal"
                >
                  Update
                </button>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export const HallModal = props => {

  return (
    <div id="hall_modal" className="modal fade" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          {props.hall && Object.keys(props.hall).length > 0 && (
            <React.Fragment>
              <div className="modal-header login-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">{props.hall.name}</h4>
              </div>

              <div className="modal-body">
                <form
                  // onSubmit={this.onSubmit}
                  className="form-group"
                >
                  <div className="form-group">
                    <label htmlFor="name">Hall Name:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      id="name"
                      defaultValue={props.hall.name}
                      // onChange={this.onChange}
                    />
                    {/* {this.state.errors.title && (
                              <span style={{ color: "red" }}>
                                {this.state.errors.title}
                              </span>
                            )} */}
                  </div>

                  <div className="form-group">
                    <label htmlFor="number">Number of Students:</label>
                    <input
                      className="form-control"
                      type="number"
                      name="number"
                      id="number"
                      value={props.hall.numberOfStudents}
                      // onChange={this.onChange}
                    />
                    {/* {this.state.errors.number && (
                              <span style={{ color: "red" }}>
                                {this.state.errors.number}
                              </span>
                            )} */}
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  style={{ margin: 3 }}
                  type="button"
                  className="cancel"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  // onClick={this.onSubmit}
                  type="button"
                  className="ml-2 add-project"
                  data-dismiss="modal"
                >
                  Update
                </button>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};
export const LecturerModal = props => {
  return (
    <div id="lecturer_modal" className="modal fade" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          {props.lecturer && Object.keys(props.lecturer).length && (
            <React.Fragment>
              <div className="modal-header login-header">
                <button
                  onClick={() => props.reload()}
                  type="button"
                  className="close"
                  data-dismiss="modal"
                >
                  &times;
                </button>
                <h4 className="modal-title">{props.lecturer.name}</h4>
              </div>
              <div className="modal-body">
                <table className="table">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Code</th>
                      <th scope="col">Tite</th>
                      <th scope="col">Capacity</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.lecturer &&
                    Object.keys(props.lecturer).length > 0 ? (
                      props.lecturer.courses.map((course, index) => (
                        <tr key={course._id}>
                          <th scope="row">{index + 1}</th>
                          <td>{course.code}</td>
                          <td>{course.title}</td>
                          <td>{course.numberOfStudents}</td>
                          <td>
                            <button
                              style={{ marginLeft: 3 }}
                              className="m-3 btn btn-danger btn-sm"
                              onClick={() =>
                                props.deleteLecturerCourse(
                                  props.lecturer._id,
                                  course.code
                                )
                              }
                            >
                              Delete
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
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  style={{ margin: 3 }}
                  type="button"
                  className="cancel"
                  data-dismiss="modal"
                  onClick={() => props.reload()}
                >
                  Close
                </button>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};
