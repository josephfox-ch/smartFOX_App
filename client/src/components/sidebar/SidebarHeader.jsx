import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const SidebarHeader = ({ setSidebarOpen, sidebarOpen, trigger }) => {
  return (
<div className="flex items-center justify-center gap-2 px-3 py-2 lg:py-2">
        <NavLink to="/dashboard">
          <div className="flex items-center text-white text-xl font-bold">
            <img width="70px" src="./SFX.png" alt="Logo" /> SmartFOX Home®
          </div>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <FaArrowLeft size="20" />
        </button>
      </div>
  );
};

export default SidebarHeader;
