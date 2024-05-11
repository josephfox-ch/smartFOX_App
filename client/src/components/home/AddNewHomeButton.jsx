import React from "react";
import { NavLink } from "react-router-dom";
import { BsFillHouseAddFill } from "react-icons/bs";

function AddNewHomeButton() {
  return (
    <>
      <NavLink
        to="/dashboard/add-new-home"
        className=" text-bodydark1 text-sm duration-300 ease-in-out   mx-3 py-2  border border-graydark  shadow flex flex-col items-center justify-center hover:outline-none  hover:ring-indigo-500 hover:border-indigo-500 focus:border-indigo-500"
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
