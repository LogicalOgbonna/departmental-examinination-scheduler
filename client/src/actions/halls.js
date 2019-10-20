import axios from "axios";
import {
  GET_HALLS,
  HALLS_ERROR,
  POST_HALLS,
  DELETE_HALL,
  VIEW_HALL
} from "./types";

export const allHalls = data => ({
  type: GET_HALLS,
  payload: data
});

export const createdHall = data => ({
  type: POST_HALLS,
  payload: data
});

export const deletedHall = data => ({
  type: DELETE_HALL,
  payload: data
});

export const viewedHall = data => ({
  type: VIEW_HALL,
  payload: data
});

export const errors = data => ({
  type: HALLS_ERROR,
  payload: data
});

export const getHalls = () => dispatch => {
  axios
    .get("/api/halls")
    .then(halls => {
      dispatch(allHalls(halls.data));
    })
    .catch(err => dispatch(errors(err)));
};

export const postHalls = data => dispatch => {
  axios
    .post("/api/halls", data)
    .then(hall => {
      dispatch(createdHall(hall.data));
    })
    .catch(err => dispatch(errors(err)));
};

export const deleteHall = data => dispatch => {
  if (window.confirm("Are you sure you want to delete this Hall?")) {
    axios
      .delete(`/api/halls/${data}`)
      .then(hall => {
        dispatch(deletedHall(hall.data));
      })
      .catch(err => dispatch(errors(err)));
  } else {
    alert("A thought you don't have sense");
  }
};

export const viewHall = id => dispatch => {
  axios.get(`/api/halls/${id}`).then(hall => {
    dispatch(viewedHall(hall.data));
  });
};

export const clear = () => dispatch => {
  setTimeout(() => {
    dispatch(createdHall({}));
  }, 5000);
};
