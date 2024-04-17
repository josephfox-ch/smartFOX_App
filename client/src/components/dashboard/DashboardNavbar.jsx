import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function DashboardNavbar() {
  return (
    <Navbar
      bg="warning"
      expand="lg"
      className="dashboard-header justify-content-between px-3"
    >
      <Nav>
        <Link to="/dashboard" className="nav-link">
          Dashboard
        </Link>
        <Link to="/events" className="nav-link">
          Events
        </Link>
        <Link to="/automations" className="nav-link">
          Automations
        </Link>
        <Link to="/modes" className="nav-link">
          Modes
        </Link>
        <Link to="/alerts" className="nav-link">
          Alerts
        </Link>
        <Link to="/mobile" className="nav-link">
          Mobile
        </Link>
      </Nav>
    </Navbar>
  );
}

export default DashboardNavbar;
