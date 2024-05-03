import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { RiAppleFill } from "react-icons/ri";

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
  acceptEmails: Yup.bool(),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phoneNumber: "",
  acceptTerms: true,
  acceptEmails: true,
};

const SignupForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  console.log(
    "Disabled:",
    !(formik.values.acceptTerms && formik.values.acceptEmails)
  );

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white shadow-lg shadow-graydark rounded-lg p-6 max-w-md mx-auto"
    >
      <h1 className="text-lg font-bold text-navyBlue mb-6 text-center">
        Sign Up
      </h1>
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            placeholder="First Name"
            className="mt-1 block w-full p-1 border border-bodydark rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="text-danger text-xs mt-1">
              {formik.errors.firstName}
            </div>
          )}
        </div>
        <div className="w-full md:w-1/2 px-2">
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            placeholder="Last Name"
            className="mt-1 block w-full p-1 border border-bodydark rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="text-danger text-xs mt-1">
              {formik.errors.lastName}
            </div>
          )}
        </div>
      </div>
      <div className="w-full  mb-4">
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder="Email"
          className="mt-1 block w-full p-1 border border-bodydark rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-danger text-xs mt-1">{formik.errors.email}</div>
        )}
      </div>
      <div className="w-full mb-4">
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="New Password"
          className="mt-1 block w-full p-1 border border-bodydark rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-danger text-xs mt-1">
            {formik.errors.password}
          </div>
        )}
      </div>
      <div className="mb-4">
        <PhoneInput
          international
          countryCallingCodeEditable={false}
          inputStyle={{ width: "100%", border: "1px solid #AEB7C0" }}
          country={"ch"}
          value={formik.values.phoneNumber}
          onChange={(value) => formik.setFieldValue("phoneNumber", value)}
          className="flex mt-1 block w-full shadow-sm rounded  border-bodydark "
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
          <div className="text-danger text-xs mt-1">
            {formik.errors.phoneNumber}
          </div>
        )}
      </div>

      <button
        type="submit"
        className={`w-full bg-success hover:bg-darkSuccess font-bold text-white py-2 px-4 ${
          formik.values ? "" : "opacity-50 cursor-not-allowed"
        }`}
      >
        Create Account
      </button>

      <div className="flex flex-col mt-4 mb-6">
        <button className="flex items-center justify-center mb-2 border border-graydark hover:bg-blue-500 hover:text-white font-bold text-black py-2 px-4">
          <FcGoogle size="24" className="mr-2" /> Sign up with Google
        </button>
        <button className="flex items-center justify-center font-bold text-black border border-graydark hover:bg-black hover:text-white py-2 px-4">
          <RiAppleFill size="24" className="mr-2" /> Sign up with Apple
        </button>
      </div>

      <div style={{ fontSize: "11px" }} className=" text-muted text-graydark">
        By signing up, you agree to the{" "}
        <Link className="login-policy-links" to="/policy/terms">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link className="login-policy-links" to="/policy/privacy">
          Privacy Policy
        </Link>
        , including{" "}
        <Link className="login-policy-links" to="/policy/cookie-use">
          Cookie Use
        </Link>
        .
      </div>

      <div className="mt-4 text-center">
        <Link
          to="/login"
          className="font-bold text-sm text-blue-600 hover:text-blue-800 hover:underline"
        >
          <span className=" font-normal">Already have an account?</span> Sign In
        </Link>
      </div>
    </form>
  );
};

export default SignupForm;
