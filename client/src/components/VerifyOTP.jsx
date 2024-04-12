import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //todo: call API here for to verify OTP
    //todo: after verifying navigate to dashboard
    console.log("Verified OTP: ", otp);
    navigate("/dashboard");
  };

  const handleResendOTP = () => {
    //Todo: trigger resending OTP here
    setError("");
    setMessage("A new Authentication Code has been sent to your email.");
    console.log("OTP has been resent");
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
          <h3 className="bg-warning p-2 rounded text-center mb-4">
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
