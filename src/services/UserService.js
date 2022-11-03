import { BASE_URL, POST } from "./index";
import { saveAuthToken } from "./TokenService";

export const loginService = async (forms) => {
  let sendData = {
    username: forms.username,
    password: forms.pass,
  };

  try {
    let response = await POST(BASE_URL + "user-login", sendData);

    await saveAuthToken(response.headers["x-auth-token"]);

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserProfileService = async () => {
  try {
    let response = await POST(BASE_URL + "user-profile");

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
