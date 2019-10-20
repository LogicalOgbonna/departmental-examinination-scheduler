import { combineReducers } from "redux";
import course from "./reducers/course";
import lecturer from "./reducers/lecturer";
import scheduler from "./reducers/scheduler";
import setting from "./reducers/settings";
import user from "./reducers/auth";
import hall from "./reducers/halls";
import complaint from "./reducers/complaints";

export default combineReducers({
  course,
  lecturer,
  setting,
  scheduler,
  user,
  hall,
  complaint
});
