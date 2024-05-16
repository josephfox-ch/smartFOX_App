import React from "react";
import { useHomes } from "../../context/HomeContext";

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
          <div className="flex items-center justify-center  ">
            <select
              className="block appearance text-sm bg-transparent text-white mb-2 p-1 border border-graydark rounded shadow leading-tight focus:outline-none focus:text-foxColor hover:border-indigo-500 focus:border-indigo-500 hover:outline-none duration-300 ease-in-out"
              onChange={handleHomeChange}
              value={selectedHome ? selectedHome.id : ""}
            >
              <option value="">Select home</option>
              {homes.map((home) => (
                <option key={home.id} value={home.id}>
                  {home.name}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeSelector;
