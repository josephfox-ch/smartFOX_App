import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import AuthService from "../../api/services/authService";

const DashboardHeader = () => {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      dispatch({ type: "LOGOUT" });

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      className="dashboard-header justify-content-between"
    >
      <Navbar.Brand href="#home" className="d-flex align-items-center">
        <img
          src="/SFX.png"
          alt="smartFOX Logo"
          width="90"
          style={{ marginRight: "10px" }}
        />
        <div>
          <div className="h5 mb-0">smartFOX</div>
          <small>Gateway to your smart future</small>
        </div>
      </Navbar.Brand>
      <div> Welcome, {state.user ? state.user.username : "User"}!</div>
      <Nav>
        <Link to="/dashboard" className="nav-link">
          Dashboard
        </Link>
        <Link to="/events" className="nav-link">
          Events
        </Link>
      </Nav>
      <Button variant="primary" onClick={handleLogout}>
        Log out
      </Button>
    </Navbar>
  );
};

export default DashboardHeader;
