import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import { useAuth } from '../hooks/useAuth';

const DashboardLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: '260px' }}>
        <Navbar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;