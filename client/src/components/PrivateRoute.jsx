import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

const PrivateRoute = ({ children }) => {
  const {
    state: { isAuthenticated },
  } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
