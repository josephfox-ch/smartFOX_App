import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { useSidebar } from "../../context/SidebarContext";
import { PiThermometerHot } from "react-icons/pi";
import { MdBlindsClosed, MdOutlineForwardToInbox } from "react-icons/md";
import { GiSecurityGate, GiPlantWatering, GiLockedDoor } from "react-icons/gi";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { BsFillGeoFill, BsFillInfoCircleFill } from "react-icons/bs";
import { FaLightbulb, FaVideo, FaChartLine } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";

const SidebarMenu = () => {
  const location = useLocation();
  const { pathname } = location;
  const { sidebarExpanded, setSidebarExpanded } = useSidebar();

  return (
    <>
      <div>
        <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">MENU</h3>
        <ul className="mb-6 flex flex-col gap-1.5">
          {[
            {
              to: "/dashboard/climate",
              label: "Climate",
              icon: <PiThermometerHot size="30" />,
            },
            {
              to: "/dashboard/security-sensors",
              label: "Security & Sensors",
              icon: <GiSecurityGate size="30" />,
            },
            {
              to: "/dashboard/video",
              label: "Video",
              icon: <FaVideo size="27" />,
            },
            {
              to: "/dashboard/lighting",
              label: "Lighting",
              icon: <FaLightbulb size="30" />,
            },
            {
              to: "/dashboard/geofences",
              label: "Geofences",
              icon: <BsFillGeoFill size="30" />,
            },
            {
              to: "/dashboard/home-controllers",
              label: "Home Controllers",
              icon: <GiLockedDoor size="30" />,
            },
            {
              to: "/dashboard/appliances",
              label: "Appliances",
              icon: <CgSmartHomeRefrigerator size="30" />,
            },
            {
              to: "/dashboard/blinds-shades",
              label: "Blinds & Shades",
              icon: <MdBlindsClosed size="30" />,
            },
            {
              to: "/dashboard/irrigations",
              label: "Irrigation",
              icon: <GiPlantWatering size="30" />,
            },
          ].map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 text-bodydark1 duration-300 ease-in-out hover:text-foxColor focus:text-foxColor"
              >
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
          SUPPORT
        </h3>
        <ul className="mb-6 flex flex-col gap-1.5">
          {[
            {
              to: "/dashboard/inbox",
              label: "Inbox",
              icon: <MdOutlineForwardToInbox size="20" />,
              badge: 7,
            },
            {
              to: "/dashboard/invoice",
              label: "Invoice",
              icon: <LiaFileInvoiceDollarSolid size="20" />,
            },
            {
              to: "/dashboard/settings",
              label: "Settings",
              icon: <IoSettingsOutline size="20" />,
            },
          ].map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 text-bodydark1 duration-300 ease-in-out hover:text-foxColor focus:text-foxColor"
              >
                {item.icon}
                {item.label}
                {item.badge && (
                  <span className="absolute right-4 block rounded bg-primary py-1 px-2 text-xs text-white">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
          <SidebarLinkGroup
            activeCondition={pathname.startsWith("/dashboard/statistics")}
          >
            {(handleClick, open) => (
              <>
                <NavLink
                  to="#"
                  className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 text-bodydark1 duration-300 ease-in-out hover:text-foxColor "
                  onClick={(e) => {
                    e.preventDefault();
                    sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                  }}
                >
                  <FaChartLine size="20" />
                  Statistics
                  <IoIosArrowDown
                    size="20"
                    className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </NavLink>
                <div
                  className={`translate transform overflow-hidden ${
                    !open ? "hidden" : ""
                  }`}
                >
                  <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                    {[
                      {
                        to: "/dashboard/statistics/basic-chart",
                        label: "Basic Chart",
                      },
                      {
                        to: "/dashboard/statistics/advanced-chart",
                        label: "Advanced Chart",
                      },
                      {
                        to: "/dashboard/statistics/data-tables",
                        label: "Data Tables",
                      },
                    ].map((item) => (
                      <li key={item.to}>
                        <NavLink
                          to={item.to}
                          className={({ isActive }) =>
                            `group relative flex items-center gap-2.5 rounded-md px-4 text-bodydark2 duration-300 ease-in-out hover:text-foxColor ${
                              isActive && "text-foxColor"
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </SidebarLinkGroup>
        </ul>
      </div>

      <div>
        <ul className="mb-6 flex flex-col gap-1.5">
          <SidebarLinkGroup
            activeCondition={pathname.startsWith("/dashboard/info")}
          >
            {(handleClick, open) => (
              <>
                <NavLink
                  to="/dashboard/info"
                  className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 text-bodydark1 duration-300 ease-in-out hover:text-foxColor "
                  onClick={(e) => {
                    e.preventDefault();
                    sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                  }}
                >
                  <BsFillInfoCircleFill size="20" />
                  Info
                  <IoIosArrowDown
                    size="20"
                    className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </NavLink>
                <div
                  className={`translate transform overflow-hidden ${
                    !open ? "hidden" : ""
                  }`}
                >
                  <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                    {[
                      {
                        to: "/dashboard/info/pricing-tables",
                        label: "Pricing Tables",
                      },
                      { to: "/dashboard/info/faqs", label: "Faq's" },
                      { to: "/dashboard/info/teams", label: "Teams" },
                    ].map((item) => (
                      <li key={item.to}>
                        <NavLink
                          to={item.to}
                          className={({ isActive }) =>
                            `group relative flex items-center gap-2.5 rounded-md px-4 text-bodydark2 duration-300 ease-in-out hover:text-foxColor ${
                              isActive && "text-foxColor"
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </SidebarLinkGroup>
        </ul>
      </div>
      <hr />
    </>
  );
};

export default SidebarMenu;
