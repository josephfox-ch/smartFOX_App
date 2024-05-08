import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import AppRoutes from "./Routes";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <div className="App">
          <AppRoutes />
        </div>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
