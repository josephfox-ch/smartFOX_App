import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import AdditionalPagesFooter from "../components/footers/AdditionalPagesFooter";

const AdditionalPagesLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-2 border-b border-stroke sticky top-0 z-10">
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

      <main className=" overflow-y-auto">
        <Outlet />
      </main>

      <AdditionalPagesFooter />
    </div>
  );
};

export default AdditionalPagesLayout;
