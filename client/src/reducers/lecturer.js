import {
  GET_LECTURER,
  LECTURER_ERROR,
  POST_LECTURER,
  DELETE_LECTURER,
  VIEW_LECTURER,
  DELETE_LECTURER_COURSE
} from "../actions/types";

const Lecturer = (state = {}, action = {}) => {
  switch (action.type) {
    case GET_LECTURER:
      return {
        ...state,
        lecturers: action.payload
      };
    case POST_LECTURER:
      return {
        ...state,
        createdLecturer: action.payload
      };
    case DELETE_LECTURER:
      return {
        ...state,
        lecturers: state.lecturers.filter(
          lecturer => lecturer._id !== action.payload._id
        )
      };
    case VIEW_LECTURER:
      return {
        ...state,
        singleLecturer: action.payload
      };
    case DELETE_LECTURER_COURSE:
      return {
        ...state,
        singleLecturer: action.payload
      };
    case LECTURER_ERROR:
      return {
        ...state,
        lecturersError: action.payload
      };
    default:
      return state;
  }
};

export default Lecturer;
