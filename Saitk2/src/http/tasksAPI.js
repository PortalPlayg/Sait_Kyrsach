import axios from './axiosConfig';

export const getAllTasksByLessonId = async (courseId, lessonId) => {
	const response = await axios.get(`/api/courses/${courseId}/lessons/${lessonId}/tasks/`)
	return response
}

export const sendAnswer = async (courseId, lessonId, taskId) => {
	const response = await axios.post(`/api/courses/${courseId}/lessons/${lessonId}/responses/sendresponses/`, { taskId: taskId })
	return response
}

export const SendTextAnswer = async (courseId, lessonId, taskId, responseText) => {
	console.log("Я тута!!!")
	const response = await axios.post(`/api/courses/${courseId}/lessons/${lessonId}/responses/sendresponses/`, { taskId: taskId, response_text: responseText })
	return response
}

export const createTask = async (courseId, lessonId, newTask) => {
	console.log("here", courseId, lessonId, newTask)
	const response = await axios.post(`/api/courses/${courseId}/lessons/${lessonId}/tasks/createtask/`,
		{ title: newTask.title, task_type: newTask.task_type, description: newTask.description, answerTypeId: 1, documentLink: newTask.documentLink })
	return response
}