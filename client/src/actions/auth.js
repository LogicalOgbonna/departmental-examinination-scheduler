import axios from "axios";
import jwtDecode from "jwt-decode";

import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_CREATED,
  AUTH_ERRORS
} from "./types";

import history from "../utils/history";
import setAuthorizationHeader from "../utils/setAuthorizationHeader";

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const userLoggedOut = user => ({
  type: USER_LOGGED_OUT,
  user
});

export const userCreated = user => ({
  type: USER_CREATED,
  user
});

export const errors = error => ({
  type: AUTH_ERRORS,
  error
});

export const login = user => dispatch => {
  axios
    .post("/api/user/auth/signin", user)
    .then(user => {
      const token = user.data.token;
      localStorage.cost = JSON.stringify(token);
      const currentUser = jwtDecode(token);
      axios.get(`/api/user/auth/current/${currentUser.id}`).then(user => {
        setAuthorizationHeader(token);
        dispatch(
          userLoggedIn({
            admin: user.data.admin,
            email: user.data.email,
            avatar: user.data.avatar,
            id: user.data._id
          })
        );
        history.push("/dashboard");
      });
    })
    .catch(error => {
      error.response && dispatch(errors(error.response.data));
    });
};

export const register = user => dispatch => {
  axios
    .post("/api/user/auth/signup", user)
    .then(res => {
      const token = res.data.token;
      localStorage.cost = JSON.stringify(token);
      const currentUser = jwtDecode(token);
      axios.get(`/api/user/auth/current/${currentUser.id}`).then(user => {
        setAuthorizationHeader(token);
        dispatch(
          userLoggedIn({
            admin: user.data.admin,
            email: user.data.email,
            avatar: user.data.avatar,
            reason: user.data.reason,
            id: user.data._id
          })
        );
        history.push("/dashboard");
      });
    })
    .catch(error => {
      error.response && dispatch(errors(error.response.data));
    });
};

export const lecturerLogin = data => dispatch => {
  axios.post("/api/lecturers/login", data).then(lecturer => {
    const token = lecturer.data.token;
    localStorage.cost = JSON.stringify(token);
    const currentlecturer = jwtDecode(token);
    axios.get(`/api/lecturers/${currentlecturer.id}`).then(lecturer => {
      setAuthorizationHeader(token);
      dispatch(
        userLoggedIn({
          courses: lecturer.data.courses,
          email: lecturer.data.email,
          avatar: lecturer.data.avatar,
          id: lecturer.data._id
        })
      );
      history.push("/dashboard");
    });
    // console.log()
  });
};

export const LecturerRegister = data => dispatch => {
  axios.post("/api/lecturers", data).then(lecturer => {
    const token = lecturer.data.token;
    localStorage.cost = JSON.stringify(token);
    const currentlecturer = jwtDecode(token);
    axios.get(`/api/lecturers/${currentlecturer.id}`).then(lecturer => {
      setAuthorizationHeader(token);
      dispatch(
        userLoggedIn({
          courses: lecturer.data.courses,
          email: lecturer.data.email,
          avatar: lecturer.data.avatar,
          id: lecturer.data._id
        })
      );
      history.push("/dashboard");
    });
  });
};

export const logout = () => dispatch => {
  // window.location.href = "/";
  localStorage.cost = "";

  setAuthorizationHeader();
  dispatch(userLoggedOut({}));

  history.push("/");
};
