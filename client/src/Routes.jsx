import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import VerifyOTP from "./pages/VerifyOTP";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import PolicyPage from "./pages/PolicyPage";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./layouts/DashboardLayout";
import AccountSettings from "./pages/AccountSettings";
import TermsOfService from "./components/policy/TermsOfService";
import PrivacyPolicy from "./components/policy/PrivacyPolicy";
import CookiePolicy from "./components/policy/CookiePolicy";
import CookieUse from "./components/policy/CookieUse";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthLayout />} />
        <Route path="/login" element={<AuthLayout />} />
        <Route path="/signup" element={<AuthLayout />} />
        <Route path="/auth/verify-otp" element={<VerifyOTP />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/auth/reset-password/:token"
          element={<ResetPasswordPage />}
        />
        <Route path="/policy" element={<PolicyPage />}>
          <Route path="terms" element={<TermsOfService />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="cookie-policy" element={<CookiePolicy />} />
          <Route path="cookie-use" element={<CookieUse />} />
        </Route>

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
