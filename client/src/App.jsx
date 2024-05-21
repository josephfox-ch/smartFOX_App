import React from "react";
import { ModalProvider } from "./context/ModalContext";
import { UserProvider } from "./context/UserContext";
import { HomeProvider } from "./context/HomeContext";
import { WeatherProvider } from "./context/WeatherContext";
import { AlertProvider } from "./context/AlertContext";
import { ClimateProvider } from "./context/ClimateContext";
import { EnergyProvider } from "./context/EnergyContext";
import AppRoutes from "./Routes";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <HomeProvider>
        <ClimateProvider>
          <WeatherProvider>
            <EnergyProvider>
              <ModalProvider>
                <AlertProvider>
                  <div className="App">
                    <AppRoutes />
                  </div>
                </AlertProvider>
              </ModalProvider>
            </EnergyProvider>
          </WeatherProvider>
        </ClimateProvider>
      </HomeProvider>
    </UserProvider>
  );
}

export default App;
