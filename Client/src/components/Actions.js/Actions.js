
export const fileSelectHandler = (image) => {
  return {
    type: "SELECTED_FILE",
    payload: image,
  };
};


export const authenticationStatusChange = () => {
  return {
    type: "LOG_IN",
    payload: true,
  };
};