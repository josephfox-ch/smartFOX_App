import React, { useState, useEffect, useCallback } from "react";
import { useClimate } from "../context/ClimateContext";
import { useEnergy } from "../context/EnergyContext";
import { useWeather } from "../context/WeatherContext";
import LineChart from "./charts/LineChart";
import { FaFire, FaThermometerHalf, FaThermometerThreeQuarters, FaTemperatureLow } from "react-icons/fa";
import { ImFire } from "react-icons/im";

const HEATING_RATE = 0.2; // Rate of increase in water temperature when the boiler is on (°C/second)
const COOLING_RATE = 0.05; // Rate of decrease in water temperature when the boiler is off (°C/second)
const CHECK_INTERVAL = 1000; // Interval for status check (ms)
const TIME_TO_TARGET_WATER = 180; // Time for water temperature to reach the target (seconds)
const TIME_TO_TARGET_INDOOR = 90; // Time for indoor temperature to reach the target (seconds)
const TIME_TO_COOL_INDOOR = 120; // Time for indoor temperature to cool to the target (seconds)

const HeatingSystem = () => {
  const { climateControl } = useClimate();
  const { performCalculations, heatingCurve } = useEnergy();
  const { outdoorTemperature } = useWeather();
  const [boilerStatus, setBoilerStatus] = useState(false);
  const [waterTemperature, setWaterTemperature] = useState(35); // Start at 35°C
  const [indoorTemperature, setIndoorTemperature] = useState(climateControl ? climateControl.currentTemperature : 20);
  const [desiredTemperature, setDesiredTemperature] = useState(climateControl ? climateControl.desiredTemperature : 22);
  const [targetWaterTemperature, setTargetWaterTemperature] = useState(null); // Example target temperature

  useEffect(() => {
    if (climateControl && targetWaterTemperature === null) {
      setDesiredTemperature(climateControl.desiredTemperature);
      setIndoorTemperature(climateControl.currentTemperature);
    }
  }, [climateControl, targetWaterTemperature]);

  useEffect(() => {
    if (climateControl && climateControl.status !== "on") {
      setBoilerStatus(false);
    }
  }, [climateControl]);

  useEffect(() => {
    if (heatingCurve !== null) {
      setTargetWaterTemperature(heatingCurve);
    }
  }, [heatingCurve]);

  const updateWaterTemperature = useCallback(() => {
    setWaterTemperature(prevTemp => {
      if (boilerStatus) {
        const increment = (targetWaterTemperature - prevTemp) / TIME_TO_TARGET_WATER;
        const newTemp = Math.min(prevTemp + increment, targetWaterTemperature);
        return isNaN(newTemp) ? 35 : newTemp;
      } else {
        const newTemp = Math.max(prevTemp - COOLING_RATE, outdoorTemperature);
        return isNaN(newTemp) ? 35 : newTemp;
      }
    });
  }, [boilerStatus, targetWaterTemperature, outdoorTemperature]);

  const updateIndoorTemperature = useCallback(() => {
    setIndoorTemperature(prevTemp => {
      if (boilerStatus) {
        const heatingEffect = (desiredTemperature - prevTemp) / TIME_TO_TARGET_INDOOR;
        let newTemp = prevTemp + heatingEffect;
        if (climateControl.mode === "heating") {
          newTemp = Math.min(newTemp, desiredTemperature); // Prevent exceeding target temperature in heating mode
        } else if (climateControl.mode === "cooling") {
          newTemp = Math.max(newTemp, desiredTemperature); // Prevent dropping below target temperature in cooling mode
        }
        return isNaN(newTemp) ? climateControl.currentTemperature : newTemp;
      } else {
        const coolingEffect = (prevTemp - desiredTemperature) / TIME_TO_COOL_INDOOR;
        const newTemp = prevTemp - coolingEffect;
        return isNaN(newTemp) ? climateControl.currentTemperature : newTemp;
      }
    });
  }, [boilerStatus, desiredTemperature, outdoorTemperature, climateControl]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (climateControl && climateControl.status === "on" && climateControl.mode !== "away") {
        setBoilerStatus(true);
        updateWaterTemperature();
        updateIndoorTemperature();
      } else {
        setBoilerStatus(false);
      }
      performCalculations();
    }, CHECK_INTERVAL);

    return () => clearInterval(intervalId);
  }, [updateWaterTemperature, updateIndoorTemperature, performCalculations, climateControl]);

  useEffect(() => {
    if (climateControl && climateControl.status === "on" && climateControl.mode !== "away") {
      setBoilerStatus(true);
    }
  }, [climateControl]);

  useEffect(() => {
    if (climateControl && targetWaterTemperature !== null) {
      setDesiredTemperature(climateControl.desiredTemperature);
      setIndoorTemperature(climateControl.currentTemperature);
    }
  }, [climateControl, targetWaterTemperature]);

  return (
    <div className="bg-gradient-to-br from-gray-300 to-purple-200 p-8 rounded-lg shadow-lg flex flex-col items-center space-y-6 text-gray-800 transition-transform transform hover:scale-105 h-full">
      <h3 className="text-2xl font-bold mb-4 text-center">SmartFOX® Conditioner</h3>
      <div className="flex flex-col items-center mb-4 space-y-2">
        <div className="flex items-center space-x-2">
          <ImFire size={60} color={boilerStatus ? "orange" : "grey"} />
          <p className="text-xl"><span className="font-semibold"></span></p>
        </div>
        <div className="flex items-center justify-around space-x-2">
          <FaThermometerHalf size={60} color="blue" />
          <p className="text-xl">Water: <span className="font-semibold">{waterTemperature.toFixed(2)}°C</span></p>
        </div>
        <div className="flex items-center justify-around space-x-2">
          <FaThermometerHalf size={60} color="red" />
          <p className="text-xl">Indoor: <span className="font-semibold">{indoorTemperature.toFixed(2)}°C</span></p>
        </div>
      </div>
      <LineChart data={{
        labels: ["Current"],
        datasets: [
          {
            label: "Water Temperature",
            data: [waterTemperature],
            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.2)",
          },
          {
            label: "Indoor Temperature",
            data: [indoorTemperature],
            borderColor: "rgba(153,102,255,1)",
            backgroundColor: "rgba(153,102,255,0.2)",
          }
        ],
      }} options={{
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }} />
    </div>
  );
};

export default HeatingSystem;

