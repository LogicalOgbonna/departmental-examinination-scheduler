import {
  GET_COURSES,
  COURSES_ERROR,
  POST_COURSES,
  DELETE_COURSES,
  VIEW_COURSE
} from "../actions/types";

const Courses = (state = {}, action = {}) => {
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload
      };
    case POST_COURSES:
      return {
        ...state,
        createdCourse: action.payload
      };
    case DELETE_COURSES:
      return {
        ...state,
        courses: state.courses.filter(
          course => course._id !== action.payload._id
        )
      };
    case VIEW_COURSE:
      return {
        ...state,
        singleCourse: action.payload
      };
    case COURSES_ERROR:
      return {
        ...state,
        coursesError: action.payload
      };
    default:
      return state;
  }
};

export default Courses;
