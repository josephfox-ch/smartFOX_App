import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DashboardHeader = () => {
  return (
    <Navbar bg="light" expand="lg" className="dashboard-header justify-content-between">
      <Navbar.Brand href="#home" className="d-flex align-items-center">
        <img src="/SFX.png" alt="smartFOX Logo" width="90" style={{ marginRight: '10px' }} />
        <div>
          <div className="h5 mb-0">smartFOX</div>
          <small>Gateway to your smart future</small>
        </div>
      </Navbar.Brand>
      <Nav>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/events" className="nav-link">Events</Link>
      </Nav>
    </Navbar>
  );
};

export default DashboardHeader;

