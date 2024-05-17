import React from 'react';
import { FaLightbulb } from 'react-icons/fa';

const LightingWidget = () => (
  <div className="bg-whiten dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 h-full">
    <h3 className="font-medium text-xl mb-4 text-gray-800 dark:text-gray-100">Lighting</h3>
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


