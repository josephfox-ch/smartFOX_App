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

      const data = await HomeService.getHomes();
      const sortedHomes = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setHomes(sortedHomes);

      if (sortedHomes.length > 0) {
        fetchHomeDetails(sortedHomes[0].id);
      } else {
        setSelectedHome(null);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchHomeDetails = async (homeId) => {
    try {
      setLoading(true);
      setError(null);
      const homeDetails = await HomeService.getHomeDetails(homeId);
      setSelectedHome(homeDetails);
      console.log("home-details-fetched", homeDetails);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const selectHome = (homeId) => {
    fetchHomeDetails(homeId);
  };

  useEffect(() => {
    if (user) {
      fetchHomes();
    }
  }, [user]);

  return (
    <HomeContext.Provider
      value={{
        homes,
        selectedHome,
        selectHome,
        fetchHomes,
        fetchHomeDetails,
        loading,
        error,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const useHomes = () => useContext(HomeContext);
