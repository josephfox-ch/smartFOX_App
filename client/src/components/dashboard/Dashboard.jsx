import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import authService from '../../api/services/authService';

const Dashboard = () => {
  const {state, dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch({ type: "LOGOUT" });
      
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card>
            <Card.Body>
              <Card.Title>Dashboard</Card.Title>
              <Card.Text>
                Welcome, {state.user ? state.user.firstName : "User"}!
              </Card.Text>
              <Button variant="primary" onClick={handleLogout}>
                Log out
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;



