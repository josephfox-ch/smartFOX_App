import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import { useAuth } from "./context/AuthContext";
import AuthLayout from "./layouts/AuthLayout";

const AppRoutes = () => {
  const {
    state: { isAuthenticated },
  } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          index
          element={
            !isAuthenticated ? <AuthLayout /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? <AuthLayout /> : <Navigate to="/dashboard" />
          }
        />

        <Route
          path="/signup"
          element={!isAuthenticated ? <AuthLayout /> : <Navigate to="/dashboard" />}
        />

        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
