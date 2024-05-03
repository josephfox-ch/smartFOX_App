import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthService from "../../api/services/authService";
import LoginForm from "./LoginForm";

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuth();
  const [loginError, setLoginError] = useState("");

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
      navigate("/dashboard");
    } catch (error) {
      setLoginError(
        error.message || "An unexpected error occurred during login."
      );
      actions.setFieldError("general", errorMsg);
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <LoginForm onSubmit={handleSubmit} loginError={loginError} />
    </>
  );
};

export default Login;
