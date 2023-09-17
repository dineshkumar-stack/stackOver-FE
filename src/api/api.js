// api.js
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
const authToken = localStorage.getItem("authToken"); // Retrieve the token from local storage


const api = axios.create({
  baseURL: 'https://student-dashboard-be.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log(authToken);

api.interceptors.request.use((config) => {
  const { token } = useAuth();
  if (token) {
    config.headers['Authorization'] = `${authToken}`;
  }
  return config;
});

export default api;
