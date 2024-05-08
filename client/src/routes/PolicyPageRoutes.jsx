import React from "react";
import { Route } from "react-router-dom";
import PolicyPageLayout from "../layouts/PolicyPageLayout";
import TermsOfService from "../pages/policy/TermsOfService";
import PrivacyPolicy from "../pages/policy/PrivacyPolicy";
import CookiePolicy from "../pages/policy/CookiePolicy";
import CookieUse from "../pages/policy/CookieUse";

const PolicyPageRoutes = () => {
  return (
    <Route path="/policy" element={<PolicyPageLayout />}>
      <Route path="terms" element={<TermsOfService />} />
      <Route path="privacy" element={<PrivacyPolicy />} />
      <Route path="cookie-policy" element={<CookiePolicy />} />
      <Route path="cookie-use" element={<CookieUse />} />
    </Route>
  );
};

export default PolicyPageRoutes;
