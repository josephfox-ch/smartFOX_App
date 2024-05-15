import React, { createContext, useState, useContext, useEffect } from "react";
import { getWeatherByCoordinates } from "../api/services/weatherService";
import { useHomes } from "./HomeContext";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const { selectedHome } = useHomes();
  const [outdoorTemperature, setOutdoorTemperature] = useState(null);
  const [humidity,setHumidity] = useState(null);
  const [windSpeed,setWindSpeed] = useState(null);
  const [weatherDescription,setWeatherDescription] = useState(null);
  const [weatherType,setWeatherType] = useState(null);
  const [weatherIcon,setWeatherIcon] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (selectedHome) {
        try {
          const weatherData = await getWeatherByCoordinates({
            latitude: selectedHome.latitude,
            longitude: selectedHome.longitude,
          });
          setOutdoorTemperature(weatherData.main.temp);
          setHumidity(weatherData.main.humidity);
          setWindSpeed(weatherData.wind.speed);
          setWeatherDescription(weatherData.weather[0].description);
          setWeatherType(weatherData.weather[0].main);
          setWeatherIcon(weatherData.weather[0].icon);
          console.log("Weather data fetched:", weatherData);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    };

    fetchWeather();
    console.log("weather data changed");
  }, [selectedHome]);

  return (
    <WeatherContext.Provider value={{ outdoorTemperature ,humidity,windSpeed,weatherDescription,weatherType,weatherIcon }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  return useContext(WeatherContext);
};
