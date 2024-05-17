import React, { useState, useEffect } from "react";
import { FaHome, FaSun, FaSnowflake, FaPowerOff } from "react-icons/fa";
import { TbTemperatureCelsius } from "react-icons/tb";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useHomes } from "../../context/HomeContext";
import { useClimate } from "../../context/ClimateContext";

const ClimateControlPanel = () => {
  const { selectedHome } = useHomes();
  const { climateControl, updateClimateControl } = useClimate();
  const [temperature, setTemperature] = useState(20);
  const [isOn, setIsOn] = useState(false);
  const [mode, setMode] = useState("heating");

  useEffect(() => {
    if (climateControl) {
      setTemperature(climateControl.currentTemperature);
      setMode(climateControl.mode);
    }
  }, [climateControl]);

  if (!climateControl) {
    return <p>Loading...</p>;
  }

  const handleTemperatureIncrease = () => {
    const newTemperature = mode === "summer"
      ? Math.min(temperature + 1, 25)
      : Math.min(temperature + 1, 30);

    setTemperature(newTemperature);
    updateClimateControl(climateControl.id, { ...climateControl, desiredTemperature: newTemperature });
    console.log(`Temperature for home ${selectedHome.name} increased to ${newTemperature}°C`);
  };

  const handleTemperatureDecrease = () => {
    const newTemperature = mode === "heating"
      ? Math.max(temperature - 1, 17)
      : Math.max(temperature - 1, 16);

    setTemperature(newTemperature);
    updateClimateControl(climateControl.id, { ...climateControl, desiredTemperature: newTemperature });
    console.log(`Temperature for home ${selectedHome.name} decreased to ${newTemperature}°C`);
  };

  const handleTogglePower = () => {
    setIsOn(!isOn);
    console.log(`Climate control for home ${selectedHome.name} turned ${isOn ? "off" : "on"}`);
  };

  const handleToggleMode = () => {
    const newMode = mode === "cooling" ? "heating" : "cooling";
    setMode(newMode);
    updateClimateControl(climateControl.id, { ...climateControl, mode: newMode });
    console.log(`Mode changed to ${newMode}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col items-center justify-between gap-5 ">
          <button
            onClick={handleTogglePower}
            className={`border-2 px-4 py-4 rounded text-black dark:text-white transition-colors ${
              isOn
                ? "border-green-600 hover:bg-green-500"
                : "border-red-600 hover:bg-red-500"
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

