import React from 'react';
import { useErrorBoundary } from '../hooks/useErrorBoundary';

const ErrorBoundary = ({ children }) => {
  const { hasError } = useErrorBoundary();

  if (hasError) {
    return <h1>Something went wrong.</h1>;
  }

  return children;
};

export default ErrorBoundary;

