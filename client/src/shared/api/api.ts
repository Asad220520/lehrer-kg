import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;

export const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Чтобы работали куки (если понадобятся)
});

// Перехватчик: перед каждым запросом добавляем токен в заголовки
$api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (config.headers && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
