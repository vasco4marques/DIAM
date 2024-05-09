import axios, { AxiosResponse } from 'axios';
import {getToken, getUserId } from './AuthService';
import { Form } from '../pages/NewForm';
import { Answers } from '../pages/AnswerForm';

const API_URL = process.env.REACT_APP_BACKEND_API || 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `${getToken()}`,
  },
});

export const getAllForms = async (): Promise<AxiosResponse> => {
  const userId = getUserId();
  console.log(userId)
  const response = await axiosInstance.get(`/forms/${userId}/`);
  return response;
};

export const getFormById = async (id: string): Promise<AxiosResponse> => {
  const response = await axiosInstance.get(`/form/${id}/`);
  return response;
};

export const getFormByIdActive = async (id: string): Promise<AxiosResponse> => {
  const response = await axios.get(`${API_URL}/form/view/${id}/`, {});
  return response;
};

export const postForms = async (formData: Form): Promise<AxiosResponse> => {
  const userId = getUserId();
  formData.createdBy = userId!;
  const response = await axiosInstance.post('/forms/new/', formData);
  return response;
};

export const answerForm = async (AnswersData: Answers): Promise<AxiosResponse> => {
  const response = await axiosInstance.post('/answer/', AnswersData);
  return response;
};

export const updateForm = async (formData: Form): Promise<AxiosResponse> => {
  const response = await axiosInstance.put(`/forms/edit/${formData._id}/`, formData);
  return response;
};
