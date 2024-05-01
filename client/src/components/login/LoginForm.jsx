import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { RiAppleFill } from "react-icons/ri";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .required("Required"),
});

const LoginForm = ({ onLogin }) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={(values, actions) => {
        onLogin(values, actions);
        actions.setSubmitting(false);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-lg font-bold text-navyBlue mb-4 text-center">
            Sign In
          </h1>

          {/* Email input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Field type="email" name="email" id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email" />
            {touched.email && errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
          </div>

          {/* Password input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Field type="password" name="password" id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="6+ Characters, 1 Capital letter" />
            {touched.password && errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
          </div>

          {/* Forgot password link */}
          <div className="text-center mb-4">
            <Link className="font-bold text-blue-600 hover:text-blue-800 hover:underline" to="/forgot-password">
              Forgot password?
            </Link>
          </div>

          {/* Submit button */}
          <button type="submit" className="w-full bg-foxColor hover:bg-foxColorHover font-bold text-white py-2 px-4 rounded-md" disabled={isSubmitting}>
            Sign In
          </button>

          {/* Social login buttons */}
          <div className="flex flex-col mt-4">
            <button className="flex items-center justify-center mb-2 border border-graydark hover:bg-blue-500 hover:text-white font-bold text-black py-2 px-4 ">
              <FcGoogle size="24" className="mr-2" /> Sign in with Google
            </button>
            <button className="flex items-center justify-center font-bold text-black border border-graydark hover:bg-black hover:text-white py-2 px-4 ">
              <RiAppleFill size="24" className="mr-2" /> Sign in with Apple
            </button>
          </div>
          {/* Signup link */}
          <div className="mt-4 text-center">
            <p className="text-foxColor text-sm">
              Ready to join SmartFOX® Home systems?
            </p>
            <Link to="/signup" className="font-bold text-blue-600 hover:text-blue-800 hover:underline">
              Sign Up
            </Link>
          </div>
          <hr className="my-2" />
          <small style={{ fontSize: "13px" }} className="text-muted ">
            By signing up, you agree to the{" "}
            <Link className="login-policy-links" to="/policy?tab=terms">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link className="login-policy-links" to="/policy?tab=privacy">
              Privacy Policy
            </Link>
            , including{" "}
            <Link className="login-policy-links" to="/policy?tab=cookieUse">
              Cookie Use
            </Link>
            .
          </small>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;


