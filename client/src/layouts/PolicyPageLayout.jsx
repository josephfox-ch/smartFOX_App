import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import PolicyFooter from "../components/footers/PolicyFooter";

const PolicyPageLayout = () => {
  const activeClassName = "text-red-600 font-bold";

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-2 border-b border-red-600 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center space-x-4">
            <NavLink to="/">
              <img className="w-12 h-12" src="/SFX.png" alt="Logo" />
            </NavLink>

            <div>
              <h3 className="text-xl font-semibold">SmartFOX® Home Systems</h3>
              <p className="text-sm">A Gateway to your smart future...</p>
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-grow overflow-hidden">
        <aside className="w-1/4 bg-white shadow-md overflow-y-auto">
          <div className="flex items-end flex-col space-y-6 p-4">
            <NavLink
              to="/policy/terms"
              className={({ isActive }) =>
                isActive ? activeClassName : " text-gray-600"
              }
            >
              Terms of Service
            </NavLink>
            <NavLink
              to="/policy/privacy"
              className={({ isActive }) =>
                isActive ? activeClassName : "  text-gray-600"
              }
            >
              Privacy Policy
            </NavLink>
            <NavLink
              to="/policy/cookie-policy"
              className={({ isActive }) =>
                isActive ? activeClassName : " text-gray-600"
              }
            >
              Cookie Policy
            </NavLink>
            <NavLink
              to="/policy/cookie-use"
              className={({ isActive }) =>
                isActive ? activeClassName : " text-gray-600"
              }
            >
              Cookie Use
            </NavLink>
          </div>
        </aside>
        <main className="w-3/4 p-4  overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <PolicyFooter />
    </div>
  );
};

export default PolicyPageLayout;
