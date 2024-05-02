import React from "react";
import { Link } from "react-router-dom";

const PolicyFooter = () => {
  return (
    <div className="bg-gray-100  border-t  border-red-600 text-black text-center py-4 mt-auto">
      <div className="flex justify-center space-x-4">
        <Link
          to="/"
          className="hover:text-red-600 hover:underline transition-colors"
        >
          Home
        </Link>
        <Link
          to="/contact"
          className="hover:text-red-600 hover:underline transition-colors"
        >
          Contact
        </Link>
      </div>
      <p className="mt-2">
        SmartFOX® Home Systems &copy; {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default PolicyFooter;
