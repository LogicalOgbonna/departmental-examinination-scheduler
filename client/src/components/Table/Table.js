import React from "react";
import "./Table.css";
import Moment from "react-moment";

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

export const HallTable = props => {
  return (
    <React.Fragment>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Capacity</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {props.halls && props.halls.length > 0 ? (
            props.halls.map((hall, index) => (
              <tr key={hall._id}>
                <th scope="row">{index + 1}</th>
                <td>{hall.name}</td>
                <td>{hall.numberOfStudents}</td>
                <td>
                  <button
                    onClick={() => props.viewHall(hall._id)}
                    style={{ margin: 3 }}
                    className="m-3 btn btn-secondary btn-sm"
                    data-toggle="modal"
                    data-target="#hall_modal"
                  >
                    View
                  </button>
                  <button
                    onClick={() => props.deleteHall(hall._id)}
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

export const ScheduleTabel = props => {
  console.log(props.schedule);
  if (props.schedule && props.schedule.length) {
    return (
      <div style={{ marginTop: 20 }} className="mt-5 mb-5">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Code</th>
              <th scope="col">Title</th>
              <th scope="col">Lecturers</th>
              <th scope="col">No. of Students</th>
              <th scope="col">Hall Name</th>
              <th scope="col">Hall Capacity</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {props.schedule && props.schedule.length > 0 ? (
              props.schedule.map((schedule, index) => (
                <tr key={schedule._id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {schedule.courses.map(course => (
                      <p key={course._id} className="text-muted">
                        {course.code}
                      </p>
                    ))}
                  </td>
                  <td>
                    {schedule.courses.map(course => (
                      <p key={course._id} className="text-muted">
                        {course.title}
                      </p>
                    ))}
                  </td>
                  <td>
                    {schedule.lecturers.map((lecturer, index) => (
                      <p key={index} className="text-muted">
                        <span className="font-style-bold">{index + 1}:</span>{" "}
                        {lecturer.name}
                      </p>
                    ))}
                  </td>
                  <td>
                    {schedule.courses.map(course => (
                      <p key={course._id} className="text-muted">
                        {course.numberOfStudents}
                      </p>
                    ))}
                  </td>
                  <td>
                    {schedule.halls.map(hall => (
                      <p key={hall._id} className="text-muted">
                        {hall.name}
                      </p>
                    ))}
                  </td>
                  <td>
                    {schedule.halls.map(hall => (
                      <p key={hall._id} className="text-muted">
                        {hall.numberOfStudents}
                      </p>
                    ))}
                  </td>
                  {/* <td>{schedule.date.split("T")[0]}</td> */}
                  <td>
                    <Moment date={schedule.date} />
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
        <div className="row">
          <div className="col-md-4">
            <button className="btn btn-primary " onClick={props.onSave}>
              Save
            </button>
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-4" onClick={props.onPrint}>
            <button className="btn btn-primary pull-right">Print</button>
          </div>
          <div className="col-md-12">
            <h4
              className="text-center m-5"
              style={{ color: "red", fontStyle: "italic" }}
            >
              By saving, You Make the Time Table Visible to Lecturers
            </h4>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Hey</div>;
  }
};
