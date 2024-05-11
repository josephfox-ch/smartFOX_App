import React, { createContext, useState, useEffect, useContext } from "react";
import * as HomeService from "../api/services/homeService";
import { useAuth } from "./AuthContext";

const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
  const { user } = useAuth();
  const [homes, setHomes] = useState([]);
  const [selectedHome, setSelectedHome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await HomeService.getHomes();
        const data = await response;
        setHomes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchHomes();
    }
  }, [user]);

  const selectHome = (homeId) => {
    const home = homes.find((h) => h.id === homeId);
    setSelectedHome(home);
  };

  return (
    <HomeContext.Provider
      value={{ homes, selectedHome, selectHome, loading, error }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const useHomes = () => useContext(HomeContext);
