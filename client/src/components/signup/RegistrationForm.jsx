import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  confirmEmail: Yup.string()
    .oneOf([Yup.ref("email"), null], "Emails must match")
    .required("Confirm email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  securityQuestion: Yup.string().required("Security question is required"),
  securityAnswer: Yup.string().required("Security answer is required"),
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
  confirmEmail: "",
  password: "",
  confirmPassword: "",
  securityQuestion: "",
  securityAnswer: "",
  phoneNumber: "",
  acceptTerms: false,
  acceptEmails: false,
};

const RegistrationForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-lg font-semibold text-center mb-6">
        Contact Information
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {Object.keys(initialValues).map((key) => (
          <div key={key}>
            {["acceptTerms", "acceptEmails"].includes(key) ? (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={key}
                  name={key}
                  onChange={formik.handleChange}
                  checked={formik.values[key]}
                  className="mr-2"
                />
                <label
                  htmlFor={key}
                  className="text-sm font-medium text-gray-700"
                >
                  {key === "acceptTerms"
                    ? "I accept the terms and conditions"
                    : "I want to receive promotional emails"}
                </label>
              </div>
            ) : key === "phoneNumber" ? (
              <div>
                <label
                  htmlFor={key}
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="US"
                  value={formik.values[key]}
                  onChange={(value) => formik.setFieldValue(key, value)}
                  className="mt-1 block w-full"
                />
              </div>
            ) : (
              <div>
                <label
                  htmlFor={key}
                  className="block text-sm font-medium text-gray-700"
                >
                  {key.charAt(0).toUpperCase() +
                    key
                      .slice(1)
                      .replace(/([A-Z])/g, " $1")
                      .trim()}
                  {["email", "confirmEmail", "password", "confirmPassword", "securityAnswer"].includes(key) ? " *" : ""}
                </label>
                <input
                  id={key}
                  name={key}
                  type={
                    ["email", "confirmEmail"].includes(key)
                      ? "email"
                      : ["password", "confirmPassword", "securityAnswer"].includes(key)
                      ? "password"
                      : "text"
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[key]}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {formik.touched[key] && formik.errors[key] && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors[key]}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={formik.isSubmitting}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;

