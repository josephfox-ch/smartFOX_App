import React from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthService from "../../api/services/authService";
import { FaUserCircle } from "react-icons/fa";

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
      className="dashboard-header justify-content-between px-3"
    >
      <Navbar.Brand href="#home" className="d-flex align-items-center">
        <img
          src="/SFX.png"
          alt="smartFOX Logo"
          width="70"
          style={{ marginRight: "10px" }}
        />
        <div className="text-center">
          <div className="dashboard-brand-name">smartFOX</div>
          <p className="brand-slogan">Gateway to your smart future...</p>
        </div>
      </Navbar.Brand>
      <Nav>
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="light"
            id="dropdown-basic"
            className="d-flex align-items-center"
          >
            <FaUserCircle size="2.5em" className="me-2" />
            {state.user ? state.user.username : "User"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/account-settings">
              Account Settings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout} className="text-danger">
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};

export default DashboardHeader;
