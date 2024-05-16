import React from "react";

const ClimateControlPanel = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 h-full">
      <h3 className="font-medium text-xl mb-4 text-gray-800 dark:text-gray-100">
        Climate Control
      </h3>
      <div className="flex items-center space-x-4 mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          On
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Off
        </button>
      </div>
      <div className="flex items-center justify-center mb-4">
        <div className="relative w-full">
          <input
            type="range"
            min="0"
            max="30"
            className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          />
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            15°C
          </div>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300">
        <strong>Air Quality:</strong> Good
      </p>
    </div>
  );
};

export default ClimateControlPanel;
