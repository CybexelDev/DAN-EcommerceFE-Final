import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const adminApi = axios.create({
  baseURL: BASE_URL,
});

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default adminApi;