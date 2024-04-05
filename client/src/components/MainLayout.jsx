import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Login from './Login';
import SignupForm from './SignupForm';
import Footer from './Footer';

const MainLayout = () => {
  const [showForm, setShowForm] = useState('login');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: 1 }}>
        <Container className="py-5 container-custom">
          <Row className="align-items-center">
            <Col lg={6} className="text-center">
              <img width="350px" src="SFX.png" alt="Logo" className="mb-4" />
              <h1 className="h2">smartFOX</h1>
              <p>gateway to your smart future...</p>
            </Col>
            <Col lg={6}>
              {showForm === 'login' ? (
                <Login changeForm={() => setShowForm('signup')} />
              ) : (
                <SignupForm changeForm={() => setShowForm('login')} />
              )}
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

