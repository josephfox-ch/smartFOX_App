import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.response || error);
  }
);

export default API;
