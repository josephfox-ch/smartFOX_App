import React from 'react';
import App from "./App";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./css/style.css";
import "./css/satoshi.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
