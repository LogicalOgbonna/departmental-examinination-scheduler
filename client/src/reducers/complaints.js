import {
  GET_COMPLAINTS,
  POST_COMPLAINTS,
  DELETE_COMPLAINT,
  COMPLAINTS_ERROR,
  REPLY_COMPLAINT
} from "../actions/types";

const Halls = (state = {}, action = {}) => {
  switch (action.type) {
    case GET_COMPLAINTS:
      return {
        ...state,
        complaints: action.payload
      };
    case POST_COMPLAINTS:
      return {
        ...state,
        createdComplaint: action.payload
      };
    case DELETE_COMPLAINT:
      return {
        ...state,
        complaints: state.complaints.filter(
          hall => hall._id !== action.payload._id
        )
      };
    case REPLY_COMPLAINT:
      let complain = state.complaints.filter(
        com => com._id !== action.payload._id
      );
      complain.push(action.payload);
      return {
        ...state,
        complaints: complain
      };
    // case VIEW_HALL:
    //   return {
    //     ...state,
    //     singleHall: action.payload
    //   };
    case COMPLAINTS_ERROR:
      return {
        ...state,
        hallsError: action.payload
      };
    default:
      return state;
  }
};

export default Halls;
