import axios from 'axios';

const API_KEY = import.meta.env.OPEN_WEATHER_API_KEY;
const BASE_URL = import.meta.env.OPEN_WEATHER_API_BASE_URL;

const getWeatherByAddress = async (address) => {
  const { street, city, country } = address;
  const response = await axios.get(BASE_URL, {
    params: {
      q: `${street},${city},${country}`,
      appid: API_KEY,
      units: 'metric'
    }
  });
  return response.data;
};

export default { getWeatherByAddress };



