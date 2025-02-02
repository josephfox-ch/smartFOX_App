import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components/footers/Footer";
import Login from "../components/login/Login";
import Signup from "../components/signup/Signup";

const AuthLayout = () => {
  const [showLogin, setShowLogin] = useState(true);

  const location = useLocation();
  useEffect(() => {
    switch (location.pathname) {
      case "/login":
        setShowLogin(true);
        break;
      case "/signup":
        setShowLogin(false);
        break;
      default:
        setShowLogin(true);
        break;
    }
  }, [location]);

  return (
    <div className="bg-gray-2 min-h-screen flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 flex-1 flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-12">
        <div className="w-full md:w-1/3 mb-8 md:mb-0 text-center md:text-left flex flex-col items-center md:items-center">
          <Link to="/" className="mb-4">
            <img src="./SFX.png" alt="Logo" className="h-auto w-32 md:w-96" />
          </Link>
          <p className="raleway-font text-navyBlue  text-xl ">
            A Gateway to your SmartFOX® Home
          </p>
        </div>
        <div className="w-full md:max-w-sm">
          {showLogin ? <Login /> : <Signup />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
