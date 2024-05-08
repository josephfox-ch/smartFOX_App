import React from "react";
import { Route } from "react-router-dom";
import AdditionalPagesLayout from "../layouts/AdditionalPagesLayout";
import AboutUsPage from "../pages/additional-pages/AboutUsPage";
import ContactPage from "../pages/additional-pages/ContactPage";
import MarketingPage from "../pages/additional-pages/MarketingPage";
import SupportPage from "../pages/additional-pages/SupportPage";
import SettingsPages from "../pages/additional-pages/SettingsPages";

const AdditionalPageRoutes = () => {
  return (
    <Route path="/add-pages" element={<AdditionalPagesLayout />}>
      <Route path="about-us" element={<AboutUsPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="marketing" element={<MarketingPage />} />
      <Route path="support" element={<SupportPage />} />
      <Route path="settings" element={<SettingsPages />} />
    </Route>
  );
};

export default AdditionalPageRoutes;
