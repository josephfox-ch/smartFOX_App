import React, { useEffect, useState } from "react";
import LineChart from "../charts/LineChart";
import { useEnergy } from "../../context/EnergyContext";
import { useClimate } from "../../context/ClimateContext";
import { useHVACLogs } from "../../context/HVACSystemLogContext";
import { useEnergyUsage } from "../../context/EnergyUsageContext";
import { ImFire } from "react-icons/im";

const EnergyMonitor = () => {
  const { heatingCurve, energyBalance, waterFlowTemperature } = useEnergy();
  const { climateControl } = useClimate();
  const { hvacLogs } = useHVACLogs();
  const { energyUsage } = useEnergyUsage();
  const [isClimateControlOn, setIsClimateControlOn] = useState(false);

  useEffect(() => {
    if (climateControl) {
      setIsClimateControlOn(climateControl.status === 'on');
    }
  }, [climateControl]);

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Heating Curve",
        data: Array(12).fill(heatingCurve),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
      {
        label: "Energy Balance",
        data: Array(12).fill(energyBalance),
        borderColor: "rgba(153,102,255,1)",
        backgroundColor: "rgba(153,102,255,0.2)",
      },
      {
        label: "Energy Usage",
        data: energyUsage.map(entry => entry.energyConsumed),
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
          <p><strong>Heating Curve:</strong> {heatingCurve}°C</p>
          <p><strong>Energy Balance:</strong> {energyBalance} Watt</p>
          <p><strong>Water Flow Temperature:</strong> {waterFlowTemperature}°C</p>
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow h-64 w-full">
        <LineChart data={data} options={options} />
      </div>
    </div>
  );
};

export default EnergyMonitor;







