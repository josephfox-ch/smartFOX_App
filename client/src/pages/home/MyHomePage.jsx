import React, { useState } from "react";
import { useHomes } from "../../context/HomeContext";
import Breadcrumb from "../../components/Breadcrumb";
import TabMenu from "./TabMenu";
import Dashboard from "./Dashboard";
import Controls from "./Controls";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useWeather } from "../../context/WeatherContext";

const MyHomePage = () => {
  const { homes, selectedHome, loading, error } = useHomes();
  const { outdoorTemperature } = useWeather();
  const [activeTab, setActiveTab] = useState("Living Room");

  const rooms = [
    "Living Room",
    "Bed Room",
    "Kitchen",
    "Child Room",
    "Pantry",
    "Laundry",
    "Bathroom",
    "WC",
    "Backyard",
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-auto max-w-7xl p-4">
      <Breadcrumb className="text-foxColor" pageName="My Home" />
      <div className="rounded-sm border border-stroke bg-white shadow-lg p-6 dark:border-strokedark dark:bg-boxdark">
        {selectedHome ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                {selectedHome.name}
              </h2>
              <div className="flex items-center justify-center space-x-3">
                <button className="flex items-center justify-center p-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                  <FaEdit /> Edit
                </button>
                <button className="flex items-center justify-center p-1 bg-red-500 text-white rounded hover:bg-red-600">
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
            {outdoorTemperature !== null && (
              <p className="mb-4">
                Outdoor Temperature: {outdoorTemperature}°C
              </p>
            )}
            <TabMenu
              rooms={rooms}
              activeTab={activeTab}
              onTabClick={setActiveTab}
            />
            <Dashboard activeTab={activeTab} />
            <Controls />
          </>
        ) : (
          <p className="text-gray-600 dark:text-gray-300">
            Please select a home to view details.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyHomePage;
