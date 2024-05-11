import React from "react";
import { NavLink } from "react-router-dom";
import { BsFillHouseAddFill } from "react-icons/bs";

function AddNewHomeButton() {
  return (
    <>
      <NavLink
        to="/dashboard/add-new-home"
        className=" font-medium text-bodydark1 duration-300 ease-in-out   mx-4 py-2 mt-1 border border-gray-400  shadow flex items-center justify-center hover:outline-none  hover:ring-indigo-500 hover:border-indigo-500"
      >
        <span className="mr-2">
          <BsFillHouseAddFill size="25" />
        </span>
        Add New Home
      </NavLink>
    </>
  );
}

export default AddNewHomeButton;
