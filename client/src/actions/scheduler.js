import axios from "axios";
import {
  GET_DETAILS,
  GET_SCHEDULE,
  SCHEDULER_ERROR,
  SELECT,
  ADD_TO_TEMP,
  TIME,
  DISPLAY_TABLE
} from "./types";
import history from "../utils/history";

export const details = details => ({
  type: GET_DETAILS,
  payload: details
});

export const errors = error => ({
  type: SCHEDULER_ERROR,
  payload: error
});

export const getDetails = () => dispatch => {
  axios
    .get("/api/scheduler")
    .then(detail => {
      dispatch(details(detail.data));
    })
    .catch(err => dispatch(errors(err)));
};

// export const schedule = () => dispatch => {
//   axios
//     .post("/api/scheduler")
//     .then(sched => {
//       const uniqueInvigilators = [];
//       const invigilators = sched.data.invigilators;
//       for (let i = 0; i < invigilators.length; i++) {
//         var invigilator = invigilators[i].lecturer
//           .map(course => course)
//           .filter((item, index) => {
//             return invigilators[i].lecturer.indexOf(item) === index;
//           });
//         uniqueInvigilators.push({
//           _id: invigilators[i]._id,
//           invigilator,
//           numOfLecToInvigilate: invigilators[i].numOfLecToInvigilate,
//           numberOfStudents: invigilators[i].numberOfStudents,
//           title: invigilators[i].title,
//           code: invigilators[i].code
//         });
//       }
//       const uniqueCourse = Array.from(
//         new Set(invigilators.map(a => a.code))
//       ).map(id => {
//         return invigilators.find(a => a.code === id);
//       });
//       dispatch(schedules(uniqueCourse));
//     })
//     .catch(err => dispatch(errors(err)));
// };

export const select = (data, type) => dispatch => {
  dispatch({
    type: SELECT,
    payload: { data, type }
  });
};

export const addToTemp = temp => dispatch => {
  console.log(temp);
};

export const onChange = e => dispatch => {
  dispatch({
    type: TIME,
    payload: e.target.value
  });
};

export const displayTimeTable = (tempTable, session) => dispatch => {
  if (window.confirm("Are You Sure You Want to Proceed?")) {
    dispatch({
      type: DISPLAY_TABLE,
      payload: { tempTable, session }
    });

    setTimeout(() => {
      history.push("/display_table");
    }, 1000);
  }
};

export const saveTable = (timeTable, session) => dispatch => {
  console.log(timeTable, session);
  axios
    .post("/api/scheduler", { timeTable, session })
    .then(sched => {
      console.log(sched);
      // dispatch({
      //   type: GET_SCHEDULE,
      //   payload: schedule
      // });
    })
    .catch(err => dispatch(errors(err)));
};
