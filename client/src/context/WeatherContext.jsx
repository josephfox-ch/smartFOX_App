import React, { createContext, useContext, useState, useEffect } from "react";
import { getWeatherByCoordinates } from "../api/services/weatherService";
import { useHomes } from "./HomeContext";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const { selectedHome } = useHomes();
  const [weather, setWeather] = useState({
    outdoorTemperature: null,
    humidity: null,
    windSpeed: null,
    weatherDescription: null,
    weatherType: null,
    weatherIcon: null,
    sunrise: null,
    sunset: null,
  });

  useEffect(() => {
    let intervalId;

    const fetchWeather = async () => {
      if (selectedHome) {
        try {
          const weatherData = await getWeatherByCoordinates({
            latitude: selectedHome.latitude,
            longitude: selectedHome.longitude,
          });
          setWeather({
            outdoorTemperature: weatherData.main.temp,
            humidity: weatherData.main.humidity,
            windSpeed: weatherData.wind.speed,
            weatherDescription: weatherData.weather[0].description,
            weatherType: weatherData.weather[0].main,
            weatherIcon: weatherData.weather[0].icon,
            sunrise: new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(),
            sunset: new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(),
          });
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    };

    fetchWeather();

    if (selectedHome) {
      intervalId = setInterval(fetchWeather, 30 * 60 * 1000); 
    }

    return () => {
      if (intervalId) clearInterval(intervalId); 
    };
  }, [selectedHome]);

  return (
    <WeatherContext.Provider value={weather}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);

