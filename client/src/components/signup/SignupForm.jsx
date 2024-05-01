import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Link } from "react-router-dom";

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
    .required("Primary phone number is required"),
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
  acceptTerms: false,
  acceptEmails: false,
};

const SignupForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto"
    >
      <h1 className="text-lg font-bold text-navyBlue mb-6 text-center">
        Sign Up
      </h1>
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            className="mt-1 block w-full p-1 border border-gray-300"
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.firstName}
            </div>
          )}
        </div>
        <div className="w-full md:w-1/2 px-2">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            className="mt-1 block w-full p-1 border border-gray-300"
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.lastName}
            </div>
          )}
        </div>
      </div>
      <div className="w-full  mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="mt-1 block w-full p-1 border border-gray-300"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
        )}
      </div>
      <div className="w-full mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="mt-1 block w-full p-1 border border-gray-300"
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-500 text-xs mt-1">
            {formik.errors.password}
          </div>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="phoneNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Phone Number
        </label>
        <PhoneInput
          international
          countryCallingCodeEditable={false}
          defaultCountry="US"
          value={formik.values.phoneNumber}
          onChange={(value) => formik.setFieldValue("phoneNumber", value)}
          className="flex mt-1 block w-full px-3 py-1 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
          <div className="text-red-500 text-xs mt-1">
            {formik.errors.phoneNumber}
          </div>
        )}
      </div>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="acceptTerms"
          name="acceptTerms"
          onChange={formik.handleChange}
          checked={formik.values.acceptTerms}
          className="mr-2"
        />
        <label
          htmlFor="acceptTerms"
          className="text-sm font-medium text-gray-700"
        >
          I accept the terms and conditions
        </label>
      </div>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="acceptEmails"
          name="acceptEmails"
          onChange={formik.handleChange}
          checked={formik.values.acceptEmails}
          className="mr-2"
        />
        <label
          htmlFor="acceptEmails"
          className="text-sm font-medium text-gray-700"
        >
          I want to receive promotional emails
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-foxColor hover:bg-foxColorHover font-bold text-white py-2 px-4"
        disabled={formik.isSubmitting}
      >
        Create Account
      </button>
      <div className="mt-4 text-center">
        <Link
          to="/login"
          className="font-bold text-blue-600 hover:text-blue-800 hover:underline"
        >
          Already have an account? Sign In
        </Link>
      </div>
    </form>
  );
};

export default SignupForm;
