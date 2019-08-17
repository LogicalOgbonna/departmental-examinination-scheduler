import axios from "axios";
import { GET_DETAILS, GET_SCHEDULE, SCHEDULER_ERROR } from "./types";

export const details = details => ({
  type: GET_DETAILS,
  payload: details
});

export const schedules = schedule => ({
  type: GET_SCHEDULE,
  payload: schedule
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

export const schedule = () => dispatch => {
  axios
    .post("/api/scheduler")
    .then(sched => {
      const uniqueInvigilators = [];
      const invigilators = sched.data.invigilators;
      for (let i = 0; i < invigilators.length; i++) {
        var invigilator = invigilators[i].lecturer
          .map(course => course)
          .filter((item, index) => {
            return invigilators[i].lecturer.indexOf(item) === index;
          });
        uniqueInvigilators.push({
          _id: invigilators[i]._id,
          invigilator,
          numOfLecToInvigilate: invigilators[i].numOfLecToInvigilate,
          numberOfStudents: invigilators[i].numberOfStudents,
          title: invigilators[i].title,
          code: invigilators[i].code
        });
      }
      const uniqueCourse = Array.from(
        new Set(invigilators.map(a => a.code))
      ).map(id => {
        return invigilators.find(a => a.code === id);
      });
      dispatch(schedules(uniqueCourse));
    })
    .catch(err => dispatch(errors(err)));
};
