import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthService from "../../api/services/authService";
import LoginForm from "./LoginForm";

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuth();
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (values, actions) => {
    try {
      const data = await AuthService.login(values);
      if (data.error) {
        throw new Error(data.message || "An error occurred during login.");
      }
      dispatch({
        type: "LOGIN",
        payload: { user: data.user },
      });

      setSuccessMessage(data.message);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      const errorMsg =
        error.message || "An unexpected error occurred during login.";
      setLoginError(errorMsg);
      actions && actions.setSubmitting(false);
    }
  };

  const handleVerifyAccount = async (email) => {
    try {
      const data = await AuthService.sendOTP(email);
      if (!data.success) {
        throw new Error(
          data.message || "An error occurred during OTP sending."
        );
      }
      setSuccessMessage(data.message);

      setTimeout(() => {
        navigate(`/auth/verify-otp?userId=${data.userId}`);
      }, 2000);

      console.log("sendOTP-data", data);
      setLoginError("");
    } catch (error) {
      const errorMsg =
        error.message || "An unexpected error occurred during OTP sending.";
      setLoginError(errorMsg);
    }
  };
  return (
    <>
      <LoginForm
        verifyAccount={handleVerifyAccount}
        onSubmit={handleSubmit}
        loginError={loginError}
        successMessage={successMessage}
      />
    </>
  );
};

export default Login;
