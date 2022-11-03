import jwt_decode from "jwt-decode";

let initialState = {
  login: false,
  user: null,
  menu: "slideOut",
};

export const userReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case "SET_MENU":
      return { ...state, menu: payload };

    case "SET_USER_LOGIN":
      // console.log(payload, state);
      return { ...state, login: payload.status, user: payload.user };
    // case "CHECK_USER_LOGIN":

    default:
      let token = localStorage.getItem("x_auth_token");
      let loginStatus = token ? true : false;
      let user = token !== null ? jwt_decode(token) : null;
      return { ...state, login: loginStatus, user: user };
    // return { ...state };
  }
};
