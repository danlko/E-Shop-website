import axios from 'axios';

const api = axios.create({
  // baseURL: '3.88.225.134',
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

export default api;
