import React from 'react';
import { FaLock, FaLockOpen } from 'react-icons/fa';

const DoorsWidget = () => (
  <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 h-full">
    <h3 className="font-medium text-xl mb-4 text-gray-800 dark:text-gray-100">Doors</h3>
    <div className="flex items-center space-x-4">
      <button className="flex items-center text-green-500 hover:text-green-600">
        <FaLockOpen size={24} className="mr-2" /> Open
      </button>
      <button className="flex items-center text-red-500 hover:text-red-600">
        <FaLock size={24} className="mr-2" /> Closed
      </button>
    </div>
  </div>
);

export default DoorsWidget;


