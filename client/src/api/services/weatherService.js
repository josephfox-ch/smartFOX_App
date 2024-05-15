import openWeatherAPI from "../weatherAPI";

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

export const getWeatherByCoordinates = async ({ latitude, longitude }) => {
  try {
    const response = await openWeatherAPI.get("/", {
      params: {
        lat: latitude,
        lon: longitude,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
