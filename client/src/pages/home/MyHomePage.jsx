import React, { useState, useEffect } from "react";
import { useHomes } from "../../context/HomeContext";
import Breadcrumb from "../../components/Breadcrumb";
import HomeDashboardHeader from "./HomeDashboardHeader";
import WeatherInfoWidget from "./WeatherInfoWidget";
import EnergyMonitor from "./EnergyMonitor";
import ClimateControlPanel from "./ClimateControlPanel";
import DoorsWidget from "./DoorsWidget";
import LightingWidget from "./LightingWidget";
import CameraFeedsWidget from "./CameraFeedsWidget";

const MyHomePage = () => {
  const { selectedHome, loading, error } = useHomes();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-auto max-w-9xl p-6">
      <Breadcrumb className="text-foxColor" pageName="My Home" />
      <div className="rounded-sm border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark p-6">
        {selectedHome ? (
          <>
            <div className=" mb-3">
              <HomeDashboardHeader />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="md:col-span-1">
                <div className="grid grid-cols-1 gap-6 h-full">
                  <WeatherInfoWidget />
                  <ClimateControlPanel />
                </div>
              </div>
              <EnergyMonitor />
              <CameraFeedsWidget />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DoorsWidget />
              <LightingWidget />
            </div>
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
