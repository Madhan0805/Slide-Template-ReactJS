import axios from "axios";

export const BASE_URL = "http://localhost:4501/api/";
export const BASE_PUBLIC = "http://localhost:4501/";
let token = localStorage.getItem("x_auth_token");
axios.defaults.headers.common["x-auth-token"] = token;
export const GET = axios.get;
export const POST = axios.post;
export const PUT = axios.put;
export const DELETE = axios.delete;
