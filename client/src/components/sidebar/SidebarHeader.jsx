import React, { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useSidebar } from "../../context/SidebarContext";

const SidebarHeader = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const trigger = useRef(null);
  return (
    <div className="flex items-center justify-center gap-2 px-3 py-2 lg:py-2">
      <NavLink to="/">
        <div className="flex items-center text-white text-xl font-bold">
          <img width="70px" src="/SFX.png" alt="Logo" /> SmartFOX® Home
        </div>
      </NavLink>

      <button
        ref={trigger}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-controls="sidebar"
        aria-expanded={sidebarOpen}
        className="block lg:hidden"
      >
        <FaArrowLeft className="text-meta-9" size="20" />
      </button>
    </div>
  );
};

export default SidebarHeader;
