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

  const fetchHomes = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await HomeService.getHomes();
      const data = await response;

     
      const sortedHomes = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setHomes(sortedHomes);

      
      if (sortedHomes.length > 0) {
        setSelectedHome(sortedHomes[0]);
      }

      console.log("homes-fetched", sortedHomes);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const selectHome = (homeId) => {
    const home = homes.find((h) => h.id === homeId);
    setSelectedHome(home);
  };

  useEffect(() => {
    if (user) {
      fetchHomes();
    }
  }, [user]);

  useEffect(() => {
    if (homes.length > 0 && !selectedHome) {
      setSelectedHome(homes[0]);
    }
  }, [homes]);

  return (
    <HomeContext.Provider
      value={{ homes, selectedHome, selectHome, fetchHomes, loading, error }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const useHomes = () => useContext(HomeContext);


