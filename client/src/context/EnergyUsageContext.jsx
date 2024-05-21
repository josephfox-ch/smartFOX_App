import React, { createContext, useState, useEffect, useContext } from "react";
import * as energyUsageService from "../api/services/energyUsageService";
import { useHomes } from "./HomeContext";

const EnergyUsageContext = createContext();

export const EnergyUsageProvider = ({ children }) => {
  const { selectedHome } = useHomes();
  const [energyUsage, setEnergyUsage] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedHome) {
      fetchEnergyUsage(selectedHome.id);
    }
  }, [selectedHome]);

  const fetchEnergyUsage = async (homeId) => {
    try {
      const data = await energyUsageService.getEnergyUsageByHomeId(homeId);
      setEnergyUsage(data);
    } catch (err) {
      setError(err.message);
      setEnergyUsage([]); 
    }
  };

  return (
    <EnergyUsageContext.Provider value={{ energyUsage, error }}>
      {children}
    </EnergyUsageContext.Provider>
  );
};

export const useEnergyUsage = () => useContext(EnergyUsageContext);

