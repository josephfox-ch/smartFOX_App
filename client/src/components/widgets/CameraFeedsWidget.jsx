import React from 'react';

const CameraFeedsWidget = () => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 h-full">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 p-2">
      {[
        { id: 1, name: 'Livingroom', image: '/livingroom.png' },
        { id: 2, name: 'Kitchen', image: '/kitchen.png' },
        { id: 3, name: 'Corridor', image: '/corridor.png' },
        { id: 4, name: 'Cat', image: '/cat.png' },
        { id: 5, name: 'Backyard', image: '/backyard.png' },
        { id: 6, name: 'Frontyard', image: '/frontyard.png' },
      ].map(camera => (
        <div key={camera.id} className="relative bg-black rounded-lg shadow-md text-black dark:text-gray-300 text-center h-35">
          <img src={camera.image} alt={`${camera.name}`} className="w-full h-35 object-cover rounded-t-lg" />
          <div className="absolute top-0 left-0 bg-red-600 text-white text-xs px-2 py-1 rounded-br-lg">
            Live
          </div>
          <div className="">
            {camera.name}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default CameraFeedsWidget;



