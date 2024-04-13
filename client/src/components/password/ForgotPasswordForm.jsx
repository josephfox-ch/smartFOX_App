import React, { useState } from "react";
import {
  Form,
  Button,
  Alert,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthService from "../../api/services/authService";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    console.log("email-form", email);

    try {
      await AuthService.forgotPassword(email);
      setMessage(
        "If an account exists for this email, a reset link will be sent."
      );
    } catch (err) {
      console.error("Forgot Password Error:", err);
      setError("Failed to send reset link. Please try again.");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="justify-content-center">
        <Col>
          <div className="text-center">
            <img width="250" src="SFX.png" alt="Logo" className="mb-3" />
            <h1 id="brandName" className="h2 mb-3">
              smartFOX
            </h1>
            <p id="brandSlogan" className="mb-4">
              gateway to your smart future...
            </p>
          </div>
          <Card>
            <Card.Body>
              <Card.Title>Forgot Password?</Card.Title>
              <p className="text-muted mb-4">
                Remember your password? <Link to="/login">Login here.</Link>
              </p>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!email}
                  className="mt-3 w-100"
                >
                  Send Reset Link
                </Button>
                {message && (
                  <Alert variant="success" className="mt-3">
                    {message}
                  </Alert>
                )}
                {error && (
                  <Alert variant="danger" className="mt-3">
                    {error}
                  </Alert>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPasswordForm;

