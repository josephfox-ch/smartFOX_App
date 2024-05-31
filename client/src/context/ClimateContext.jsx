import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import ClimateService from '../api/services/climateService'; 
import { useHomes } from './HomeContext'; 

const ClimateContext = createContext();

export const ClimateProvider = ({ children }) => {
  const { selectedHome } = useHomes();
  const [climateControl, setClimateControl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClimateControl = useCallback(async (homeId) => {
    try {
      setLoading(true);
      const data = await ClimateService.getClimateControlByHomeId(homeId);
      setClimateControl(data);
      console.log('climate-control-fetched', data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedHome) {
      fetchClimateControl(selectedHome.id);
    }
  }, [selectedHome, fetchClimateControl]);

  const updateClimateControl = async (id, updatedControl) => {
    try {
      const updated = await ClimateService.updateClimateControl(id, updatedControl);
      setClimateControl(updated);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ClimateContext.Provider
      value={{
        climateControl,
        loading,
        error,
        updateClimateControl,
      }}
    >
      {children}
    </ClimateContext.Provider>
  );
};

export const useClimate = () => useContext(ClimateContext);