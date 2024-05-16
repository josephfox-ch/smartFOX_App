import React from "react";
import { useHomes } from "../../context/HomeContext";
import HomeDashboardButtons from "./HomeDashboardButtons";
import { FcHome } from "react-icons/fc";

function HomeDashboardHeader() {
  const { selectedHome } = useHomes();
  return (
    <div className="flex justify-between">
      <div className="flex gap-2 items-center">
        <FcHome size='30'/>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          {selectedHome.name}
        </h2>
      </div>

      <HomeDashboardButtons />
    </div>
  );
}

export default HomeDashboardHeader;
