import axios from "axios";
const API_URL = process.env.REACT_APP_BACKEND_API || 'http://localhost:8000';

export const login = async (username: string, password: string): Promise<void> => {
  const response = await axios.post(`${API_URL}/login/`, {
    username,
    password,
  });

  const token = response.data.token;
  saveToken(token);
  const userId = response.data.username;
  const userName = response.data.username;
  saveUserProprets(userId, userName);
};

const saveToken = (token: string): void => {
  localStorage.setItem("authToken", token);
};

const saveUserProprets = (userId: string, name: string): void => {
  localStorage.setItem("userId", userId);
  localStorage.setItem("userName", name);
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("authToken");
};

export const getUserId = (): string | null => {
  return localStorage.getItem("userId");
};

export const getToken = (): string | null => {
  return localStorage.getItem("authToken");
};

export const getUserName = (): string | null => {
  return localStorage.getItem("userName");
};

export const logout = (): void => {
  localStorage.removeItem("authToken");
};
