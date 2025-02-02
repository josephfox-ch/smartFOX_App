import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import AuthService from "../api/services/authService";
import * as UserService from "../api/services/userService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    if (!isAuthenticated) {
      setLoading(false);
      setUser(null);
      return;
    }
    try {
      setLoading(true);
      const response = await AuthService.getUser();
      if (response.user) {
        setUser(response.user);
      } else {
        throw new Error("No user data found");
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updatedFields) => {
    try {
      const response = await UserService.updateUser(updatedFields);
      const updatedUser = response.user;
      setUser((prevUser) => ({
        ...prevUser,
        ...updatedUser,
      }));
    } catch (error) {
      console.error("Failed to update user in context:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [isAuthenticated]);

  return (
    <UserContext.Provider value={{ user, loading, updateUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
