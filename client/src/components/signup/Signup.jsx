import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignupForm from "./SignupForm";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (values, { setSubmitting }) => {
    try {
      console.log("Final Form Values:", values);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Form Submission Success:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Form Submission Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return <SignupForm onSubmit={handleSignup} />;
};

export default Signup;
