import axios from 'axios';
const API_URL = process.env.REACT_APP_BACKEND_API || 'http://localhost:8000';

 export const registerUser = async (username: string, password: string): Promise<void> => {
  await axios.post(`${API_URL}/register/`, {
    username,
    password,
  });
};


