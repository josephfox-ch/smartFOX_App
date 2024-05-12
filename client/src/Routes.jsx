import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AuthLayout from "./layouts/AuthLayout";
import AuthRoutes from "./routes/AuthRoutes";
import PolicyPageRoutes from "./routes/PolicyPageRoutes";
import AdditionalPageRoutes from "./routes/AdditionalPageRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";
import NotFoundPage from "./pages/NotFoundPage";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <AuthLayout />
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <AuthLayout />
        }
      />
      <Route
        path="/signup"
        element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <AuthLayout />
        }
      />
      {AuthRoutes()}
      {PolicyPageRoutes()}
      {AdditionalPageRoutes()}
      {DashboardRoutes()}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
