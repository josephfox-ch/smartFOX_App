import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import VerifyOTP from "./pages/VerifyOTP";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPasswordForm from "./components/password/ForgotPasswordForm";
import ResetPasswordForm from "./components/password/ResetPasswordForm";
import PolicyPage from "./pages/PolicyPage";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./layouts/DashboardLayout";
import AccountSettings from './pages/AccountSettings';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthLayout />} />
        <Route path="/login" element={<AuthLayout />} />
        <Route path="/signup" element={<AuthLayout />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
        <Route path="/policy" element={<PolicyPage />} />
        
        <Route
          path="/dashboard"
          element={
            //  <PrivateRoute>
              <DashboardLayout />
            //  </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/account-settings"
          element={
            // <PrivateRoute>
              <DashboardLayout>
                <AccountSettings />
              </DashboardLayout>
            // </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
