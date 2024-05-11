import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdOutlineBrightnessAuto,
  MdAddAlert,
} from "react-icons/md";
import { VscColorMode } from "react-icons/vsc";
import { FaMobileAlt } from "react-icons/fa";
import { TbTimelineEventExclamation } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import SidebarLinkGroup from "../sidebar/SidebarLinkGroup";
import { useSidebar } from "../../context/SidebarContext";

const MyHomeDashboardMenu = () => {
  const location = useLocation();
  const { pathname } = location;
  const { sidebarExpanded, setSidebarExpanded } = useSidebar();

  return (
    <SidebarLinkGroup
      activeCondition={pathname === "/" || pathname.includes("dashboard")}
    >
      {(handleClick, open) => {
        return (
          <React.Fragment>
            <NavLink
              to="#"
              className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                (pathname === "/" || pathname.includes("dashboard")) &&
                "bg-graydark dark:bg-meta-4"
              }`}
              onClick={(e) => {
                e.preventDefault();
                sidebarExpanded ? handleClick() : setSidebarExpanded(true);
              }}
            >
              <MdDashboard size="28" /> Dashboard
              <IoIosArrowDown
                size="20"
                className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                  open && "rotate-180"
                }`}
              />
            </NavLink>
            <div
              className={`translate transform overflow-hidden ${
                !open && "hidden"
              }`}
            >
              <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                <li>
                  <NavLink
                    to="/dashboard/events"
                    className={({ isActive }) =>
                      "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                      (isActive && "!text-white")
                    }
                  >
                    <TbTimelineEventExclamation size="25" />
                    Events
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/automations"
                    className={({ isActive }) =>
                      "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                      (isActive && "!text-white")
                    }
                  >
                    <MdOutlineBrightnessAuto size="25" /> Automations
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/modes"
                    className={({ isActive }) =>
                      "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                      (isActive && "!text-white")
                    }
                  >
                    <VscColorMode size="24" /> Modes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/alerts"
                    className={({ isActive }) =>
                      "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                      (isActive && "!text-white")
                    }
                  >
                    <MdAddAlert size="25" /> Alerts
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/mobile"
                    className={({ isActive }) =>
                      "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                      (isActive && "!text-white")
                    }
                  >
                    <FaMobileAlt size="24" /> Mobile
                  </NavLink>
                </li>
              </ul>
            </div>
          </React.Fragment>
        );
      }}
    </SidebarLinkGroup>
  );
};

export default MyHomeDashboardMenu;
