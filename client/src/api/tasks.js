import axios from './axios'
axios.defaults.withCredentials = true;

export const getTasksRequest = () => axios.get(`/tasks`)

export const getTaskByIdRequest = (id) => axios.get(`/tasks/${id}`)

export const createTaskRequest = (task) => axios.post(`/tasks`, task)

export const updateTaskRequest = (id ,task) => axios.put(`/tasks/${id}`, task)

export const deleteTaskRequest = (id) => axios.delete(`/tasks/${id}`)