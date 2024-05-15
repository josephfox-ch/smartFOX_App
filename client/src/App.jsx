import React from "react";
import { ModalProvider } from "./context/ModalContext";
import { UserProvider } from "./context/UserContext";
import { HomeProvider } from "./context/HomeContext";
import AppRoutes from "./Routes";
import { AlertProvider } from "./context/AlertContext";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <HomeProvider>
        <ModalProvider>
          <AlertProvider>
            <div className="App">
              <AppRoutes />
            </div>
          </AlertProvider>
        </ModalProvider>
      </HomeProvider>
    </UserProvider>
  );
}

export default App;


