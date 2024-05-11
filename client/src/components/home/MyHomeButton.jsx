import React from "react";
import { NavLink } from "react-router-dom";
import { FaHouseUser } from "react-icons/fa";

function MyHomeButton() {
  return (
    <>
      <div className="flex flex-col items-center mb-4 text-bodydark1 ">
        <NavLink
          to="/dashboard/my-home"
          className="flex flex-col items-center text-center"
        >
          <FaHouseUser
            size="80"
            className="cursor-pointer hover:text-indigo-500 duration-300 ease-in-out  focus:indigo-500 "
          />
          <span className="mt-2 text-sm">My Home</span>
        </NavLink>
      </div>
    </>
  );
}

export default MyHomeButton;
