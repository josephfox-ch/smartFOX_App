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
          <Card className="shadow rounded p-3">
            <Card.Body>
              <div className="text-center mb-4">
                <img width="250" src="/SFX.png" alt="Logo" />
                <h1 className="h3 mt-3">Forgot Password</h1>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
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
              <p className="text-muted mt-3">
                Remember your password? <Link to="/login">Login here.</Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPasswordForm;
