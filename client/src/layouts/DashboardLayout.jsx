import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardNavbar from '../components/dashboard/DashboardNavbar';
import DashboardControlPanel from '../components/dashboard/DashboardControlPanel';
import DashboardFooter from '../components/dashboard/DashboardFooter';
import DashboardMainContent from '../components/dashboard/DashboardMainContent';
import '../css/DashboardLayout.css';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <DashboardHeader />
      <DashboardNavbar />
      <div className="content-area">
        <div className="sidebar">
          <DashboardControlPanel />
        </div>
        <div className="main-content">
          <DashboardMainContent />
        </div>
      </div>
      <DashboardFooter className="footer" />
    </div>
  );
};

export default DashboardLayout;




