import axios from "axios";
import {
  LECTURER_ERROR,
  GET_LECTURER,
  POST_LECTURER,
  DELETE_LECTURER,
  VIEW_LECTURER,
  DELETE_LECTURER_COURSE
} from "./types";

export const allLecturers = lecturers => ({
  type: GET_LECTURER,
  payload: lecturers
});

export const createdLecturer = lecturer => ({
  type: POST_LECTURER,
  payload: lecturer
});

export const deletedLecturer = lecturer => ({
  type: DELETE_LECTURER,
  payload: lecturer
});

export const viewedLecturer = lecturer => ({
  type: VIEW_LECTURER,
  payload: lecturer
});

export const deletedLecturerCourse = lecturer => ({
  type: DELETE_LECTURER_COURSE,
  payload: lecturer
});

export const errors = errors => ({
  type: LECTURER_ERROR,
  payload: errors
});

export const getLecturers = () => dispatch => {
  axios
    .get("/api/lecturers")
    .then(lecturers => {
      dispatch(allLecturers(lecturers.data));
    })
    .catch(err => dispatch(errors(err.response)));
};

export const postLecturers = data => dispatch => {
  console.log(data);
  axios
    .post("/api/lecturers", data)
    .then(lecturer => {
      console.log(lecturer.data);
      dispatch(createdLecturer(lecturer.data));
    })
    .catch(err => dispatch(errors(err.response)));
};

export const deleteLecturer = data => dispatch => {
  if (window.confirm("Are you sure you want to delete this lecturer?")) {
    axios
      .delete(`/api/lecturers/${data}`)
      .then(lecturer => {
        console.log(lecturer.data);
        dispatch(deletedLecturer(lecturer.data));
      })
      .catch(err => dispatch(errors(err)));
  } else {
    alert("As i thought, you have sense");
  }
};

export const viewLecturer = id => dispatch => {
  axios.get(`/api/lecturers/${id}`).then(lecturer => {
    dispatch(viewedLecturer(lecturer.data));
  });
};

export const deleteLecturerCourse = (lec_id, cos_id) => dispatch => {
  // const data = {
  //   lec_id,
  //   cos_id
  // }
  console.log(cos_id);
  axios.post("/api/lecturers/deleteCourse", { lec_id, cos_id }).then(res => {
    dispatch(deletedLecturerCourse(res.data));
  });
};

export const clear = () => dispatch => {
  setTimeout(() => {
    dispatch(createdLecturer({}));
  }, 5000);
};
