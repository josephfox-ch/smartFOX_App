import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Login from "../components/login/Login";
import Signup from "../components/signup/Signup";
import Footer from "../components/footer/Footer";

const AuthLayout = () => {
  const location = useLocation();

  const showingSignup = location.pathname === "/signup";
  const showingLogin = location.pathname === "/login" || location.pathname === "/";

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <main style={{ flex: 1 }}>
        <Container className="py-5 container-custom">
          <Row className="align-items-center">
            <Col lg={6} className="text-center">
              <img width="350px" src="SFX.png" alt="Logo" className="mb-4" />
              <h1 className="h2">smartFOX</h1>
              <p>gateway to your smart future...</p>
            </Col>
            <Col lg={6}>
              {showingLogin && <Login />}
              {showingSignup && <Signup />}
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;


