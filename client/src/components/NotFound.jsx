import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist. If you think this is a mistake, you can return to the homepage using the link below.</p>
      <Link to="/" style={{ marginTop: '20px', textDecoration: 'none', color: 'blue' }}>
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
