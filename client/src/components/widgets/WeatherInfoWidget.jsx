import React from "react";
import { useWeather } from "../../context/WeatherContext";
import WeatherIcon from "../weather/WeatherIcon";
import WeatherDetail from "../weather/WeatherDetail";

const WeatherInfoWidget = () => {
  const {
    outdoorTemperature,
    windSpeed,
    humidity,
    weatherDescription,
    weatherIcon,
    sunrise,
    sunset,
  } = useWeather();

  if (outdoorTemperature === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-r from-teal-500 to-blue-400 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-600 rounded-lg shadow-lg flex flex-col items-center text-white transition-transform transform hover:scale-105 h-full">
      <div className="flex items-center justify-between space-x-3">
        <WeatherIcon weatherIcon={weatherIcon} />
        <div>
          <p className="text-2xl font-semibold">{weatherDescription}</p>
        </div>
      </div>
      <WeatherDetail
        outdoorTemperature={outdoorTemperature}
        windSpeed={windSpeed}
        humidity={humidity}
        sunrise={sunrise}
        sunset={sunset}
      />
    </div>
  );
};

export default React.memo(WeatherInfoWidget);

