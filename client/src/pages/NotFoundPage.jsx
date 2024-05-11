import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <p className="text-center mt-4">
        Sorry, the page you are looking for does not exist. If you think this is a mistake, you can return to the homepage using the link below.
      </p>
      <Link to="/" className="mt-5 text-blue-600 hover:text-blue-800 underline">
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;

