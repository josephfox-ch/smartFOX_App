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
import GeofencesPage from "../pages/geofences/GeofencesPage";
import HomeControllersPage from "../pages/home-controllers/HomeControllersPage";
import AppliancesPage from "../pages/appliances/AppliancesPage";
import BlindsShadesPage from "../pages/blinds-shades/BlindsShadesPage";
import IrrigationPage from "../pages/irrigation/IrrigationPage";
import InboxPage from "../pages/inbox/InboxPage";
import InvoicePage from "../pages/invoice/InvoicePage";
import SettingsPage from "../pages/settings/SettingsPage";
import BasicCharts from "../pages/statistics/BasicCharts";
import AdvancedCharts from "../pages/statistics/AdvancedCharts";
import DataTables from "../pages/statistics/DataTables";
import PricingTablesPage from "../pages/info/PricingTablesPage";
import FaqsPage from "../pages/info/FaqsPage";
import TeamsPage from "../pages/info/TeamsPage";

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
          <Route path="geofences" element={<GeofencesPage />} />
          <Route path="appliances" element={<AppliancesPage />} />
          <Route path="home-controllers" element={<HomeControllersPage />} />
          <Route path="blinds-shades" element={<BlindsShadesPage />} />
          <Route path="irrigations" element={<IrrigationPage />} />
          <Route path="inbox" element={<InboxPage />} />
          <Route path="invoice" element={<InvoicePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="statistics/basic-chart" element={<BasicCharts />} />
          <Route
            path="statistics/advanced-chart"
            element={<AdvancedCharts />}
          />
          <Route path="statistics/data-tables" element={<DataTables />} />
          <Route path="info/pricing-tables" element={<PricingTablesPage />} />
          <Route path="info/faqs" element={<FaqsPage />} />
          <Route path="info/teams" element={<TeamsPage />} />

          {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
        </Route>
      </Route>
    </>
  );
};

export default DashboardRoutes;
