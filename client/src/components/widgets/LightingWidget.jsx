import React from 'react';
import { FaLightbulb } from 'react-icons/fa';

const LightingWidget = () => (
  <div className="bg-gradient-to-br from-gray-100 to-gray-300 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-400 p-3 rounded-lg shadow-lg  items-center space-y-6 text-gray-800 transition-transform transform hover:scale-105 h-full">
    <h3 className="font-medium text-xl mb-4 text-gray-800 dark:text-gray-300">Lighting</h3>
    <div className="flex items-center space-x-4">
      <FaLightbulb size={24} className="text-yellow-500" />
      <input
        type="range"
        min="0"
        max="100"
        className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  </div>
);

export default LightingWidget;


