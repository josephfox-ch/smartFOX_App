import React, { useState, useEffect } from "react";
import { FaHome, FaSun, FaSnowflake, FaPowerOff, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { TbTemperatureCelsius } from "react-icons/tb";
import { RiTakeawayLine } from "react-icons/ri";
import { useClimate } from "../../context/ClimateContext";
import { useAlert } from "../../context/AlertContext";
import { useHomes } from "../../context/HomeContext";
import { useEnergy } from "../../context/EnergyContext";
import Lottie from "react-lottie";
import { formatNumber } from "../../utils/utils";
import humidityAnimation from "../../components/animations/humidity.json";

const humidityOptions = {
  loop: true,
  autoplay: true,
  animationData: humidityAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const ClimateControlPanel = () => {
  const { selectedHome } = useHomes();
  const { showAlert } = useAlert();
  const { setHeatingCurve, setEnergyBalance } = useEnergy();
  const { climateControl, updateClimateControl } = useClimate();
  const { performCalculations } = useEnergy();
  const [desiredTemperature, setDesiredTemperature] = useState(20);

  useEffect(() => {
    if (climateControl) {
      setDesiredTemperature(climateControl.desiredTemperature);
    }
  }, [climateControl]);

  if (!climateControl) {
    return <p>Loading...</p>;
  }

  const isOn = climateControl.status === "on";
  const mode = climateControl.mode;

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
    if (mode === "away") {
      showAlert("warning", "Cannot change temperature in 'Away' mode", "Climate Control");
      return;
    }

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
    showAlert("info", `Temperature INCREASED ${newTemperature}°C`, `Desired Temperature for home '${selectedHome.name}'`);
    logEnergyUsage(1);

    if (isOn) {
      performCalculations();
    }
  };

  const handleTemperatureDecrease = async () => {
    if (mode === "away") {
      showAlert("warning", "Cannot change temperature in 'Away' mode", "Climate Control");
      return;
    }

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
    showAlert("info", `Temperature DECREASED ${newTemperature}°C`, `Desired Temperature for home '${selectedHome.name}'`);
    logEnergyUsage(1);

    if (isOn) {
      performCalculations();
    }
  };

  const handleTogglePower = async () => {
    const newStatus = isOn ? "off" : "on";
    await updateClimateControl(climateControl.id, { ...climateControl, status: newStatus });
    showAlert(isOn ? "error" : "success", `Climate Turned ${isOn ? "OFF" : "ON"}`, `Climate control for home '${selectedHome.name}' turned ${isOn ? "OFF" : "ON"}`);
    logHVACStatus(newStatus);
    logEnergyUsage(5);

    if (newStatus === "on") {
      performCalculations();
    } else {
      setHeatingCurve("N/A");
      setEnergyBalance("N/A");
    }
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

    await updateClimateControl(climateControl.id, { ...climateControl, mode: newMode });
    showAlert('warning', `'${newMode.toUpperCase()}' mode ON for home '${selectedHome.name}'`);

    if (isOn && newMode !== "away") {
      performCalculations();
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-lg shadow-lg flex flex-col items-center space-y-6 text-white">
      <div className="flex space-x-6 items-center">
        <button
          onClick={handleToggleMode}
          className={`w-28 h-28 p-4 flex flex-col items-center justify-center rounded-full transition-all transform hover:scale-110 ${mode === "heating" ? "bg-yellow-500" : mode === "cooling" ? "bg-blue-500" : "bg-red-500"}`}
        >
          {mode === "heating" ? <FaSun size="35" /> : mode === "cooling" ? <FaSnowflake size="35" /> : <RiTakeawayLine size="35" />}
          <p className="mt-2 text-sm">{mode.charAt(0).toUpperCase() + mode.slice(1)} Mode</p>
        </button>
        <div className="flex flex-col items-center">
          <FaHome size="40" className="mb-2" />
          <div className="text-3xl font-bold">
            {formatNumber(climateControl.currentTemperature)} <TbTemperatureCelsius size="24" />
          </div>
        </div>
        <div className="flex items-center">
          <Lottie options={humidityOptions} height={80} width={80} />
          <p className="text-xl font-bold ">{climateControl.humidity}</p>
        </div>
        <button
          onClick={handleTogglePower}
          className={`w-16 h-16 flex items-center justify-center rounded-full transition-all transform hover:scale-110 ${isOn ? "bg-green-500" : "bg-red-500"}`}
        >
          <FaPowerOff size="32" />
        </button>
      </div>
      <div className="flex space-x-6 items-center">
        <button
          onClick={handleTemperatureIncrease}
          className="bg-green-500 p-3 rounded-full transition-all transform hover:scale-110"
        >
          <FaChevronUp size="24" />
        </button>
        <div className="text-3xl font-bold">
          {desiredTemperature} <TbTemperatureCelsius size="24" />
        </div>
        <button
          onClick={handleTemperatureDecrease}
          className="bg-red-500 p-3 rounded-full transition-all transform hover:scale-110"
        >
          <FaChevronDown size="24" />
        </button>
      </div>
    </div>
  );
};

export default ClimateControlPanel;

