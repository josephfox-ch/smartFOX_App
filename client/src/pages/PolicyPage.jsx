import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TermsOfService from "../components/policy/TermsOfService";
import PrivacyPolicy from "../components/policy/PrivacyPolicy";
import CookiePolicy from "../components/policy/CookiePolicy";
import CookieUse from "../components/policy/CookieUse";
import PolicyFooter from "../components/policy/PolicyFooter";

const PolicyPage = () => {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(
    new URLSearchParams(location.search).get("tab") || "terms"
  );

  useEffect(() => {
    const tab = new URLSearchParams(location.search).get("tab");
    if (tab) setSelectedTab(tab);
  }, [location]);

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-100 border-b sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center space-x-4">
            <img className="w-12 h-12" src="/SFX.png" alt="Logo" />
            <div>
              <h3 className="text-xl font-semibold">SmartFOX® Home Systems</h3>
              <p className="text-sm">Gateway to your smart future...</p>
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-grow overflow-hidden">
        <aside className=" w-1/4 bg-white shadow-md overflow-y-auto ">
          <div className="flex flex-col space-y-2 p-4">
            <button
              onClick={() => setSelectedTab("terms")}
              className={`text-left p-2 ${
                selectedTab === "terms"
                  ? "text-blue-600 font-bold"
                  : "text-gray-600"
              }`}
            >
              Terms of Service
            </button>
            <button
              onClick={() => setSelectedTab("privacy")}
              className={`text-left p-2 ${
                selectedTab === "privacy"
                  ? "text-blue-600 font-bold"
                  : "text-gray-600"
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setSelectedTab("cookiePolicy")}
              className={`text-left p-2 ${
                selectedTab === "cookiePolicy"
                  ? "text-blue-600 font-bold"
                  : "text-gray-600"
              }`}
            >
              Cookie Policy
            </button>
            <button
              onClick={() => setSelectedTab("cookieUse")}
              className={`text-left p-2 ${
                selectedTab === "cookieUse"
                  ? "text-blue-600 font-bold"
                  : "text-gray-600"
              }`}
            >
              Cookie Use
            </button>
          </div>
        </aside>
        <main className=" w-3/4 p-4 overflow-y-auto">
          {selectedTab === "terms" && <TermsOfService />}
          {selectedTab === "privacy" && <PrivacyPolicy />}
          {selectedTab === "cookiePolicy" && <CookiePolicy />}
          {selectedTab === "cookieUse" && <CookieUse />}
        </main>
      </div>
      <PolicyFooter />
    </div>
  );
};

export default PolicyPage;
