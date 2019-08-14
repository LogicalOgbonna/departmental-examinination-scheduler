import axios from "axios";
import {
  GET_COURSES,
  COURSES_ERROR,
  POST_COURSES,
  DELETE_COURSES,
  VIEW_COURSE
} from "./types";

export const allCourses = data => ({
  type: GET_COURSES,
  payload: data
});

export const createdCourse = data => ({
  type: POST_COURSES,
  payload: data
});

export const deletedCourse = data => ({
  type: DELETE_COURSES,
  payload: data
});

export const viewedCourse = data => ({
  type: VIEW_COURSE,
  payload: data
});

export const errors = data => ({
  type: COURSES_ERROR,
  payload: data
});

export const getCourses = () => dispatch => {
  axios
    .get("http://localhost:7000/api/courses")
    .then(courses => {
      dispatch(allCourses(courses.data));
    })
    .catch(err => dispatch(errors(err)));
};

export const postCourses = data => dispatch => {
  axios
    .post("/courses", data)
    .then(course => {
      console.log(course.data);
      dispatch(createdCourse(course.data));
    })
    .catch(err => dispatch(errors(err)));
};

export const deleteCourse = data => dispatch => {
  if (window.confirm("Are you sure you want to delete this course?")) {
    axios
      .delete(`/courses/${data}`)
      .then(course => {
        dispatch(deletedCourse(course.data));
      })
      .catch(err => dispatch(errors(err)));
  } else {
    alert("A thought you don't have sense");
  }
};

export const viewCourse = id => dispatch => {
  axios.get(`/courses/${id}`).then(course => {
    console.log(course.data);
    dispatch(viewedCourse(course.data));
  });
};

export const clear = () => dispatch => {
  setTimeout(() => {
    dispatch(createdCourse({}));
  }, 5000);
};
