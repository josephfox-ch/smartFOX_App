import React, { useState } from 'react';
import Header from '../components/header/index';
import Sidebar from '../components/sidebar/index';

// The DashboardLayout component accepts children as props and defines the layout structure
const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);  // State to manage sidebar visibility

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* Page Wrapper Start */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar Start */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content Area Start */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* Header Start */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {/* Main Content Start */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}  // Rendering children within the main content area
            </div>
          </main>
          {/* Main Content End */}
        </div>
        {/* Content Area End */}
      </div>
      {/* Page Wrapper End */}
    </div>
  );
};

export default DashboardLayout;
