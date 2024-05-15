import React, { useState, useEffect } from "react";
import { useHomes } from "../../context/HomeContext";
import Breadcrumb from "../../components/Breadcrumb";
import Dashboard from "./Dashboard";
import ClimaControlWidget from "./ClimaControlWidget";
import { FaEdit, FaTrash } from "react-icons/fa";
import WeatherInfoWidget from "./WeatherInfoWidget";

const MyHomePage = () => {
  const {selectedHome, loading, error } = useHomes();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-auto max-w-9xl">
      <Breadcrumb className="text-foxColor" pageName="My Home" />
      <div className="rounded-sm border border-stroke bg-white shadow-lg p-6 dark:border-strokedark dark:bg-boxdark">
        {selectedHome ? (
          <>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
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
           <WeatherInfoWidget/>
            <Dashboard  />
            <ClimaControlWidget />
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
