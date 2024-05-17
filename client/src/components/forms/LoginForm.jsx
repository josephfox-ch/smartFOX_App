import React from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { RiAppleFill } from "react-icons/ri";
import { TbFaceId, TbFaceIdError } from "react-icons/tb";

const LoginForm = ({ error, verifyAccount, message, formik }) => {
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white shadow-lg shadow-graydark rounded-lg p-6"
    >
      <h1 className="text-lg  text-navyBlue mb-4 text-center">
        Sign In
      </h1>

      {error && (
        <div className="flex flex-col items-center bg-red-100 text-red-600 text-sm mb-4 text-center shadow-lg border">
          <div className="flex items-center p-1">
            <TbFaceIdError size="20" className="mr-3" />
            <span>{error}</span>

            {error === "User is not yet verified." && (
              <div className="px-2">
                <Link
                  onClick={() =>
                    verifyAccount(formik.values.email, formik.values.password)
                  }
                  className="text-blue-600 hover:underline"
                >
                  Verify Now
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {message && (
        <div className="flex flex-col items-center bg-green-100 text-green-700 text-sm mb-4 text-center shadow-lg border">
          <div className="flex items-center p-1">
            <TbFaceId size="20" className="mr-3" />
            <span>{message}</span>
          </div>
        </div>
      )}

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="mt-1 block w-full px-3 py-2 border border-bodydark rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your email"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-danger text-sm">{formik.errors.email}</div>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="mt-1 block w-full px-3 py-2 border border-bodydark rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="6+ Characters, 1 Capital letter"
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-danger text-sm">{formik.errors.password}</div>
        )}
      </div>

      <div className="text-center mb-4">
        <Link
          className="font-bold text-sm text-blue-600 hover:text-blue-800 hover:underline"
          to="/auth/forgot-password"
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        className="w-full bg-foxColor hover:bg-foxColorHover font-bold text-white py-2 px-4 "
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Signing In..." : "Sign In"}
      </button>

      <div className="flex flex-col mt-4">
        <button className="flex items-center justify-center mb-2 border border-graydark hover:bg-blue-500 hover:text-white font-bold text-black py-2 px-4">
          <FcGoogle size="24" className="mr-2" /> Sign in with Google
        </button>
        <button className="flex items-center justify-center font-bold text-black border border-graydark hover:bg-black hover:text-white py-2 px-4">
          <RiAppleFill size="24" className="mr-2" /> Sign in with Apple
        </button>
      </div>
      <div className="mt-4 text-center">
        <p className="text-foxColor font-bold text-sm">
          Ready to join SmartFOX® Home systems?
        </p>
        <Link
          to="/signup"
          className="font-bold text-sm text-blue-600 hover:text-blue-800 hover:underline"
        >
          <span className=" font-normal">Don't have an account?</span> Sign Up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
