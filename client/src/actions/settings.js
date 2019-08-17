import { SETTINGS, SETTINGS_ERROR, GET_SETTINGS } from "./types";
import axios from "axios";

export const settings = setting => ({
  type: SETTINGS,
  payload: setting
});

export const gotSettings = setting => ({
  type: GET_SETTINGS,
  payload: setting
});

export const errors = error => ({
  type: SETTINGS_ERROR,
  payload: error
});

export const setSetting = data => dispatch => {
  axios
    .post("/api/settings", data)
    .then(setting => {
      console.log(setting.data);
      dispatch(settings(setting.data));
    })
    .catch(err => dispatch(err));
};

export const getSetting = () => dispatch => {
  axios
    .get("/api/settings")
    .then(setting => dispatch(gotSettings(setting.data)))
    .catch(err => dispatch(errors(err)));
};
