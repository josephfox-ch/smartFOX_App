import React from "react";
import { NavLink } from "react-router-dom";

const PolicyFooter = () => {
  return (
    <div className="bg-gray-2  border-t  border-stroke text-black text-center py-4 mt-auto">
      <div className="flex justify-center space-x-4">
        <NavLink
          to="/"
          className="hover:text-red-600 hover:underline transition-colors"
        >
          Home
        </NavLink>
      </div>
      <p className="mt-2">
        SmartFOX® Home Systems &copy; {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default PolicyFooter;
