import React, { useState } from "react";
import { FaHome, FaSun, FaSnowflake, FaPowerOff } from "react-icons/fa";
import { TbTemperatureCelsius } from "react-icons/tb";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useHomes } from "../../context/HomeContext";

const ClimateControlPanel = () => {
  const { selectedHome } = useHomes();
  const [temperature, setTemperature] = useState(20);
  const [isOn, setIsOn] = useState(false);
  const [mode, setMode] = useState("heating");

  const handleTemperatureIncrease = () => {
    if (mode === "summer") {
      setTemperature((prevTemp) => Math.min(prevTemp + 1, 25));
    } else {
      setTemperature((prevTemp) => Math.min(prevTemp + 1, 30));
    }
    console.log(
      `Temperature for home ${selectedHome.name} increased to ${
        temperature + 1
      }°C`
    );
  };

  const handleTemperatureDecrease = () => {
    if (mode === "heating") {
      setTemperature((prevTemp) => Math.max(prevTemp - 1, 17));
    } else {
      setTemperature((prevTemp) => Math.max(prevTemp - 1, 16));
    }
    console.log(
      `Temperature for home ${selectedHome.name} decreased to ${
        temperature - 1
      }°C`
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

  const handleToggleMode = () => {
    setMode((prevMode) => (prevMode === "cooling" ? "heating" : "cooling"));
    if (mode === "cooling" && temperature < 17) {
      setTemperature(17);
    } else if (mode === "heating" && temperature > 30) {
      setTemperature(30);
    }
    console.log(
      `Mode changed to ${mode === "cooling" ? "heating" : "cooling"}`
    );
  };

  return (
    <div className="bg-whiten dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col items-center justify-between gap-5 ">
          <button
            onClick={handleTogglePower}
            className={`border-2 px-4 py-4 rounded text-black dark:text-white transition-colors ${
              isOn
                ? "border-green-500 hover:bg-green-600"
                : "border-red-500 hover:bg-red-600"
            }`}
          >
            <FaPowerOff size="30" />
          </button>
          <div className="flex flex-col items-center  ">
            <FaHome size="30" className=" text-foxColor" />
            <div className="flex items-center text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-2">
              {temperature} <TbTemperatureCelsius size="24" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button
            onClick={handleToggleMode}
            className={`flex flex-col px-4 py-2 transition-colors items-center ${
              mode === "heating" ? "text-yellow-400" : "text-blue-400"
            }`}
          >
            {mode === "heating" ? (
              <FaSun size="40" />
            ) : (
              <FaSnowflake size="40" />
            )}
            <p>{mode} mode</p>
          </button>
        </div>
        <div className="flex flex-col items-center">
          <button
            onClick={handleTemperatureIncrease}
            className="px-4 py-2 rounded text-blue-600 transition-colors mb-2"
          >
            <FaChevronUp size="35" />
          </button>
          <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {temperature} <TbTemperatureCelsius size="24" />
          </div>
          <button
            onClick={handleTemperatureDecrease}
            className="px-4 py-2 rounded text-blue-600 transition-colors mt-2"
          >
            <FaChevronDown size="35" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClimateControlPanel;
