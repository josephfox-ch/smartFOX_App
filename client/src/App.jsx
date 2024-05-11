import React from "react";
import { ModalProvider } from "./context/ModalContext";
import { UserProvider } from "./context/UserContext";
import { HomeProvider } from "./context/HomeContext";
import AppRoutes from "./Routes";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <HomeProvider>
        <ModalProvider>
          <div className="App">
            <AppRoutes />
          </div>
        </ModalProvider>
      </HomeProvider>
    </UserProvider>
  );
}

export default App;
