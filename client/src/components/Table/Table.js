import React from "react";

export const CourseTable = props => {
  return (
    <React.Fragment>
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
          {props.courses && props.courses.length > 0 ? (
            props.courses.map((course, index) => (
              <tr key={course._id}>
                <th scope="row">{index + 1}</th>
                <td>{course.title}</td>
                <td>{course.code}</td>
                <td>{course.numberOfStudents}</td>
                <td>
                  <button
                    onClick={() => props.viewCourse(course._id)}
                    style={{ margin: 3 }}
                    className="m-3 btn btn-secondary btn-sm"
                    data-toggle="modal"
                    data-target="#course_modal"
                  >
                    View
                  </button>
                  <button
                    onClick={() => props.deleteCourse(course._id)}
                    style={{ margin: 3 }}
                    className="m-3 btn btn-danger btn-sm"
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
              <td />
            </tr>
          )}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export const LecturerTable = props => {
  return (
    <table className="table">
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Courses</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {props.lecturers && props.lecturers.length > 0 ? (
          props.lecturers.map((lecturer, index) => (
            <tr key={lecturer._id}>
              <th scope="row">{index + 1}</th>
              <td>{lecturer.name}</td>
              <td>
                {lecturer.courses.map(course => (
                  <p key={course._id} className="text-muted">
                    {course.code}
                  </p>
                ))}
              </td>
              <td>
                <button
                  className="m-3 btn btn-secondary btn-sm"
                  onClick={() => props.viewLecturer(lecturer._id)}
                  data-toggle="modal"
                  data-target="#lecturer_modal"
                >
                  View
                </button>
                <button
                  style={{ marginLeft: 3 }}
                  className="m-3 btn btn-danger btn-sm"
                  onClick={() => props.deleteLecturer(lecturer._id)}
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
  );
};
