import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor: Attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handle unauthenticated or global errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optional auto logout or token clear on unauthorized
      if (localStorage.getItem('token')) {
        console.warn('Session expired or unauthorized. Logging out.');
      }
    }
    return Promise.reject(error);
  }
);

// API Service Endpoints (Aligned with Din 5-11 Backend)
export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
};

export const clientsApi = {
  getAll: (params) => api.get('/clients', { params }),
  getStats: (params) => api.get('/clients/stats', { params }),
  getById: (id) => api.get(`/clients/${id}`),
  create: (data) => api.post('/clients', data),
  update: (id, data) => api.put(`/clients/${id}`, data),
  delete: (id) => api.delete(`/clients/${id}`),
  getProjects: (id, params) => api.get(`/clients/${id}/projects`, { params }),
  getInvoices: (id, params) => api.get(`/clients/${id}/invoices`, { params }),
};

export const projectsApi = {
  getAll: (params) => api.get('/projects', { params }),
  getStats: (params) => api.get('/projects/stats', { params }),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

export const tasksApi = {
  getAll: (params) => api.get('/tasks', { params }),
  getStats: (params) => api.get('/tasks/stats', { params }),
  getById: (id) => api.get(`/tasks/${id}`),
  create: (data) => api.post('/tasks', data),
  update: (id, data) => api.put(`/tasks/${id}`, data),
  delete: (id) => api.delete(`/tasks/${id}`),
  reorder: (updates) => api.put('/tasks/reorder', updates),
};

export const invoicesApi = {
  getAll: (params) => api.get('/invoices', { params }),
  getStats: (params) => api.get('/invoices/stats', { params }),
  getById: (id) => api.get(`/invoices/${id}`),
  generate: (data) => api.post('/invoices/generate', data),
  updateStatus: (id, status) => api.patch(`/invoices/${id}/status`, { status }),
  delete: (id) => api.delete(`/invoices/${id}`),
};

export default api;
