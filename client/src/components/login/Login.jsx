import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthService from "../../api/services/authService";
import LoginForm from "./LoginForm";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      handleSubmit(values, actions);
    },
  });

  const handleSubmit = async (values, actions) => {
    try {
      await login(values);
      setMessage("Login successful");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      setError(error.message);
      console.error(error)
      actions.setSubmitting(false);
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
      setMessage(data.message);

      setTimeout(() => {
        navigate(`/auth/verify-otp?userId=${data.userId}`);
      }, 2000);

      console.log("sendOTP-data", data);
      setError("");
    } catch (error) {
      const errorMsg =
        error.message || "An unexpected error occurred during OTP sending.";
      setError(errorMsg);
    }
  };

  useEffect(() => {
    setError("");
    setMessage("");
  }, [formik.values]);

  return (
    <>
      <LoginForm
        verifyAccount={handleVerifyAccount}
        error={error}
        message={message}
        formik={formik}
      />
    </>
  );
};

export default Login;
