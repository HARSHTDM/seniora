import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      background: 'var(--color-bg-primary)',
      borderTop: '1px solid var(--color-border-light)',
      padding: 'var(--spacing-lg)',
      textAlign: 'center',
      color: 'var(--color-text-secondary)',
      fontSize: '0.875rem'
    }}>
      <p>&copy; {new Date().getFullYear()} Placement Management System. All rights reserved.</p>
    </footer>
  );
};

export default Footer;