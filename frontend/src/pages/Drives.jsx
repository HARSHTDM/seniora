import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Button from '../components/common/Button';
import DriveCard from '../components/cards/DriveCard';
import { placementService } from '../services/placementService';

const Drives = () => {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    date: '',
    status: 'Upcoming'
  });

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    try {
      setLoading(true);
      const data = await placementService.getDrives();
      setDrives(data);
    } catch (error) {
      console.error('Error fetching drives:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await placementService.addDrive(formData);
      setShowModal(false);
      setFormData({ company: '', date: '', status: 'Upcoming' });
      fetchDrives();
    } catch (error) {
      console.error('Error adding drive:', error);
    }
  };

  const groupedDrives = {
    'Upcoming': drives.filter(d => d.status === 'Upcoming'),
    'Ongoing': drives.filter(d => d.status === 'Ongoing'),
    'Completed': drives.filter(d => d.status === 'Completed')
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="section-header">
        <div>
          <h1 className="section-title">Placement Drives</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-xs)' }}>
            Schedule and track campus placement drives
          </p>
        </div>
        <Button 
          variant="primary" 
          icon={<Plus size={20} />}
          onClick={() => setShowModal(true)}
        >
          Schedule Drive
        </Button>
      </div>

      {/* Drives by Status */}
      {Object.entries(groupedDrives).map(([status, statusDrives]) => (
        <div key={status} style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h2 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600',
            marginBottom: 'var(--spacing-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-sm)'
          }}>
            {status}
            <span style={{
              background: 'var(--color-bg-tertiary)',
              color: 'var(--color-text-secondary)',
              fontSize: '0.875rem',
              padding: '2px 8px',
              borderRadius: '12px'
            }}>
              {statusDrives.length}
            </span>
          </h2>
          
          {statusDrives.length > 0 ? (
            <div className="grid grid-3">
              {statusDrives.map((drive) => (
                <DriveCard key={drive.id} drive={drive} />
              ))}
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                No {status.toLowerCase()} drives
              </p>
            </div>
          )}
        </div>
      ))}

      {/* Add Drive Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Schedule New Drive</h2>
              <button 
                onClick={() => setShowModal(false)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: 'var(--color-text-secondary)'
                }}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <label>Company Name</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                  placeholder="e.g., Microsoft"
                />
              </div>

              <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <label>Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>

              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  required
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'flex-end' }}>
                <Button 
                  variant="secondary" 
                  onClick={() => setShowModal(false)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Schedule Drive
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Drives;