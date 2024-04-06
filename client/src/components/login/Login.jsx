import React from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axiosWithAuth from "../../utils/axiosWithAuth";
import LoginForm from "./LoginForm";

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const handleLoginSubmit = (values, actions) => {
    axiosWithAuth()
      .post("/auth/login", values)
      .then((response) => {
        dispatch({
          type: "LOGIN",
          payload: {
            user: response.data.user,
            token: response.data.token,
          },
        });
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorMsg = error.response.data.message;
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
      });
  };

  return (
    <>
      <LoginForm  onSubmit={handleLoginSubmit} />
    </>
  );
};

export default Login;

