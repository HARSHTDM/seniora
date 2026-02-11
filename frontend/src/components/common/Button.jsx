import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  icon,
  onClick,
  disabled,
  className = '',
  ...props 
}) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  
  const sizeStyles = {
    small: { padding: '6px 12px', fontSize: '0.8125rem' },
    medium: { padding: '10px 20px', fontSize: '0.9375rem' },
    large: { padding: '12px 24px', fontSize: '1rem' }
  };

  return (
    <button
      className={`${baseClass} ${variantClass} ${className}`}
      style={{
        ...sizeStyles[size],
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;