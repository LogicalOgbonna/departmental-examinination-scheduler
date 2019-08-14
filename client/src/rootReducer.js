import { combineReducers } from "redux";
import course from "./reducers/course";
import lecturer from "./reducers/lecturer";
import scheduler from "./reducers/scheduler";
import setting from "./reducers/settings";
import user from "./reducers/auth";

export default combineReducers({
  course,
  lecturer,
  setting,
  scheduler,
  user
});
