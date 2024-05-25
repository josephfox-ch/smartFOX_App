import React from "react";
import { ModalProvider } from "./context/ModalContext";
import { UserProvider } from "./context/UserContext";
import { HomeProvider } from "./context/HomeContext";
import { WeatherProvider } from "./context/WeatherContext";
import { AlertProvider } from "./context/AlertContext";
import { ClimateProvider } from "./context/ClimateContext";
import { CalculationProvider } from "./context/CalculationContext";
import { EnergyProvider } from "./context/EnergyContext";
import { HVACSystemLogProvider } from "./context/HVACSystemLogContext";
import { EnergyUsageProvider } from "./context/EnergyUsageContext";
import { AccessControlProvider } from "./context/AccessControlContext";
import { DoorProvider } from "./context/DoorContext";
import AppRoutes from "./Routes";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <AccessControlProvider>
        <HomeProvider>
          <ClimateProvider>
            <DoorProvider>
              <WeatherProvider>
                <CalculationProvider>
                  <EnergyProvider>
                    <EnergyUsageProvider>
                      <HVACSystemLogProvider>
                        <ModalProvider>
                          <AlertProvider>
                            <div className="App">
                              <AppRoutes />
                            </div>
                          </AlertProvider>
                        </ModalProvider>
                      </HVACSystemLogProvider>
                    </EnergyUsageProvider>
                  </EnergyProvider>
                </CalculationProvider>
              </WeatherProvider>
            </DoorProvider>
          </ClimateProvider>
        </HomeProvider>
      </AccessControlProvider>
    </UserProvider>
  );
}

export default App;

