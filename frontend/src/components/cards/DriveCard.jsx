import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';

const DriveCard = ({ drive }) => {
  const statusColors = {
    'Upcoming': 'var(--color-accent)',
    'Ongoing': 'var(--color-warning)',
    'Completed': 'var(--color-success)'
  };

  return (
    <div className="card" style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute',
        top: 'var(--spacing-md)',
        right: 'var(--spacing-md)',
      }}>
        <span 
          className={`badge badge-${drive.status === 'Upcoming' ? 'info' : drive.status === 'Ongoing' ? 'warning' : 'success'}`}
        >
          {drive.status}
        </span>
      </div>

      <h3 style={{ 
        fontSize: '1.125rem', 
        fontWeight: '600',
        marginBottom: 'var(--spacing-md)',
        paddingRight: '80px'
      }}>
        {drive.company}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          <Calendar size={16} />
          <span>{drive.date}</span>
        </div>
        
        {drive.location && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
            <MapPin size={16} />
            <span>{drive.location}</span>
          </div>
        )}

        {drive.applicants && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
            <Users size={16} />
            <span>{drive.applicants} Applicants</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriveCard;