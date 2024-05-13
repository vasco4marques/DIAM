import axios, { AxiosResponse } from 'axios';
import { getToken, getUserId } from './AuthService';
import { Form } from '../pages/forms/NewForm';
import { Answers } from '../pages/forms/AnswerForm';

const API_URL = process.env.REACT_APP_BACKEND_API || 'http://localhost:8000';

const axiosInstance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Token ${getToken()}`,
	},
});

// Form Get functions

export const getAllForms = async (): Promise<AxiosResponse> => {
	const userId = getUserId();
	const type = localStorage.getItem('userType');
	// Se for admin, retorna todos os forms
	if (type === 'Admin') {
		const response = await axiosInstance.get('/forms/');
		return response;
	}
	const response = await axiosInstance.get(`/formPerUser/${userId}/`);
	return response;
};

export const getFormById = async (id: string): Promise<AxiosResponse> => {
	const response = await axiosInstance.get(`/form/${id}/`);
	return response;
};

export const getFormByIdActive = async (id: string): Promise<AxiosResponse> => {
	const response = await axiosInstance.get(`${API_URL}/formByIdActive/${id}/`);
	return response;
};

// Form CRUDs

export const postForms = async (formData: Form): Promise<AxiosResponse> => {
	const userId = getUserId();
	const response = await axiosInstance.post('/forms/', {
		title: formData.title,
		description: formData.description,
		user: userId,
	});
	const formId = response.data.id;
	formData.questions.forEach(async (question) => {
		const questionResponse = await axiosInstance.post('/questions/', {
			form: formId,
			title: question.title,
			description: question.description,
			type: question.type,
			mandatory: question.mandatory,
		});
		const questionId = questionResponse.data.id;
		if (question.type === 1) {
			question?.options?.forEach(async (option) => {
				await axiosInstance.post('/options/', {
					question: questionId,
					text: option,
					answerType: question.type,
					mandatory: question.mandatory,
				});
			});
		}
	});
	return response;
};

export const answerForm = async (AnswersData: Answers) => {
	const userId = getUserId();
	console.log(AnswersData);
	AnswersData.answers.forEach(async (answer) => {
		const answerResponse = await axiosInstance.post('/userAnswers/', {
			form: AnswersData.formId,
			question: answer.questionId,
			answerText: answer.answer,
			user: userId,
		});
	});
	return;
};

export const deleteForm = async (id: string): Promise<AxiosResponse> => {
	const response = await axiosInstance.delete(`/forms/${id}/`);
	return response;
};

export const updateForm = async (
	formData: Form,
	id: number
): Promise<AxiosResponse> => {
	const userId = getUserId();
	const response = await axiosInstance.put(`/forms/${id}/`, {
		title: formData.title,
		description: formData.description,
		user: userId,
		active: formData.active,
	});
	const formId = response.data.id;
	await axiosInstance.get(`${API_URL}/formDetails/${id}`).then((res) => {
		const questions = res.data.question_list;
		questions.forEach(async (question: any) => {
			await axiosInstance.delete(`/questions/${question.id}/`);
		});
	});
	formData.questions.forEach(async (question) => {
		console.log(question);
		const questionResponse = await axiosInstance.post('/questions/', {
			form: formId,
			title: question.title,
			description: question.description,
			type: question.type,
			mandatory: question.mandatory,
		});
		const questionId = questionResponse.data.id;
		if (question.type === 1) {
			question?.options?.forEach(async (option) => {
				await axiosInstance.post('/options/', {
					question: questionId,
					text: option,
					mandatory: question.mandatory,
				});
			});
		}
	});
	return response;
};

// get answers from form id: getAnswersByFormId

export const getAnswersByFormId = async (
	id: string
): Promise<AxiosResponse> => {
	const response = await axiosInstance.get(`/userAnswers/${id}/`);
	return response;
};
