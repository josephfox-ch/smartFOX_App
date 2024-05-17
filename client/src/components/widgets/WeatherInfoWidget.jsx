import React from "react";
import { useWeather } from "../../context/WeatherContext";
import { TbTemperatureCelsius } from "react-icons/tb";
import { FaWind } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { BsSunrise } from "react-icons/bs";
import { BsSunsetFill } from "react-icons/bs";

function WeatherInfoWidget() {
  const {
    outdoorTemperature,
    windSpeed,
    humidity,
    weatherDescription,
    weatherIcon,
    sunrise,
    sunset, 
  } = useWeather();

  return (
    <>
      {outdoorTemperature !== null && (
        <div className="bg-blue-100 dark:bg-gray-800 p-3 rounded-lg shadow-md transition-transform transform hover:scale-105 h-full">
          <div className="flex items-center justify-around mb-4">
            <div className="flex items-center">
              <img
                src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                alt="Weather icon"
                className="w-20 h-20"
              />
              <div className="ml-2">
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {weatherDescription}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                {outdoorTemperature}
              </p>
              <TbTemperatureCelsius size="30" />
            </div>
          </div>
          <div className="flex justify-around items-center text-gray-700 dark:text-gray-300">
            <div className="flex flex-col items-center">
              <FaWind size="20" />
              <p>{windSpeed} m/s</p>
            </div>
            <div className="flex flex-col items-center">
              <WiHumidity size="28" />
              <p>{humidity} %</p>
            </div>
          </div>
          <div className="flex justify-around items-center text-gray-700 dark:text-gray-300 mt-4">
            <div className="flex flex-col items-center">
              <BsSunrise size="25" />
              <p>{sunrise}</p>
            </div>
            <div className="flex flex-col items-center">
              <BsSunsetFill size="25" />
              <p>{sunset}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WeatherInfoWidget;
