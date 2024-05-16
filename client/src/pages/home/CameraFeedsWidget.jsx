import React from 'react';

const CameraFeedsWidget = () => (
  <div className="bg-whiten dark:bg-gray-800 p-6  rounded-lg shadow-md transition-transform transform hover:scale-105 h-full">
    <h3 className="font-medium text-xl mb-4 text-gray-800 dark:text-gray-100">Camera Feeds</h3>
    <div className="grid grid-cols-2 gap-6 p-2">
      <div className="bg-black p-4 rounded-lg shadow-md text-white text-center h-32">
        <img src="https://via.placeholder.com/100" alt="Camera 1" className="mx-auto " />
        Livingroom
      </div>
      <div className="bg-black p-4 rounded-lg shadow-md text-white text-center h-32">
        <img src="https://via.placeholder.com/100" alt="Camera 2" className="mx-auto" />
        Backyard
      </div>
      <div className="bg-black p-4 rounded-lg shadow-md text-white text-center h-32">
        <img src="https://via.placeholder.com/100" alt="Camera 1" className="mx-auto" />
        Corridor
      </div>
      <div className="bg-black p-4 rounded-lg shadow-md text-white text-center h-32">
        <img src="https://via.placeholder.com/100" alt="Camera 2" className="mx-auto" />
        Kitchen
      </div>
    </div>
  </div>
);

export default CameraFeedsWidget;

