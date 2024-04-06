import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SignupForm from "./SignupForm";

const Signup = ({ changeForm }) => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const handleSignupSubmit = (values, { setSubmitting }) => {
    console.log("Final Form Values:", values);
    if (step < 2) {
      setStep(step + 1);
    } else {
      axios
        .post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Form Submission Success:", response.data);
          navigate("/login");
        })
        .catch((error) => {
          console.error("Form Submission Error:", error);
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  };

  return (
    <SignupForm
      step={step}
      changeForm={changeForm}
      onSubmit={handleSignupSubmit}
    />
  );
};

export default Signup;
