import { GET_SCHEDULE, GET_DETAILS, SCHEDULER_ERROR } from "../actions/types";

const scheduler = (state = {}, action = {}) => {
  switch (action.type) {
    case GET_SCHEDULE:
      return {
        ...state,
        schedule: action.payload
      };
    case GET_DETAILS:
      return {
        ...state,
        details: action.payload
      };
    case SCHEDULER_ERROR:
      return {
        ...state,
        schedulerError: action.payload
      };
    default:
      return state;
  }
};

export default scheduler;
