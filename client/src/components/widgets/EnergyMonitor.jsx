import React from 'react';

const EnergyMonitor = () => {
  return (
    <div className="bg-whiten dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 h-full">
      <h3 className="font-medium text-xl mb-4 text-gray-800 dark:text-gray-100">
        Energy Monitor
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        <strong>Energy Used:</strong> 150 kWh
      </p>
      <div className="mt-4">
        <h4 className="text-gray-700 dark:text-gray-300 mb-2">
          Energy Usage (Weekly)
        </h4>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow h-32">
          {/* Graph Content */}
        </div>
      </div>
    </div>
  );
};

export default EnergyMonitor;




