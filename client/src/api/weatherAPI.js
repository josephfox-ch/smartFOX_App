import axios from "axios";

const openWeatherAPI = axios.create({
  baseURL: import.meta.env.VITE_OPEN_WEATHER_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

openWeatherAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorDetails = {
      message: error.message,
      status: error.response ? error.response.status : "Network error",
      config: error.config,
    };
    return Promise.reject(errorDetails);
  }
);

export default openWeatherAPI;
