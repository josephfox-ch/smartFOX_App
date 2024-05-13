import React from "react";
import { FaLock, FaLockOpen, FaLightbulb } from 'react-icons/fa';

const Controls = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-gray-100 p-4 rounded shadow dark:bg-gray-800">
      <h3 className="font-medium text-lg mb-3 text-gray-700 dark:text-gray-300">Doors</h3>
      <div className="flex items-center space-x-4">
        <button className="text-green-500"><FaLockOpen size={24} /> Open</button>
        <button className="text-red-500"><FaLock size={24} /> Closed</button>
      </div>
    </div>
    <div className="bg-gray-100 p-4 rounded shadow dark:bg-gray-800">
      <h3 className="font-medium text-lg mb-3 text-gray-700 dark:text-gray-300">Lighting</h3>
      <div className="flex items-center space-x-4">
        <FaLightbulb size={24} className="text-yellow-500" />
        <input type="range" min="0" max="100" className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer" />
      </div>
    </div>
    <div className="bg-gray-100 p-4 rounded shadow dark:bg-gray-800">
      <h3 className="font-medium text-lg mb-3 text-gray-700 dark:text-gray-300">Camera Feeds</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-black p-2 rounded shadow text-white text-center">Camera 1</div>
        <div className="bg-black p-2 rounded shadow text-white text-center">Camera 2</div>
      </div>
    </div>
  </div>
);

export default Controls;

