import React from "react";
import { useWeather } from "../../context/WeatherContext";

const EnergyMonitor = () => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-gray-100 p-4 rounded shadow dark:bg-gray-800">
        <h3 className="font-medium text-lg mb-3 text-gray-700 dark:text-gray-300">
          Energy Monitor
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          <strong>Energy Used:</strong> 150 kWh
        </p>
        <div className="mt-4">
          <h4 className="text-gray-700 dark:text-gray-300 mb-2">
            Energy Usage (Weekly)
          </h4>
          <div className="bg-white p-4 rounded shadow dark:bg-gray-700">
            {/* Graph Content  */}
          </div>
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded shadow dark:bg-gray-800">
        <h3 className="font-medium text-lg mb-3 text-gray-700 dark:text-gray-300">
          Climate Control
        </h3>
        <div className="flex items-center space-x-4 mb-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            On
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Off
          </button>
        </div>
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <input
              type="range"
              min="0"
              max="30"
              className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            />
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              15°C
            </div>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          <strong>Air Quality:</strong> Good
        </p>
      </div>
    </div>
  );
};

export default EnergyMonitor;
