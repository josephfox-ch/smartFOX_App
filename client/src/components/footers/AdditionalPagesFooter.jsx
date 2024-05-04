import React from "react";
import { NavLink } from "react-router-dom";

const PolicyFooter = () => {
  const activeClassName = "text-red-600 font-bold ";

  return (
    <div className="bg-gray-2  border-t  border-stroke text-black text-center py-4 mt-auto">
      <div className="flex justify-center space-x-4">
        <NavLink
          to="/"
          className="hover:text-red-600 hover:underline transition-colors"
        >
          Home
        </NavLink>

        <NavLink
          to="/add-pages/about-us"
          className={({ isActive }) =>
            isActive
              ? activeClassName
              : "hover:text-red-600 hover:underline transition-colors"
          }
        >
          About Us
        </NavLink>
        <NavLink
          to="/add-pages/contact"
          className={({ isActive }) =>
            isActive
              ? activeClassName
              : "hover:text-red-600 hover:underline transition-colors"
          }
        >
          Contact
        </NavLink>
        <NavLink
          to="/add-pages/support"
          className={({ isActive }) =>
            isActive
              ? activeClassName
              : "hover:text-red-600 hover:underline transition-colors"
          }
        >
          Support
        </NavLink>
        <NavLink
          to="/add-pages/settings"
          className={({ isActive }) =>
            isActive
              ? activeClassName
              : "hover:text-red-600 hover:underline transition-colors"
          }
        >
          Settings
        </NavLink>
      </div>
      <p className="text-sm mt-1">
        SmartFOX® Home Systems &copy; {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default PolicyFooter;
