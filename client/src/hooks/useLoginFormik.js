import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthService from "../api/services/authService";
import { loginValidationSchema } from "../components/forms/validationSchemas";

const initialValues = {
  email: "",
  password: "",
};

const useLoginFormik = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (values, actions) => {
    try {
      await login(values);
      setMessage("Login successful");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      setError(error.message);
      console.error(error);
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

  const formik = useFormik({
    initialValues,
    validationSchema: loginValidationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    setError("");
    setMessage("");
  }, [formik.values]);

  return { formik, error, message, handleVerifyAccount };
};

export default useLoginFormik;
