import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AuthLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-bg-secondary)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: 'var(--spacing-lg)'
      }}>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;