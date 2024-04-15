import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const PolicyFooter = () => {
  return (
    <Container
      className="policy-footer text-center mt-auto py-4 text-white"
      fluid
    >
      <Col>
        <nav className="policy-footer-nav">
          <Link className=" mx-2" to="/">
            Home
          </Link>
          <Link className=" mx-2" to="/contact">
            Contact
          </Link>
        </nav>
      </Col>
      <Col>
        <p className="mx-2">smartFOX® Home Systems &copy; {new Date().getFullYear()} </p>
      </Col>
    </Container>
  );
};

export default PolicyFooter;
