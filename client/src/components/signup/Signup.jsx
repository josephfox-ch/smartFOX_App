import React from "react";
import AuthService from "../../api/services/authService";
import { useNavigate } from "react-router-dom";
import SignupForm from "./SignupForm";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (values, { setSubmitting }) => {
    try {
      console.log("Final Form Values:", values);
      const response = await AuthService.register(values);
      console.log("Form Submission Success:", response);
      navigate(`/verify-otp?userId=${response.userId}`);
    } catch (error) {
      console.error("Form Submission Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return <SignupForm onSubmit={handleSignup} />;
};

export default Signup;
