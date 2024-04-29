import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const HouseSelector = () => {
  const [houses, setHouses] = useState(["Home 1", "Home 2", "Home 3"]);
  const [selectedHouse, setSelectedHouse] = useState("");

  const handleHouseChange = (event) => {
    setSelectedHouse(event.target.value);
  };
  return (
    <div className="  relative">
      <select
        className="block appearance-none bg-transparent text-white p-2 w-full border border-gray-600 shadow rounded-md mb-2 leading-tight focus:outline-none focus:bg-graydark focus:border-gray-500"
        onChange={handleHouseChange}
        value={selectedHouse}
      >
        <option value="">Select Home</option>
        {houses.map((house, index) => (
          <option key={index} value={house}>
            {house}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
        <IoIosArrowDown
          size="20"
          className="absolute right-4 top-1/2 -translate-y-1/2 fill-current"
        />
      </div>
    </div>
  );
};

export default HouseSelector;
