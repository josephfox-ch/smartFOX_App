import React, { useEffect, useState } from "react";
import LineChart from "../charts/LineChart";
import { useEnergy } from "../../context/EnergyContext";
import { useClimate } from "../../context/ClimateContext";
import { ImFire } from "react-icons/im";
import { FaThermometerHalf } from "react-icons/fa";
import { GiElectric } from "react-icons/gi";

const EnergyMonitor = () => {
  const { energyRequirementToTarget, heatingCurve, waterFlowTemperature, energyBalance, fuelConsumptionToTarget, performCalculations } = useEnergy();
  const { climateControl } = useClimate();
  const [isClimateControlOn, setIsClimateControlOn] = useState(false);

  useEffect(() => {
    if (climateControl) {
      setIsClimateControlOn(climateControl.status === 'on');
      performCalculations();
    }
  }, [climateControl, performCalculations]);

  const formatNumber = (num) => {
    if (num !== "N/A" && !isNaN(num)) {
      const formatted = parseFloat(num).toFixed(3);
      return formatted.endsWith("00") ? parseFloat(num).toFixed(1) : formatted;
    }
    return num;
  };

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Energy Requirement to Target",
        data: Array(12).fill(energyRequirementToTarget !== "N/A" ? formatNumber(energyRequirementToTarget) : null),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
      {
        label: "Heating Curve",
        data: Array(12).fill(heatingCurve !== "N/A" ? formatNumber(heatingCurve) : null),
        borderColor: "rgba(153,102,255,1)",
        backgroundColor: "rgba(153,102,255,0.2)",
      },
      {
        label: "Current Water Temperature",
        data: Array(12).fill(waterFlowTemperature !== "N/A" ? formatNumber(waterFlowTemperature) : null),
        borderColor: "rgba(255,206,86,1)",
        backgroundColor: "rgba(255,206,86,0.2)",
      },
      {
        label: "Energy Balance",
        data: Array(12).fill(energyBalance !== "N/A" ? formatNumber(energyBalance) : null),
        borderColor: "rgba(54,162,235,1)",
        backgroundColor: "rgba(54,162,235,0.2)",
      },
      {
        label: "Fuel Consumption to Target",
        data: Array(12).fill(fuelConsumptionToTarget !== "N/A" ? formatNumber(fuelConsumptionToTarget) : null),
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 h-full">
      <h3 className="font-medium text-xl mb-4 text-gray-800 dark:text-gray-100 text-center">
        Energy Monitor
      </h3>
      <div className="flex flex-col items-center mb-4">
        <ImFire color={isClimateControlOn ? "orange" : "gray"} size="50" className="mb-2" />
        <div className="text-center text-gray-600 dark:text-gray-300">
          <p><strong>Energy Requirement to Target:</strong> {energyRequirementToTarget !== "N/A" ? `${formatNumber(energyRequirementToTarget)} Wh` : "N/A"}</p>
          <p><strong>Heating Curve:</strong> {heatingCurve !== "N/A" ? `${formatNumber(heatingCurve)}°C` : "N/A"}</p>
          <p><strong>Current Water Temperature:</strong> {waterFlowTemperature !== "N/A" ? `${formatNumber(waterFlowTemperature)}°C` : "N/A"}</p>
          <p><strong>Energy Balance:</strong> {energyBalance !== "N/A" ? `${formatNumber(energyBalance)} Wh` : "N/A"}</p>
          <p><strong>Fuel Consumption to Target:</strong> {fuelConsumptionToTarget !== "N/A" ? `${formatNumber(fuelConsumptionToTarget)} units` : "N/A"}</p>
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow h-64 w-full">
        <LineChart data={data} options={options} />
      </div>
    </div>
  );
};

export default EnergyMonitor;








