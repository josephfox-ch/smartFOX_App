import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDoors, updateDoor, updateAllDoors } from '../api/services/doorService';
import { useHomes } from './HomeContext';

const DoorContext = createContext();

export const DoorProvider = ({ children }) => {
  const { selectedHome } = useHomes();
  const [doors, setDoors] = useState([]);

  useEffect(() => {
    if (selectedHome) {
      getDoors(selectedHome.id).then(response => setDoors(response.data));
    }
  }, [selectedHome]);

  const toggleDoor = async (doorId, status) => {
    const updatedDoor = await updateDoor(doorId, status);
    setDoors(doors.map(door => (door.id === doorId ? updatedDoor.data : door)));
  };

  const toggleAllDoors = async (status) => {
    const updatedDoors = await updateAllDoors(selectedHome.id, status);
    setDoors(updatedDoors.data);
  };

  return (
    <DoorContext.Provider value={{ doors, toggleDoor, toggleAllDoors }}>
      {children}
    </DoorContext.Provider>
  );
};

export const useDoors = () => useContext(DoorContext);
