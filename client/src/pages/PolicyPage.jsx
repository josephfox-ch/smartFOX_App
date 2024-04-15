import React, { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Nav, Tab, Row, Col } from "react-bootstrap";
import TermsOfService from "../components/policy/TermsOfService";
import PrivacyPolicy from "../components/policy/PrivacyPolicy";
import CookiePolicy from "../components/policy/CookiePolicy";
import CookieUse from "../components/policy/CookieUse";
import PolicyFooter from "../components/policy/PolicyFooter";
import "../css/PolicyPage.css";

const PolicyPage = () => {
  const location = useLocation();
  const [key, setKey] = useState(new URLSearchParams(location.search).get('tab') || 'terms');

  useEffect(() => {
    const tab = new URLSearchParams(location.search).get('tab');
    if (tab) setKey(tab);
  }, [location]);

  return (
    <div className="d-flex flex-column vh-100">
        <div className="policy-header d-flex justify-content-center align-items-center flex-grow-0">
          <img width="90" src="/SFX.png" alt="Logo" />
          <div>
            <h3>smartFOX</h3>
            <p>Gateway to your smart future...</p>
          </div>
        </div>
        <Container fluid className="flex-grow-1">
          <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
            <Row className="flex-grow-1">
              <Col className="policy-tabs" sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="terms">Terms of Service</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="privacy">Privacy Policy</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="cookiePolicy">Cookie Policy</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="cookieUse">Cookie Use</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col className="policy-content" sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="terms">
                    <TermsOfService />
                  </Tab.Pane>
                  <Tab.Pane eventKey="privacy">
                    <PrivacyPolicy />
                  </Tab.Pane>
                  <Tab.Pane eventKey="cookiePolicy">
                    <CookiePolicy />
                  </Tab.Pane>
                  <Tab.Pane eventKey="cookieUse">
                    <CookieUse />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
        <PolicyFooter />
    </div>
  );
};

export default PolicyPage;

