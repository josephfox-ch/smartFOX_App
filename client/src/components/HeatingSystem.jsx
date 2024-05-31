import React, { useState, useEffect, useCallback } from "react";
import { useClimate } from "../context/ClimateContext";
import { useEnergy } from "../context/EnergyContext";
import { useWeather } from "../context/WeatherContext";
import LineChart from "./charts/LineChart";

const HEATING_RATE = 0.1; // Rate of increase in water temperature when the boiler is on (°C/second)
const COOLING_RATE = 0.05; // Rate of decrease in water temperature when the boiler is off (°C/second)
const CHECK_INTERVAL = 1000; // Interval for status check (ms)

const HeatingSystem = () => {
  const { climateControl, updateClimateControl } = useClimate();
  const { performCalculations, waterFlowTemperature, setWaterFlowTemperature } = useEnergy();
  const { outdoorTemperature } = useWeather();
  const [boilerStatus, setBoilerStatus] = useState(false);
  const [waterTemperature, setWaterTemperature] = useState(15);
  const [indoorTemperature, setIndoorTemperature] = useState(climateControl ? climateControl.currentTemperature : 20);
  const [desiredTemperature, setDesiredTemperature] = useState(climateControl ? climateControl.desiredTemperature : 22);

  useEffect(() => {
    if (climateControl) {
      setDesiredTemperature(climateControl.desiredTemperature);
      setIndoorTemperature(climateControl.currentTemperature);
    }
  }, [climateControl]);

  // Function that updates the water temperature
  const updateWaterTemperature = useCallback(() => {
    setWaterTemperature(prevTemp => {
      if (boilerStatus) {
        return Math.min(prevTemp + HEATING_RATE, 60);
      } else {
        return Math.max(prevTemp - COOLING_RATE, outdoorTemperature);
      }
    });
  }, [boilerStatus, outdoorTemperature]);

  // Function that calculates indoor temperature and checks the boiler status
  const controlBoiler = useCallback(() => {
    const heatLoss = (indoorTemperature - outdoorTemperature) * 0.1;
    const heatingEffect = boilerStatus ? (waterTemperature - indoorTemperature) * 0.05 : 0;
    const newIndoorTemp = indoorTemperature - heatLoss + heatingEffect;

    setIndoorTemperature(newIndoorTemp);
    updateClimateControl(climateControl.id, { ...climateControl, currentTemperature: newIndoorTemp });

    if (newIndoorTemp < desiredTemperature && !boilerStatus) {
      setBoilerStatus(true);
    } else if (newIndoorTemp >= desiredTemperature && boilerStatus) {
      setBoilerStatus(false);
    }
  }, [boilerStatus, indoorTemperature, outdoorTemperature, waterTemperature, desiredTemperature, climateControl, updateClimateControl]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateWaterTemperature();
      controlBoiler();
      performCalculations();
    }, CHECK_INTERVAL);

    return () => clearInterval(intervalId);
  }, [updateWaterTemperature, controlBoiler, performCalculations]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 h-full">
      <h3 className="font-medium text-xl mb-4 text-gray-800 dark:text-gray-100 text-center">
        Heating System Simulation
      </h3>
      <div className="flex flex-col items-center mb-4">
        <p>Boiler Status: {boilerStatus ? "On" : "Off"}</p>
        <p>Water Temperature: {waterTemperature.toFixed(2)}°C</p>
        <p>Indoor Temperature: {indoorTemperature.toFixed(2)}°C</p>
        <p>Outdoor Temperature: {outdoorTemperature ? outdoorTemperature.toFixed(2) : "N/A"}°C</p>
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
