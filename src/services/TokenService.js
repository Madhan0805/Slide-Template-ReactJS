import jwt_decode from "jwt-decode";

export const saveAuthToken = async (token) => {
  token !== undefined
    ? localStorage.setItem("x_auth_token", token)
    : removeToken();
};

export const removeToken = () => {
  localStorage.removeItem("x_auth_token");
};

export const getToken = () => {
  return localStorage.getItem("x_auth_token");
};

export const decodeToken = (token) => {
  return jwt_decode(token);
};
