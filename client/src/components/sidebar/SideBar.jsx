import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarHeader from './SidebarHeader';
import SidebarMenu from './SidebarMenu';
import TimeDisplay from './TimeDisplay';
import HouseSelector from './HouseSelector';
import useCurrentTime from '../../hooks/useCurrentTime';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const currentTime = useCurrentTime();
  const location = useLocation();
  const { pathname } = location;
  const [houses, setHouses] = useState(["Home 1", "Home 2", "Home 3"]);
  const [selectedHouse, setSelectedHouse] = useState("");

  const handleHouseChange = (event) => {
    setSelectedHouse(event.target.value);
  };

  return (
    <aside
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <SidebarHeader setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <TimeDisplay currentTime={currentTime} />
      <HouseSelector houses={houses} selectedHouse={selectedHouse} handleHouseChange={handleHouseChange} />
      <SidebarMenu pathname={pathname} />
    </aside>
  );
};

export default Sidebar;
