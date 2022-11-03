export const setLoginAction = (payload) => {
  return {
    type: "SET_USER_LOGIN",

    payload: payload,
  };
};

export const checkLoginAction = () => {
  return {
    type: "CHECK_USER_LOGIN",

    payload: null,
  };
};

export const setMenuAction = (payload) => {
  return { type: "SET_MENU", payload: payload };
};
