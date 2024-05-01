import React from "react";
import AuthService from "../../api/services/authService";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (values, formikHelpers) => {
    try {
      console.log("Final Form Values:", values);
      const response = await AuthService.register(values);
      console.log("Form Submission Success:", response);
      navigate(`/verify-otp?userId=${response.userId}`);
    } catch (error) {
      console.error("Form Submission Error:", error);
      formikHelpers.setFieldError(
        "general",
        "An error occurred during registration."
      );
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  return <RegistrationForm onSubmit={handleSignup} />;
};

export default Signup;
