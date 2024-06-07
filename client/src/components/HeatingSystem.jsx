import React, { useState, useEffect, useCallback } from "react";
import { useClimate } from "../context/ClimateContext";
import { useEnergy } from "../context/EnergyContext";
import { useWeather } from "../context/WeatherContext";
import LineChart from "./charts/LineChart";
import { FaFire, FaThermometerHalf } from "react-icons/fa";
import { ImFire } from "react-icons/im";

const CHECK_INTERVAL = 1000; // Interval for status check (ms)

const HeatingSystem = () => {
  const { climateControl } = useClimate();
  const { performCalculations, heatingCurve,waterTemperatureIncreasePerSecond,indoorTemperatureIncreasePerSecond } = useEnergy();
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
        const newTemp = prevTemp + waterTemperatureIncreasePerSecond;
        return isNaN(newTemp) ? 35 : newTemp;
      }
      return prevTemp;
    });
  }, [boilerStatus]);

  const updateIndoorTemperature = useCallback(() => {
    setIndoorTemperature(prevTemp => {
      if (boilerStatus && prevTemp < desiredTemperature) {
        const newTemp = prevTemp + indoorTemperatureIncreasePerSecond;
        return isNaN(newTemp) ? climateControl.currentTemperature : newTemp;
      }
      return prevTemp;
    });
  }, [boilerStatus]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (climateControl && climateControl.mode !== "away") {
        setBoilerStatus(climateControl.status === "on" && indoorTemperature < desiredTemperature);
        if (boilerStatus) {
          updateWaterTemperature();
          updateIndoorTemperature();
        }
      } else {
        setBoilerStatus(false);
      }
      performCalculations();
    }, CHECK_INTERVAL);

    return () => clearInterval(intervalId);
  }, [updateWaterTemperature, updateIndoorTemperature, performCalculations, climateControl, desiredTemperature, indoorTemperature, boilerStatus]);

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
    <div className="bg-gradient-to-br from-gray-300 to-purple-200 dark:bg-gradient-to-br dark:from-gray-600 dark:to-gray-400 p-8 rounded-lg shadow-lg flex flex-col items-center space-y-6 text-gray-800 dark:text-gray-300 transition-transform transform hover:scale-105 h-full">
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
