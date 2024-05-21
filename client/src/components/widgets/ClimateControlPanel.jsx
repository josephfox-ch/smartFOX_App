import React, { useState, useEffect } from "react";
import { FaHome, FaSun, FaSnowflake, FaPowerOff, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { TbTemperatureCelsius } from "react-icons/tb";
import { RiTakeawayLine } from "react-icons/ri";
import { useHomes } from "../../context/HomeContext";
import { useClimate } from "../../context/ClimateContext";
import * as hvacSystemLogService from "../../api/services/hvacSystemLogService";
import * as energyUsageService from "../../api/services/energyUsageService";

const ClimateControlPanel = () => {
  const { selectedHome } = useHomes();
  const { climateControl, updateClimateControl } = useClimate();
  const [desiredTemperature, setDesiredTemperature] = useState(20);
  const [isOn, setIsOn] = useState(false);
  const [mode, setMode] = useState("away");

  useEffect(() => {
    if (climateControl) {
      setDesiredTemperature(climateControl.desiredTemperature);
      setMode(climateControl.mode);
      setIsOn(climateControl.status === "on");
    }
  }, [climateControl]);

  if (!climateControl) {
    return <p>Loading...</p>;
  }

  const logHVACStatus = async (status) => {
    try {
      await hvacSystemLogService.createHVACSystemLog({
        homeId: selectedHome.id,
        status,
        startedAt: new Date(),
      });
    } catch (error) {
      console.error("Failed to log HVAC status", error);
    }
  };

  const logEnergyUsage = async (energyConsumed) => {
    try {
      await energyUsageService.createEnergyUsage({
        homeId: selectedHome.id,
        date: new Date(),
        energyConsumed,
      });
    } catch (error) {
      console.error("Failed to log energy usage", error);
    }
  };

  const handleTemperatureIncrease = async () => {
    let newTemperature;
    if (mode === "cooling") {
      newTemperature = Math.min(desiredTemperature + 1, 25);
    } else if (mode === "heating") {
      newTemperature = Math.min(desiredTemperature + 1, 30);
    } else {
      newTemperature = Math.min(desiredTemperature + 1, 22); 
    }

    setDesiredTemperature(newTemperature);
    await updateClimateControl(climateControl.id, { ...climateControl, desiredTemperature: newTemperature });
    console.log(`Temperature for home ${selectedHome.name} increased to ${newTemperature}°C`);
    logEnergyUsage(1); // Example value
  };

  const handleTemperatureDecrease = async () => {
    let newTemperature;
    if (mode === "cooling") {
      newTemperature = Math.max(desiredTemperature - 1, 16);
    } else if (mode === "heating") {
      newTemperature = Math.max(desiredTemperature - 1, 17);
    } else {
      newTemperature = Math.max(desiredTemperature - 1, 18); 
    }

    setDesiredTemperature(newTemperature);
    await updateClimateControl(climateControl.id, { ...climateControl, desiredTemperature: newTemperature });
    console.log(`Temperature for home ${selectedHome.name} decreased to ${newTemperature}°C`);
    logEnergyUsage(1); // Example value
  };

  const handleTogglePower = async () => {
    const newStatus = isOn ? "off" : "on";
    setIsOn(!isOn);
    await updateClimateControl(climateControl.id, { ...climateControl, status: newStatus });
    console.log(`Climate control for home ${selectedHome.name} turned ${isOn ? "off" : "on"}`);
    logHVACStatus(newStatus);
    logEnergyUsage(5); // Example value
  };

  const handleToggleMode = async () => {
    let newMode;
    if (mode === "cooling") {
      newMode = "heating";
    } else if (mode === "heating") {
      newMode = "away";
    } else {
      newMode = "cooling";
    }

    setMode(newMode);
    await updateClimateControl(climateControl.id, { ...climateControl, mode: newMode });
    console.log(`Mode changed to ${newMode}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col items-center justify-between gap-5">
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
          <div className="flex flex-col items-center">
            <FaHome size="30" className="text-foxColor" />
            <div className="flex items-center text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-2">
              {climateControl.currentTemperature} <TbTemperatureCelsius size="24" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button
            onClick={handleToggleMode}
            className={`flex flex-col px-4 py-2 transition-colors items-center ${
              mode === "heating"
                ? "text-yellow-400"
                : mode === "cooling"
                ? "text-blue-400"
                : "text-red-400"
            }`}
          >
            {mode === "heating" ? (
              <FaSun size="40" />
            ) : mode === "cooling" ? (
              <FaSnowflake size="40" />
            ) : (
              <RiTakeawayLine size="40" />
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
            {desiredTemperature} <TbTemperatureCelsius size="24" />
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







