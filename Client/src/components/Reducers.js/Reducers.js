import { combineReducers } from 'redux';


let initialState = {
  selected_file: null,
  isLoggedIn: false,
  username: '',
  first_name: '',
};

const imageUpload = (state = initialState, action) => {
  switch (action.type) {
    case "SELECTED_FILE":
      return { ...state, selected_file: action.payload};

    default:
      return { state };
  }
};

const logUserIn = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return { ...state, isLoggedIn: action.payload};
    default:
      return { state };
  }
};

export const rootReducers = combineReducers({
  imageUpload,
  logUserIn
})