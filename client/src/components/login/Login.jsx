import React from "react";
import LoginForm from "../forms/LoginForm";
import useLoginFormik from "../../hooks/useLoginFormik";

const Login = () => {
  const { formik, error, message, handleVerifyAccount } = useLoginFormik();

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

