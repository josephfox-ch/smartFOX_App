import React from "react";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundry";
import initLogRocket from "./utils/logRocket.js";
import "./index.css";
import "./css/style.css";
import "./css/satoshi.css";

// Initialize LogRocket
initLogRocket();

const root = createRoot(document.getElementById("root"));

root.render(
  <ErrorBoundary>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </ErrorBoundary>
);