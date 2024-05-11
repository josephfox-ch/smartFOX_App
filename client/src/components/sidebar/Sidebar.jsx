import React, { useRef, useEffect } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
import useOutsideClick from "../../hooks/useOutsideClick";
import useKeydown from "../../hooks/useKeydown";
import { useSidebar } from "../../context/SidebarContext";
import TimeDisplay from "./TimeDisplay";
import HouseSelector from "./HouseSelector";
import { BsFillHouseAddFill} from "react-icons/bs";
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
          <div className="flex flex-col items-center mb-4 text-bodydark1">
          <BsFillHouseAddFill size='80' />
          </div>
          {/* <!-- Time Display --> */}
          <TimeDisplay />
          {/* <!-- House Selector --> */}
          <HouseSelector />
        </div>
        {/* <!--Add Device Button --> */}
        <button className=" font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 mx-4 py-2 mt-1 border border-gray-400 rounded shadow flex items-center justify-center">
          <span className="mr-2">
            <FiPlusCircle size="25" />
          </span>
          Add Device
        </button>
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
