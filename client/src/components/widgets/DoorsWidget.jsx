import React, { useState } from "react";
import { useHomes } from "../../context/HomeContext";
import { FaLock, FaLockOpen } from "react-icons/fa";

const DoorsWidget = () => {
  const { selectedHome } = useHomes();
  const [isOn, setIsOn] = useState(false);

  const handleTogglePower = () => {
    setIsOn(!isOn);
  };
  console.log(
    `Doors Control for home ${selectedHome.name} ${isOn ? "opened" : "closed"}`
  );
  return (
    <div className="bg-whiten  dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 h-full">
      <h3 className="font-medium text-xl mb-4 text-gray-800 dark:text-gray-100">
        Doors
      </h3>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleTogglePower}
          className={`px-4 py-2 rounded  text-white transition-colors ${
            isOn
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {isOn ? <FaLockOpen size="30" /> : <FaLock size="30" />}
        </button>
      </div>
    </div>
  );
};

export default DoorsWidget;
