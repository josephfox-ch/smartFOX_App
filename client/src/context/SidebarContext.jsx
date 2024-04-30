import React, { createContext, useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const SidebarContext = createContext();

const useSidebar = () => useContext(SidebarContext);

const SidebarProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useLocalStorage("sidebar-expanded", false);

  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen, sidebarExpanded, setSidebarExpanded }}>
      {children}
    </SidebarContext.Provider>
  );
};

export { useSidebar, SidebarProvider };
