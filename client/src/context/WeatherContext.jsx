import React, { createContext, useState, useContext, useEffect } from "react";
import { getWeatherByCoordinates } from "../api/services/weatherService";
import { useHomes } from "./HomeContext";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const { selectedHome } = useHomes();
  const [outdoorTemperature, setOutdoorTemperature] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (selectedHome) {
        try {
          const weatherData = await getWeatherByCoordinates({
            latitude: selectedHome.latitude,
            longitude: selectedHome.longitude,
          });
          setOutdoorTemperature(weatherData.main.temp);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    };

    fetchWeather();
    console.log("weather data changed");
  }, [selectedHome]);

  return (
    <WeatherContext.Provider value={{ outdoorTemperature }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  return useContext(WeatherContext);
};
