import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_API || "http://localhost:8000";

let axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(function (config) {
  let token = localStorage.getItem("authToken");
  config.headers["Authorization"] = "Token " + token;
  return config;
});

export default axiosInstance;