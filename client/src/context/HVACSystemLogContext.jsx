import React, { createContext, useState, useEffect, useContext } from "react";
import * as hvacSystemLogService from "../api/services/hvacSystemLogService";
import { useHomes } from "./HomeContext";

const HVACSystemLogContext = createContext();

export const HVACSystemLogProvider = ({ children }) => {
  const { selectedHome } = useHomes();
  const [hvacLogs, setHVACLogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedHome) {
      fetchHVACLogs(selectedHome.id);
    }
  }, [selectedHome]);

  const fetchHVACLogs = async (homeId) => {
    try {
      const data = await hvacSystemLogService.getHVACSystemLogByHomeId(homeId);
      setHVACLogs(data);
    } catch (err) {
      setError(err.message);
      setHVACLogs([]); 
    }
  };

  return (
    <HVACSystemLogContext.Provider value={{ hvacLogs, error }}>
      {children}
    </HVACSystemLogContext.Provider>
  );
};

export const useHVACLogs = () => useContext(HVACSystemLogContext);

