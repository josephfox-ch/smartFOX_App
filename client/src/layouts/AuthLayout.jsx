import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Login from "../components/login/Login"; // LoginForm'u import edin

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 flex-1 flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-12">
        {/* Logo and Slogan */}
        <div className="w-full md:w-1/3 mb-8 md:mb-0 text-center md:text-left flex flex-col items-center md:items-center">
          <Link to="/" className="mb-4">
            <img src="./SFX.png" alt="Logo" className="h-auto w-32 md:w-96" />
          </Link>
          <p className="text-navyBlue font-bold text-sm md:text-base">
            A Gateway to your smart future...
          </p>
        </div>
        <div className="w-full md:max-w-sm">
        {/* LoginForm Component */}
        <Login />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;

