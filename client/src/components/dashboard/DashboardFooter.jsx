import React from 'react';
import { Container } from 'react-bootstrap';

const DashboardFooter = () => {
  return (
    <footer className="dashboard-footer mt-auto py-3">
      <Container className="text-center">
        &copy; {new Date().getFullYear()} smartFOX. All rights reserved.
      </Container>
    </footer>
  );
};

export default DashboardFooter;
