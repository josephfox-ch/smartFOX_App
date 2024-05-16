import React, { useState, useEffect } from "react";
import { useHomes } from "../../context/HomeContext";
import Breadcrumb from "../../components/Breadcrumb";
import Dashboard from "./EnergyMonitor";
import ClimaControlWidget from "./ClimaControlWidget";
import WeatherInfoWidget from "./WeatherInfoWidget";
import HomeDashboardButtons from "./HomeDashboardButtons";
import HomeDashboardHeader from "./HomeDashboardHeader";

const MyHomePage = () => {
  const { selectedHome, loading, error } = useHomes();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-auto max-w-9xl">
      <Breadcrumb className="text-foxColor" pageName="My Home" />
      <div className="rounded-sm border border-stroke bg-white shadow-lg p-6 dark:border-strokedark dark:bg-boxdark">
        {selectedHome ? (
          <>
            <HomeDashboardHeader />
            <div className=" items-center mb-6"></div>
            <WeatherInfoWidget />
            <Dashboard />
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
