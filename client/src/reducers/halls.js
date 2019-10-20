import {
  GET_HALLS,
  HALLS_ERROR,
  POST_HALLS,
  DELETE_HALL,
  VIEW_HALL
} from "../actions/types";

const Halls = (state = {}, action = {}) => {
  switch (action.type) {
    case GET_HALLS:
      return {
        ...state,
        halls: action.payload
      };
    case POST_HALLS:
      return {
        ...state,
        createdHall: action.payload
      };
    case DELETE_HALL:
      return {
        ...state,
        halls: state.halls.filter(hall => hall._id !== action.payload._id)
      };
    case VIEW_HALL:
      return {
        ...state,
        singleHall: action.payload
      };
    case HALLS_ERROR:
      return {
        ...state,
        hallsError: action.payload
      };
    default:
      return state;
  }
};

export default Halls;
