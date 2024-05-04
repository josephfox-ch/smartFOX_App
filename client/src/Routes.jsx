import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import VerifyOTP from "./pages/VerifyOTP";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import PolicyPageLayout from "./layouts/PolicyPageLayout";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./layouts/DashboardLayout";
import AccountSettings from "./pages/AccountSettings";
import TermsOfService from "./pages/policy/TermsOfService";
import PrivacyPolicy from "./pages/policy/PrivacyPolicy";
import CookiePolicy from "./pages/policy/CookiePolicy";
import CookieUse from "./pages/policy/CookieUse";
import AdditionalPagesLayout from "./layouts/AdditionalPagesLayout";
import AboutUsPage from "./pages/additional-pages/AboutUsPage";
import ContactPage from "./pages/additional-pages/ContactPage";
import MarketingPage from "./pages/additional-pages/MarketingPage";
import SupportPage from "./pages/additional-pages/SupportPage";
import SettingsPages from "./pages/additional-pages/SettingsPages";

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
        <Route path="/policy" element={<PolicyPageLayout />}>
          <Route path="terms" element={<TermsOfService />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="cookie-policy" element={<CookiePolicy />} />
          <Route path="cookie-use" element={<CookieUse />} />
        </Route>

        <Route path="/add-pages" element={<AdditionalPagesLayout />}>
          <Route path="about-us" element={<AboutUsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="marketing" element={<MarketingPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="settings" element={<SettingsPages />} />
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
