import React, { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
import useOutsideClick from "../../hooks/useOutsideClick";
import useKeydown from "../../hooks/useKeydown";
import { useSidebar } from "../../context/SidebarContext";
import TimeDisplay from "./TimeDisplay";
import HomeSelector from "../home/HomeSelector";
import { BsFillHouseAddFill } from "react-icons/bs";
import { FaHouseUser } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen, sidebarExpanded } = useSidebar();
  const sidebarRef = useRef(null);

  useOutsideClick(sidebarRef, () => {
    if (sidebarOpen) setSidebarOpen(false);
  });

  useKeydown(27, () => {
    if (sidebarOpen) setSidebarOpen(false);
  });
  useEffect(() => {
    if (sidebarExpanded) {
      document.body.classList.add("sidebar-expanded");
    } else {
      document.body.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebarRef}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <SidebarHeader />
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        {/* <!--Home Menu --> */}
        <div className="p-4">
          <div className="flex flex-col items-center mb-4 text-bodydark1 hover:text-indigo-500 hover:shadow-lg">
            <NavLink
              to="/dashboard/add-new-home"
              className="flex flex-col items-center text-center"
            >
              <BsFillHouseAddFill size="80" className="cursor-pointer" />
              <span className="mt-2 text-sm">Add New Home</span>
            </NavLink>
          </div>
          {/* <!-- Time Display --> */}
          <TimeDisplay />
          {/* <!-- House Selector --> */}
          <HomeSelector />
        </div>
        {/* <!--Add Device Button --> */}
        <NavLink
          to="/dashboard/my-home"
          className=" font-medium text-bodydark1 duration-300 ease-in-out   mx-4 py-2 mt-1 border border-gray-400 rounded shadow flex items-center justify-center hover:outline-none  hover:ring-indigo-500 hover:border-indigo-500"
        >
          <span className="mr-2">
            <FaHouseUser size="25" />
          </span>
          My Home
        </NavLink>
        {/* <!--Add Device Button --> */}
        <nav className="mt-5 py-2 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <SidebarMenu />
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
