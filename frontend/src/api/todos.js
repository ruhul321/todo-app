// src/api/todo.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, 
});

// Add auth token to headers
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export const getTodoLists = () => API.get('/todos');
export const createTodoList = (data) => API.post('/todos', data);
export const deleteTodoList = (id) => API.delete(`/todos/${id}`);
export const updateTodoList = (id, data) => API.put(`/todos/${id}`, data);
