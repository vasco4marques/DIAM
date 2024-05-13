import axios from "axios";
import { getToken } from "./AuthService";

const API_URL = process.env.REACT_APP_BACKEND_API || "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `${getToken()}`,
  },
});

// User Get functions - retorna todos os utilizadores na base de dados

export const getAllUsers = async (): Promise<any> => {
  const response = await axiosInstance.get("/users/");
  return response;
};
