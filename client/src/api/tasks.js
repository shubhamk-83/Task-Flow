import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Response interceptor — unwrap data or throw a clean error message
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.errors?.[0]?.message ||
      error.message ||
      'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

/**
 * Fetch all tasks. Accepts optional query params: { search, status, priority }
 */
export const fetchTasks = (params = {}) => {
  // Strip empty string values so they don't pollute the query string
  const clean = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== '' && v != null)
  );
  return api.get('/tasks', { params: clean });
};

/** Fetch a single task by id */
export const fetchTask = (id) => api.get(`/tasks/${id}`);

/** Create a new task */
export const createTask = (data) => api.post('/tasks', data);

/** Update an existing task */
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);

/** Delete a task */
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
