import axios from "axios";
import {
  GET_COMPLAINTS,
  POST_COMPLAINTS,
  DELETE_COMPLAINT,
  COMPLAINTS_ERROR,
  REPLY_COMPLAINT
} from "./types";

export const allComplaints = data => ({
  type: GET_COMPLAINTS,
  payload: data
});

export const createdComplaint = data => ({
  type: POST_COMPLAINTS,
  payload: data
});

export const deletedComplaint = data => ({
  type: DELETE_COMPLAINT,
  payload: data
});

export const repliedComplaint = data => ({
  type: REPLY_COMPLAINT,
  payload: data
});

// export const viewedCOMPLAINT = data => ({
//   type: VIEW_COMPLAINT,
//   payload: data
// });

export const errors = data => ({
  type: COMPLAINTS_ERROR,
  payload: data
});

export const getComplaints = () => dispatch => {
  axios
    .get("/api/complaints")
    .then(complaints => {
      dispatch(allComplaints(complaints.data));
    })
    .catch(err => dispatch(errors(err)));
};

export const postComplaint = data => dispatch => {
  axios
    .post("/api/complaints", data)
    .then(complain => {
      dispatch(createdComplaint(complain.data));
    })
    .catch(err => dispatch(errors(err)));
};

export const deleteComplaint = data => dispatch => {
  if (window.confirm("Are you sure you want to delete this complain?")) {
    axios
      .delete(`/api/complaints/${data}`)
      .then(complain => {
        dispatch(deletedComplaint(complain.data));
      })
      .catch(err => dispatch(errors(err)));
  } else {
    alert("A thought you don't have sense");
  }
};

export const replyComplaint = (id, data) => dispatch => {
  axios.post(`/api/complaints/${id}`, { response: data }).then(complaint => {
    dispatch(repliedComplaint(complaint.data));
  });
};

export const clear = getComplaints => dispatch => {
  setTimeout(() => {
    getComplaints();
    dispatch(createdComplaint({}));
  }, 5000);
};
