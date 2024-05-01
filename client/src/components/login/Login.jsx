import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthService from "../../api/services/authService";
import LoginForm from "./LoginForm";

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const handleLogin = async (values, actions) => {
    try {
      console.log('values',values)
      const data = await AuthService.login(values);
      if (data.error) {
        throw new Error(data.message || "An error occurred");
      }
      dispatch({
        type: "LOGIN",
        payload: {
          user: data.user,
        },
      });
      navigate("/dashboard");
    } catch (error) {
      const errorMsg = error.message || "An unexpected error occurred";
      if (errorMsg.includes("User is not yet verified")) {
        actions.setFieldError(
          "general",
          <>
            {errorMsg} <Link to="/verify-otp">Verify your account.</Link>
          </>
        );
      } else {
        actions.setFieldError("general", errorMsg);
      }
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <LoginForm onLogin={handleLogin} />
    </>
  );
};

export default Login;

