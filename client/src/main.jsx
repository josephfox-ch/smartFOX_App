import React from "react";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundry";
import "./index.css";
import "./css/style.css";
import "./css/satoshi.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
