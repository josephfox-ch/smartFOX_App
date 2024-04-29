import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import useOutsideClick from "../../hooks/useOutsideClick";
import useKeydown from "../../hooks/useKeydown";
import useLocalStorage from "../../hooks/useLocalStorage";
import SidebarLinkGroup from "./SidebarLinkGroup";
import SidebarHeader from "./SidebarHeader";
import TimeDisplay from "./TimeDisplay";
import HouseSelector from "./HouseSelector";
import { PiThermometerHot } from "react-icons/pi";
import { TbTimelineEventExclamation } from "react-icons/tb";
import {
  MdOutlineBrightnessAuto,
  MdAddAlert,
  MdDashboard,
  MdBlindsClosed,
} from "react-icons/md";
import { VscColorMode } from "react-icons/vsc";
import { GiSecurityGate, GiPlantWatering, GiLockedDoor } from "react-icons/gi";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import {
  BsFillGeoFill,
  BsHousesFill,
  BsFillInfoCircleFill,
} from "react-icons/bs";
import { FaLightbulb, FaVideo, FaMobileAlt, FaChartLine } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { HiMiniInboxArrowDown } from "react-icons/hi2";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebarRef = useRef(null);

  const [sidebarExpanded, setSidebarExpanded] = useLocalStorage(
    "sidebar-expanded",
    false
  );

  // Close sidebar on click outside
  useOutsideClick(sidebarRef, () => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  });

  // Close sidebar if the ESC key is pressed
  useKeydown(27, () => setSidebarOpen(false), sidebarOpen);

  // Update local storage and body class on sidebar expanded state change
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
      {/* <!-- SIDEBAR HEADER --> */}
      <SidebarHeader
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
        trigger={trigger}
      />

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}

        {/* <!--Home Menu --> */}
        <div className="p-4">
          <div className="flex flex-col items-center mb-4 text-bodydark1">
            <BsHousesFill size={80} />
          </div>
          {/* <!-- Time Display --> */}
          <TimeDisplay />

          {/* <!-- House Selector --> */}
          <HouseSelector />
        </div>

        {/* <!--Home Menu --> */}

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
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/" || pathname.includes("dashboard")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/" ||
                            pathname.includes("dashboard")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
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
                      {/* <!-- Dropdown Menu Start --> */}
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
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Dashboard --> */}

              <li>
                <NavLink
                  to="/climate"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("climate") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <PiThermometerHot size="30" />
                  Climate
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/security-sensors"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("security-sensors") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <GiSecurityGate size="30" />
                  Security & Sensors
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/video"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("video") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FaVideo size="30" />
                  Video
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/lighting-modules"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("lighting-modules") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FaLightbulb size="30" />
                  Lighting & Modules
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/geofences"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("geofences") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <BsFillGeoFill size="30" />
                  Geofences
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/home-controllers"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("home-controllers") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <GiLockedDoor size="30" />
                  Home Controllers
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/appliances"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("appliances") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <CgSmartHomeRefrigerator size="30" />
                  Appliances
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blinds-shades"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("blinds-shades") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <MdBlindsClosed size="30" />
                  Blinds & Shades
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/irrigations"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("irrigations") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <GiPlantWatering size="30" />
                  Irrigation
                </NavLink>
              </li>
            </ul>
          </div>

          {/* <!-- Support Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              SUPPORT
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Inbox --> */}
              <li>
                <NavLink
                  to="/inbox"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("inbox") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <HiMiniInboxArrowDown size="20" />
                  Inbox
                  <span className="absolute right-4 block rounded bg-primary py-1 px-2 text-xs font-medium text-white">
                    7
                  </span>
                </NavLink>
              </li>
              {/* <!-- Menu Item Inbox --> */}

              {/* <!-- Menu Item Invoice --> */}
              <li>
                <NavLink
                  to="/invoice"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("invoice") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <LiaFileInvoiceDollarSolid size="20" />
                  Invoice
                </NavLink>
              </li>
              {/* <!-- Menu Item Invoice --> */}
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              OTHERS
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Pages --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/pages" || pathname.includes("pages")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/pages" ||
                            pathname.includes("pages")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <BsFillInfoCircleFill size="20" />
                        Info
                        <IoIosArrowDown
                          size="20"
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                        />
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/pages/settings"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Settings
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/pages/pricing-tables"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Pricing Tables
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/pages/faq"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Faq's
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/pages/team"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Teams
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/pages/terms-conditions"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Terms & Conditions
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Pages --> */}

              {/* <!-- Menu Item Chart --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/statistics" || pathname.includes("statistics")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/statistics" ||
                            pathname.includes("statistics")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaChartLine size="20" />
                        Statistics
                        <IoIosArrowDown
                          size="20"
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                        />
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/statistics/basic-chart"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Basic Chart
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/statistics/advanced-chart"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Advanced Chart
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/statistics/data-tables"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Data Tables
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Chart --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
