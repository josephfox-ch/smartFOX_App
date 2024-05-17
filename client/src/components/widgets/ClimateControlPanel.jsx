import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { TbTemperatureCelsius } from "react-icons/tb";
import { useHomes } from "../../context/HomeContext";
import { FaPowerOff } from "react-icons/fa";

const ClimateControlPanel = () => {
  const { selectedHome } = useHomes();
  const [temperature, setTemperature] = useState(15);
  const [isOn, setIsOn] = useState(false);

  const handleTemperatureChange = (e) => {
    setTemperature(e.target.value);
    console.log(
      `Temperature for home ${selectedHome.name} set to ${e.target.value}°C`
    );
  };

  const handleTogglePower = () => {
    setIsOn(!isOn);
    console.log(
      `Climate control for home ${selectedHome.name} turned ${
        isOn ? "off" : "on"
      }`
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 h-full">
      <h3 className="font-medium text-xl mb-4 text-gray-800 dark:text-gray-100">
        Climate Control
      </h3>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handleTogglePower}
          className={`px-4 py-2 rounded text-white transition-colors ${
            isOn
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          <FaPowerOff size="30" />
        </button>
        <div className="flex flex-col items-center">
          <FaHome size="30" className="text-gray-700 dark:text-gray-300" />
          <p className="flex items-center text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {temperature} <TbTemperatureCelsius size="24" />
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center mb-4">
        <div className="relative w-full">
          <input
            type="range"
            min="0"
            max="30"
            value={temperature}
            onChange={handleTemperatureChange}
            className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          />
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-white p-1 rounded-full shadow-md">
            {temperature}°C
          </div>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300">
        <strong>Air Quality:</strong> Good
      </p>
    </div>
  );
};

export default ClimateControlPanel;
