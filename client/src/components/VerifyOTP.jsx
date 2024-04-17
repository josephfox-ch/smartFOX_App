import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";
import AuthService from '../api/services/authService'

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");  
    setMessage("");
    try {
      const userId = new URLSearchParams(window.location.search).get('userId');
      const response = await AuthService.verifyOTP(userId, otp);
      if (response.success) {
        dispatch({
          type: "LOGIN",
          payload: {
            user: response.user
          }
        });
        console.log('verify-response', response)
        navigate("/dashboard");
      } else {
        throw new Error(response.message || "Verification failed");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  

  const handleResendOTP = async () => {
    setError("");  
    setMessage("");
    try {
      const userId = new URLSearchParams(window.location.search).get('userId');
      const response = await AuthService.resendOTP(userId);
      setMessage("A new Authentication Code has been sent to your email.");
      console.log("OTP has been resent");
      console.log('otp response', response);
    } catch (error) {
      setError("Failed to resend OTP");
    }
  };
  

  return (
    <Container
      className=" d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className=" w-100" style={{ maxWidth: "400px" }}>
        <Col className="text-center">
          <img width="250px" src="SFX.png" alt="Logo" className="mb-4" />
          <h1 id="brandName" className="h2">
            smartFOX
          </h1>
          <p id="brandSlogan">gateway to your smart future...</p>
        </Col>
        <Col className="mb-md-0">
          <h3 id='verifyPageTitle' className=" p-2 rounded text-center mb-4">
            Verify Account
          </h3>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="otp">
              <Form.Label>OTP Code</Form.Label>
              <Form.Control
                className="border-2 "
                type="text"
                placeholder="Enter Code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                Please enter the Authentication Code sent to your email.
              </Form.Text>
            </Form.Group>
            <div className="d-grid gap-2 mt-3 mb-3">
              <Button variant="outline-success" type="submit" size="m">
                Verify
              </Button>
              <Button variant="link" onClick={handleResendOTP} size="m">
                Resend OTP
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyOTP;

