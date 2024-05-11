import { useState, useEffect } from 'react';

export const useErrorBoundary = () => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error, errorInfo) => {
      console.error('ErrorBoundary caught an error', error, errorInfo);
      setHasError(true);
    };

    const prevErrorHandler = window.onerror;
    window.onerror = handleError;

    return () => {
      window.onerror = prevErrorHandler;
    };
  }, []);

  return { hasError };
};
