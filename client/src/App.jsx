import React from "react";

import { UserProvider } from "./context/UserContext";
import AppRoutes from "./Routes";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <AppRoutes />
      </div>
    </UserProvider>
  );
}

export default App;
