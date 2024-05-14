import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../api/services/authService";
import { signupValidationSchema } from "../components/forms/validationSchemas";

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

const useSignupFormik = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (values, formikHelpers) => {
    try {
      console.log("Final Form Values:", values);
      const response = await AuthService.register(values);
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
    validationSchema: signupValidationSchema,
    onSubmit: handleSignup,
  });

  useEffect(() => {
    setError("");
    setMessage("");
  }, [formik.values]);

  return { formik, error, message };
};

export default useSignupFormik;
