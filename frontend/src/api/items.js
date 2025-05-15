// src/api/items.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, 
});

// Attach token from localStorage
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export const getTodoItems = (listId) =>
  API.get(`/todos/${listId}/items`);
  
// Create a new item in a list
export const addTodoItem = (listId, data) =>
  API.post(`/todos/${listId}/items`, data);

// Update an item in a list
export const updateTodoItem = (listId, itemId, data) =>
  API.put(`/todos/${listId}/items/${itemId}`, data);

// Delete an item from a list
export const deleteTodoItem = (listId, itemId) =>
  API.delete(`/todos/${listId}/items/${itemId}`);
