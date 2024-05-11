import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AuthLayout from "./layouts/AuthLayout";
import VerifyAccountPage from "./pages/VerifyAccountPage";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardLayout from "./layouts/DashboardLayout";
import AccountSettingsPage from "./pages/user-panel/AccountSettingsPage";
import PolicyPageRoutes from "./routes/PolicyPageRoutes";
import AdditionalPageRoutes from "./routes/AdditionalPageRoutes";
import ClimatePage from "./pages/climate/ClimatePage";
import AddNewHomePage from "./components/AddNewHome";
import HomePage from "./pages/home/HomePage";

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
      <Route path="/auth/verify-otp" element={<VerifyAccountPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      <Route
        path="/auth/reset-password/:token"
        element={<ResetPasswordPage />}
      />
      {PolicyPageRoutes()}
      {AdditionalPageRoutes()}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="account-settings" element={<AccountSettingsPage />} />
          <Route path="climate" element={<ClimatePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="add-new-home" element={<AddNewHomePage />} />
          {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
