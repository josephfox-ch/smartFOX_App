import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer/Footer";
import { FcGoogle } from "react-icons/fc";
import { RiAppleFill } from "react-icons/ri";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 flex-1 flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-12">
        {/* Logo and Slogan */}
        <div className="w-full md:w-1/3 mb-8 md:mb-0 text-center md:text-left flex flex-col items-center md:items-center">
          <Link to="/" className="mb-4">
            <img src="./SFX.png" alt="Logo" className="h-auto w-32 md:w-96" />{" "}
            {/* Küçük ekranda w-32, büyük ekranda w-64 genişliğinde */}
          </Link>
          <p className="text-navyBlue font-bold text-sm md:text-base">
            A Gateway to your smart future...
          </p>
        </div>

        {/* Form */}
        <div className="w-full md:max-w-sm">
          <form className="bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-lg font-bold  text-navyBlue mb-4 text-center">
              Sign In
            </h1>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
              />
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
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="6+ Characters, 1 Capital letter"
              />
            </div>
            <div className="text-center mb-4">
              <Link
                className="font-bold text-blue-600 hover:text-blue-800 hover:underline"
                to="/forgot-password"
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-foxColor hover:bg-foxColorHover font-bold text-white py-2 px-4 rounded-md"
            >
              Sign In
            </button>

            <div className="flex flex-col mt-4">
              <button className="flex items-center justify-center mb-2 border border-graydark hover:bg-blue-500 hover:text-white font-bold text-black py-2 px-4 ">
                <FcGoogle size="24" className="mr-2" /> Sign in with Google
              </button>
              <button className="flex items-center justify-center font-bold text-black border border-graydark hover:bg-black hover:text-white py-2 px-4 ">
                <RiAppleFill size="24" className="mr-2" /> Sign in with Apple
              </button>
            </div>
            <p className="mt-4 text-center">
              <p className="text-foxColor text-sm">
                Ready to join SmartFOX® Home systems?
              </p>{" "}
              <Link
                to="/auth/signup"
                className="font-bold text-blue-600 hover:text-blue-800 hover:underline"
              >
                Sign Up
              </Link>
            </p>
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
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
