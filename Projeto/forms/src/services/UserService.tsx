import { getUserId } from "./AuthService";
import axiosInstance from "./Axios";

// User Get functions - retorna todos os utilizadores na base de dados

export const getAllUsers = async (): Promise<any> => {
  const response = await axiosInstance.get("/users/");
  return response;
};

export const postReview = async (review: any): Promise<any> => {
  const response = await axiosInstance.post("/userReviews/", {
    review: review.review,
    grade: review.grade,
    user: getUserId(),
    username: localStorage.getItem("userName"),
  });
  return response;
};

export const getAllReviews = async (): Promise<any> => {
  const response = await axiosInstance.get("/userReviews/");
  return response;
};