import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import authService from "../../api/services/authService";
import LoginForm from "./LoginForm";

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const handleLoginSubmit = async (values, actions) => {
    try {
      const data = await authService.login(values);
      console.log("Login-User", data.user);
      dispatch({
        type: "LOGIN",
        payload: {
          user: data.user,
        },
      });
      navigate("/dashboard");
    } catch (error) {
      const errorMsg = error.response?.data.message || "An error occurred";
      if (errorMsg.toLowerCase().includes("password")) {
        actions.setFieldError("password", errorMsg);
      } else if (
        errorMsg.toLowerCase().includes("email") ||
        errorMsg.toLowerCase().includes("user")
      ) {
        actions.setFieldError("email", errorMsg);
      } else {
        actions.setFieldError("general", errorMsg);
      }
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <LoginForm onSubmit={handleLoginSubmit} />
    </>
  );
};

export default Login;
