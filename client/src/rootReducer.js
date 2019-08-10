import { combineReducers } from "redux";
import course from "./reducers/course";
import lecturer from "./reducers/lecturer";

export default combineReducers({
  course,
  lecturer
});
