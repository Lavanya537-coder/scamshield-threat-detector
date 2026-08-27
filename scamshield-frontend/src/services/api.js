import axios from 'axios';

const API = axios.create({
  baseURL: "https://scamshield-backend-oi0g.onrender.com",
  headers: { 'Content-Type': 'application/json' }
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  verifyOTP: (data) => API.post('/auth/verify-otp', data),
  login: (credentials) => API.post('/auth/login', credentials),
};

export const analyzeAPI = {
  analyzeMessage: (text) => API.post('/scan', { type: 'text', content: text }),
  analyzeURL: (url) => API.post('/scan', { type: 'url', content: url }),
};

export default API;
