import React from "react";
import SignupForm from "../forms/SignupForm";
import useSignupFormik from "../../hooks/useSignupFormik";

const Signup = () => {
  const { formik, error, message } = useSignupFormik();

  return <SignupForm error={error} message={message} formik={formik} />;
};

export default Signup;

