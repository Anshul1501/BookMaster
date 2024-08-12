import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error, errorInfo) => {
      console.error('Error caught in ErrorBoundary:', error, errorInfo);
      setHasError(true);
    };

    const handlePromiseRejection = (event) => {
      console.error('Promise rejection caught in ErrorBoundary:', event.reason);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handlePromiseRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handlePromiseRejection);
    };
  }, []);

  if (hasError) {
    return <h1>Something went wrong.</h1>;
  }

  return children;
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
