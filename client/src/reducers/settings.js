import { SETTINGS, SETTINGS_ERROR, GET_SETTINGS } from "../actions/types";

const Settings = (state = {}, action = {}) => {
  switch (action.type) {
    case SETTINGS:
      return {
        ...state,
        settings: action.payload
      };
    case SETTINGS_ERROR:
      return {
        ...state,
        settingError: action.payload
      };
    case GET_SETTINGS:
      return {
        ...state,
        gotSetting: action.payload
      };
    default:
      return state;
  }
};

export default Settings;
