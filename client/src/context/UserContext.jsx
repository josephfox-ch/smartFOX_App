import React, { createContext, useContext, useState, useEffect } from "react";
import AuthService from "../api/services/authService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await AuthService.getUser();
      console.log('user-context',response)
      setUser(response.user);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
