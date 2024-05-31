import React, { useEffect, useState } from "react";
import LineChart from "../charts/LineChart";
import { useEnergy } from "../../context/EnergyContext";
import { useClimate } from "../../context/ClimateContext";
import { formatNumber } from "../../utils/utils";
import { BsFillLightningChargeFill } from "react-icons/bs";

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
    <div className="bg-gradient-to-br from-gray-100 to-orange-300 dark:bg-gradient-to-br dark:from-gray-600 dark:to-gray-400  p-8 rounded-lg shadow-lg flex flex-col items-center space-y-6 text-gray-800 dark:text-gray-100 transition-transform transform hover:scale-105  h-full">
      <h3 className="text-2xl font-bold mb-4 text-center mb-4 text-gray-800 dark:text-gray-100 text-center ">
        Energy Monitor
      </h3>
      <div className="flex flex-col items-center mb-4">
        <BsFillLightningChargeFill color={isClimateControlOn ? "orange" : "gray"} size="50" className="mb-2" />
        <div className="text-center text-gray-700 dark:text-gray-300">
          <p><strong>Energy Requirement to Target:</strong> {energyRequirementToTarget !== "N/A" ? `${formatNumber(energyRequirementToTarget)} Wh` : "N/A"}</p>
          <p><strong>Heating Curve:</strong> {heatingCurve !== "N/A" ? `${formatNumber(heatingCurve)}°C` : "N/A"}</p>
          <p><strong>Current Water Temperature:</strong> {waterFlowTemperature !== "N/A" ? `${formatNumber(waterFlowTemperature)}°C` : "N/A"}</p>
          <p><strong>Energy Balance:</strong> {energyBalance !== "N/A" ? `${formatNumber(energyBalance)} Wh` : "N/A"}</p>
          <p><strong>Fuel Consumption to Target:</strong> {fuelConsumptionToTarget !== "N/A" ? `${formatNumber(fuelConsumptionToTarget)} units` : "N/A"}</p>
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-700   p-4 rounded shadow h-64 w-full">
        <LineChart data={data} options={options} />
      </div>
    </div>
  );
};

export default EnergyMonitor;









