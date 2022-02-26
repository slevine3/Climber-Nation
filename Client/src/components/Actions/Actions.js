export const fileSelectHandler = (image) => {
  return {
    type: "SELECTED_FILE",
    payload: image,
  };
};

export const newUserLogIn = (first_name) => {
  return {
    type: "LOG_IN",
    payload: first_name,
  };
};
