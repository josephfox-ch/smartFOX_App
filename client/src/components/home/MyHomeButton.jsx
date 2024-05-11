import React from "react";
import { NavLink } from "react-router-dom";
import { FaHouseUser } from "react-icons/fa";

function MyHomeButton() {
  return (
    <>
      <div className="flex flex-col items-center mb-4 duration-300 ease-in-out text-bodydark1 hover:text-foxColor ">
        <NavLink
          to="/dashboard/my-home"
          className="flex flex-col items-center text-center focus:text-foxColor"
        >
          <FaHouseUser
            size="80"
            className="cursor-pointer   "
          />
          <span className="mt-2 text-sm">My Home</span>
        </NavLink>
      </div>
    </>
  );
}

export default MyHomeButton;
