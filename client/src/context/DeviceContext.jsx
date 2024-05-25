import React, { createContext, useState, useEffect, useContext } from "react";
import DeviceService from "../api/services/deviceService";
import { useUser } from "./UserContext";

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const { user } = useUser();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDevices = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await DeviceService.getDevices(user.id);
      setDevices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [user]);

  return (
    <DeviceContext.Provider
      value={{
        devices,
        loading,
        error,
        fetchDevices,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevices = () => useContext(DeviceContext);
