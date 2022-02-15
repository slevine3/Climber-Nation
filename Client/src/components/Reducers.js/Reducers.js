import { combineReducers } from "redux";

let initialState = {
  selected_file: null,
  username: "",
  first_name: "",
};

const imageUpload = (state = initialState, action) => {
  switch (action.type) {
    case "SELECTED_FILE":
      return { ...state, selected_file: action.payload };
    default:
      return { state };
  }
};

const newUserLogIn = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {...state};
    default:
      return { state };
  }
};

export const rootReducers = combineReducers({
  imageUpload,
  newUserLogIn,
});
