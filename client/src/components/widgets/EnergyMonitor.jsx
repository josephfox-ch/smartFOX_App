import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useEnergy } from '../../context/EnergyContext';

Chart.register(...registerables);

const EnergyMonitor = () => {
  const { heatingCurve, energyBalance } = useEnergy();

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Heating Curve',
        data: Array(12).fill(heatingCurve), 
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
      {
        label: 'Energy Balance',
        data: Array(12).fill(energyBalance), 
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
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
      <h3 className="font-medium text-xl mb-4 text-gray-800 dark:text-gray-100">
        Energy Monitor
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        <strong>Heating Curve:</strong> {heatingCurve} <br />
        <strong>Energy Balance:</strong> {energyBalance}
      </p>
      <div className="mt-4">
        <h4 className="text-gray-700 dark:text-gray-300 mb-2">
          Energy Usage (Weekly)
        </h4>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow h-64">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default EnergyMonitor;






