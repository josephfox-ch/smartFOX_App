import React, { createContext, useContext, useState, useEffect } from 'react';
import * as DoorService from '../api/services/doorService';
import { useHomes } from './HomeContext';

const DoorContext = createContext();

export const DoorProvider = ({ children }) => {
  const { selectedHome } = useHomes();
  const [doors, setDoors] = useState([]);
  const [mainStatus, setMainStatus] = useState(null);

  useEffect(() => {
    const fetchDoors = async () => {
      if (selectedHome) {
        try {
          const response = await DoorService.getDoors(selectedHome.id);
          setDoors(response);
        } catch (error) {
          console.error('Error fetching doors:', error);
        }
      }
    };
    
    fetchDoors();
  }, [selectedHome]);

  useEffect(() => {
    if (selectedHome && doors.length > 0) {
      const mainDoor = doors.find(door => door.name === selectedHome.name);
      setMainStatus(mainDoor ? mainDoor.status : null);
    }
  }, [selectedHome, doors]);

  const toggleDoor = async (doorId, status) => {
    try {
      const updatedDoor = await DoorService.updateDoor(doorId, status);
      setDoors(doors.map(door => (door.id === doorId ? updatedDoor : door)));
    } catch (error) {
      console.error('Error updating door status:', error);
    }
  };

  const toggleAllDoors = async () => {
    try {
      const newStatus = !mainStatus;
      const updatedDoors = await DoorService.updateAllDoors(selectedHome.id, newStatus);
      setDoors(updatedDoors);
    } catch (error) {
      console.error('Error updating all doors:', error);
    }
  };

  return (
    <DoorContext.Provider value={{ doors, toggleDoor, toggleAllDoors, mainStatus }}>
      {children}
    </DoorContext.Provider>
  );
};

export const useDoors = () => useContext(DoorContext);

