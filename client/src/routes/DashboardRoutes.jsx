import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AccountSettingsPage from "../pages/user-panel/AccountSettingsPage";
import MyHomePage from "../pages/home/MyHomePage";
import AddNewHomePage from "../pages/home/AddNewHomePage";
import ClimatePage from "../pages/climate/ClimatePage";
import LightingPage from "../pages/lighting/LightingPage";
import SecuritySensorsPage from "../pages/security-sensors/SecuritySensorsPage";
import VideoPage from "../pages/video-page/VideoPage";



const DashboardRoutes = () => {
  return (
    <>
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="account-settings" element={<AccountSettingsPage />} />
          <Route path="my-home" element={<MyHomePage />} />
          <Route path="add-new-home" element={<AddNewHomePage />} />
          <Route path="climate" element={<ClimatePage />} />
          <Route path="lighting" element={<LightingPage />} />
          <Route path="security-sensors" element={<SecuritySensorsPage />} />
          <Route path="video" element={<VideoPage />} />
          {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
        </Route>
      </Route>
    </>
  );
};

export default DashboardRoutes;
