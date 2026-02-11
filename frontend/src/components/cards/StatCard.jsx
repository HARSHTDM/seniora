import React from 'react';

const StatCard = ({ icon, value, label, color = '#2563eb', trend }) => {
  return (
    <div className="stat-card">
      <div 
        className="stat-card-icon" 
        style={{ background: `${color}15`, color: color }}
      >
        {icon}
      </div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-label">{label}</div>
      {trend && (
        <div style={{ 
          marginTop: 'var(--spacing-sm)', 
          fontSize: '0.75rem',
          color: trend.direction === 'up' ? 'var(--color-success)' : 'var(--color-error)'
        }}>
          {trend.direction === 'up' ? '↑' : '↓'} {trend.value}
        </div>
      )}
    </div>
  );
};

export default StatCard;