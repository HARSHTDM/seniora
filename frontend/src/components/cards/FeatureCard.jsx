import React from 'react';

const FeatureCard = ({ title, image, stats }) => {
  return (
    <div className="card feature-card">
      {image && (
        <img 
          src={image} 
          alt={title} 
          className="feature-card-image"
        />
      )}
      <div className="feature-card-content">
        <h3 className="feature-card-title">{title}</h3>
        <div className="feature-card-stats">
          {stats && stats.map((stat, index) => (
            <div key={index} className="stat-row">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;