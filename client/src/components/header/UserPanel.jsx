import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import UserAvatar from '../UserAvatar';
import useOutsideClick from "../../hooks/useOutsideClick";

const UserPanel = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { user, loading } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useOutsideClick(dropdownRef, () => {
    if (dropdownOpen) setDropdownOpen(false);
  });

  return (
    <div className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 cursor-pointer"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {user ? `${user.firstName} ${user.lastName}` : ""}
          </span>
          <span className="block text-xs">{user ? user.role : "Guest"}</span>
        </span>
        <UserAvatar />
        {/* <span className="h-12 w-12 rounded-full">
        <img src={(user && user.avatarUrl) ? user.avatarUrl : userOne} alt="User" />

        </span> */}
        <IoIosArrowDown />
      </Link>

      <div
        ref={dropdownRef}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen ? "block" : "hidden"
        }`}
      >
        {/* Dropdown Content */}
        <div className="px-5.5 py-2 border-b border-stroke dark:border-strokedark">
          <h5 className="text-sm font-medium text-bodydark2">
            {user ? user.email : "user@user.com"}
          </h5>
        </div>
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          <li>
            <Link
              to="/profile"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <FaRegUser size="20" /> My Profile
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/account-settings"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <IoSettingsOutline size="22" /> Account Settings
            </Link>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3.5 px-6 py-3 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
        >
          <TbLogout2 size="22" /> Log Out
        </button>
      </div>
    </div>
  );
};

export default UserPanel;
