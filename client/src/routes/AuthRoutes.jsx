import React from "react";
import { Route } from "react-router-dom";
import VerifyAccountPage from "../pages/VerifyAccountPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";

const AuthRoutes = () => {
  return (
    <>
      <Route path="/auth/verify-otp" element={<VerifyAccountPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      <Route
        path="/auth/reset-password/:token"
        element={<ResetPasswordPage />}
      />
    </>
  );
};

export default AuthRoutes;