import React from 'react';
import { useDoors } from '../../context/DoorContext';
import { useHomes } from "../../context/HomeContext";
import {useAlert} from '../../context/AlertContext';
import { FaLock, FaLockOpen } from 'react-icons/fa';

const DoorsWidget = () => {
  const { selectedHome } = useHomes();
  const { doors, toggleAllDoors, mainStatus } = useDoors();
  const { showAlert } = useAlert();

  if (!doors || doors.length === 0) {
    return <div>Loading...</div>;
  }

  const handleToggleAllDoors = async () => {
    await toggleAllDoors();
    if (!mainStatus) {
      showAlert(
        "success",
        "Doors UNLOCKED",
        `All doors have been unlocked for '${selectedHome.name}' home`
      );
    } else {
      showAlert(
        "error",
        "Doors LOCKED",
        `All doors have been locked for '${selectedHome.name}' home `
      );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 h-full">
      <h3 className="font-medium text-xl mb-4 text-gray-800 dark:text-gray-100">
        Doors
      </h3>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleToggleAllDoors}
          className={`px-4 py-2 rounded text-white transition-colors ${
            mainStatus ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {mainStatus ? <FaLockOpen size="30" /> : <FaLock size="30" />}
        </button>
      </div>
    </div>
  );
};

export default React.memo(DoorsWidget);

