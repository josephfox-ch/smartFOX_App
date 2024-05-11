import React from "react";
import { useHomes } from "../../context/HomeContext";
import { IoIosArrowDown } from "react-icons/io";

const HomeSelector = () => {
  const { homes, selectedHome, selectHome, loading, error } = useHomes();

  const handleHomeChange = (event) => {
    selectHome(event.target.value);
  };

  return (
    <div className="relative mx-3 mb-3">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <select
            className="block appearance-none text-sm  bg-transparent text-white  mb-2 p-1 w-full border border-graydark shadow  leading-tight focus:outline-none  hover:border-indigo-500  focus:border-indigo-500 hover:outline-none duration-300 ease-in-out"
            onChange={handleHomeChange}
            value={selectedHome ? selectedHome.id : ""}
          >
            <option value="">Select Home</option>
            {homes.map((home) => (
              <option key={home.id} value={home.id}>
                {home.houseName}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  px-2 text-white">
            <IoIosArrowDown
              size="20"
              className="absolute right-4 top-1/2 -translate-y-1/2 fill-current"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default HomeSelector;
