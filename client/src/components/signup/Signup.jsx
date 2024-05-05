import React, { useState, useEffect } from "react";
import AuthService from "../../api/services/authService";
import { useNavigate } from "react-router-dom";
import SignupForm from "./SignupForm";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .required("Password is required"),
  phoneNumber: Yup.string()
    .matches(/^\+?[0-9]{10,14}$/, "Invalid phone number")
    .notRequired(),
  acceptTerms: Yup.bool().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
  acceptCookies: Yup.bool(),
  acceptEmails: Yup.bool(),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phoneNumber: "",
  acceptTerms: true,
  acceptEmails: false,
  acceptCookies: true,
};

const Signup = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (values, formikHelpers) => {
    try {
      console.log("Final Form Values:", values);
      const response = await AuthService.register(values);
      console.log("Register response:", response);
      setMessage(response.message);

      setTimeout(() => {
        navigate(`/auth/verify-otp?userId=${response.userId}`);
      }, 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSignup,
  });

  useEffect(() => {
    setError("");
    setMessage("");
  }, [formik.values]);

  return <SignupForm error={error} message={message} formik={formik} />;
};

export default Signup;
