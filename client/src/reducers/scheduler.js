import {
  GET_SCHEDULE,
  GET_DETAILS,
  SCHEDULER_ERROR,
  SELECT,
  TIME,
  DISPLAY_TABLE
} from "../actions/types";

const initialState = {
  timeTable: [],
  time: "",
  tempTable: [],
  emptyErrors: {},
  session: ""
};
const scheduler = (state = initialState, action = {}) => {
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
    case SELECT:
      state.tempTable[action.payload.type] = action.payload.data;
      return {
        ...state,
        state
      };
    case TIME:
      return {
        ...state,
        time: action.payload
      };
    case DISPLAY_TABLE:
      return {
        ...state,
        timeTable: action.payload.tempTable,
        session: action.payload.session
      };
    default:
      return state;
  }
};

export default scheduler;
