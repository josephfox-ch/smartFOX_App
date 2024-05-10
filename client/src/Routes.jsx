import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AuthLayout from "./layouts/AuthLayout";
import VerifyAccountPage from "./pages/VerifyAccountPage";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./layouts/DashboardLayout";
import AccountSettings from "./pages/AccountSettings";
import PolicyPageRoutes from "./routes/PolicyPageRoutes";
import AdditionalPageRoutes from "./routes/AdditionalPageRoutes";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <DashboardLayout /> : <AuthLayout />}
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
          <Route path="account-settings" element={<AccountSettings />} />
          {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
