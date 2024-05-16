import React from "react";
import { useWeather } from "../../context/WeatherContext";


function WeatherInfoWidget() {
  const {
    outdoorTemperature,
    windSpeed,
    humidity,
    weatherDescription,
    weatherIcon,
  } = useWeather();
  return (
    <>
      {outdoorTemperature !== null && (
        <div className="flex items-center justify-around bg-blue-100 rounded-lg shadow-lg mb-6"> 
          <img
            src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
            alt="Weather icon"
            width="75"
          />

          <p>Indoor Temp: 19°C</p>
          <p>Outdoor Temp: {outdoorTemperature}°C</p>
          <p>Wind Speed: {windSpeed} m/s</p>
          <p>Humidity: {humidity}%</p>
          <p>Weather: {weatherDescription}</p>
        </div>
      )}
    </>
  );
}

export default WeatherInfoWidget;
