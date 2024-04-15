import React from 'react';
import { Tab, Col } from 'react-bootstrap';

const DashboardMainContent = () => {
  return (
    <Tab.Content className='bg-primary'>
      <Tab.Pane eventKey="dashboard">
        <Col>
          <h2>Dashboard</h2>
          <p>Welcome to your smartFOX Dashboard!</p>
        </Col>
      </Tab.Pane>
      <Tab.Pane eventKey="events">
        <Col>
          <h2>Events</h2>
          <p>View recent events here.</p>
        </Col>
      </Tab.Pane>
    </Tab.Content>
  );
};

export default DashboardMainContent;
