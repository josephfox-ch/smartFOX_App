import React, { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
import useOutsideClick from "../../hooks/useOutsideClick";
import useKeydown from "../../hooks/useKeydown";
import { useSidebar } from "../../context/SidebarContext";
import TimeDisplay from "./TimeDisplay";
import HomeSelector from "./home/HomeSelector";
import MyHomeButton from "./home/MyHomeButton";
import AddNewHomeButton from "./home/AddNewHomeButton";

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
      <div className="">
        {/* <!-- Time Display --> */}
        <TimeDisplay />
        {/* <!--My Home Button --> */}
        <MyHomeButton />
        {/* <!-- House Selector --> */}
        <HomeSelector />
        {/* <!--Add New Home Button --> */}
        <AddNewHomeButton />
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
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
