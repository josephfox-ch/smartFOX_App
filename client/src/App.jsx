import React from "react";
import { ModalProvider } from './context/ModalContext';
import { UserProvider } from "./context/UserContext";
import AppRoutes from "./Routes";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <ModalProvider>
        <div className="App">
          <AppRoutes />
        </div>
      </ModalProvider>
    </UserProvider>
  );
}

export default App;
