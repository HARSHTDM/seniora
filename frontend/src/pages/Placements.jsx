import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle } from 'lucide-react';
import Button from '../components/common/Button';
import { placementService, studentService } from '../services/placementService';

const Placements = () => {
  const [rounds, setRounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRoundModal, setShowRoundModal] = useState(false);
  const [showPlacementModal, setShowPlacementModal] = useState(false);
  
  const [roundFormData, setRoundFormData] = useState({
    student_name: '',
    company_name: '',
    round_name: 'Aptitude',
    status: 'Cleared'
  });

  const [placementFormData, setPlacementFormData] = useState({
    student_name: '',
    company_name: ''
  });

  useEffect(() => {
    fetchRounds();
  }, []);

  const fetchRounds = async () => {
    try {
      setLoading(true);
      const data = await placementService.getRounds();
      setRounds(data);
    } catch (error) {
      console.error('Error fetching rounds:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoundSubmit = async (e) => {
    e.preventDefault();
    try {
      await placementService.addRound(roundFormData);
      setShowRoundModal(false);
      setRoundFormData({
        student_name: '',
        company_name: '',
        round_name: 'Aptitude',
        status: 'Cleared'
      });
      fetchRounds();
    } catch (error) {
      console.error('Error adding round:', error);
    }
  };

  const handlePlacementSubmit = async (e) => {
    e.preventDefault();
    try {
      await placementService.markPlaced(
        placementFormData.student_name,
        placementFormData.company_name
      );
      setShowPlacementModal(false);
      setPlacementFormData({ student_name: '', company_name: '' });
      fetchRounds();
    } catch (error) {
      console.error('Error marking placement:', error);
    }
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
          <h1 className="section-title">Placement Process</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-xs)' }}>
            Track student progress through placement rounds
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
          <Button 
            variant="secondary" 
            icon={<Plus size={20} />}
            onClick={() => setShowRoundModal(true)}
          >
            Add Round Result
          </Button>
          <Button 
            variant="primary" 
            icon={<CheckCircle size={20} />}
            onClick={() => setShowPlacementModal(true)}
          >
            Mark Placed
          </Button>
        </div>
      </div>

      {/* Placement Rounds Table */}
      <div className="card">
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Company</th>
                <th>Round</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {rounds.map((round) => (
                <tr key={round.id}>
                  <td style={{ fontWeight: '600' }}>{round.student_name}</td>
                  <td>
                    <span style={{ color: 'var(--color-accent)', fontWeight: '500' }}>
                      {round.company_name}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-info">
                      {round.round_name}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-${round.status === 'Cleared' ? 'success' : 'error'}`}>
                      {round.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--color-text-secondary)' }}>
                    {new Date().toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Round Modal */}
      {showRoundModal && (
        <div className="modal-overlay" onClick={() => setShowRoundModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add Round Result</h2>
              <button 
                onClick={() => setShowRoundModal(false)}
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
            
            <form onSubmit={handleRoundSubmit}>
              <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <label>Student Name</label>
                <input
                  type="text"
                  value={roundFormData.student_name}
                  onChange={(e) => setRoundFormData({ ...roundFormData, student_name: e.target.value })}
                  required
                />
              </div>

              <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <label>Company Name</label>
                <input
                  type="text"
                  value={roundFormData.company_name}
                  onChange={(e) => setRoundFormData({ ...roundFormData, company_name: e.target.value })}
                  required
                />
              </div>

              <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <label>Round</label>
                <select
                  value={roundFormData.round_name}
                  onChange={(e) => setRoundFormData({ ...roundFormData, round_name: e.target.value })}
                  required
                >
                  <option value="Aptitude">Aptitude</option>
                  <option value="Technical">Technical</option>
                  <option value="HR">HR</option>
                </select>
              </div>

              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <label>Status</label>
                <select
                  value={roundFormData.status}
                  onChange={(e) => setRoundFormData({ ...roundFormData, status: e.target.value })}
                  required
                >
                  <option value="Cleared">Cleared</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'flex-end' }}>
                <Button 
                  variant="secondary" 
                  onClick={() => setShowRoundModal(false)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Add Result
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mark Placed Modal */}
      {showPlacementModal && (
        <div className="modal-overlay" onClick={() => setShowPlacementModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Mark Student as Placed</h2>
              <button 
                onClick={() => setShowPlacementModal(false)}
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
            
            <form onSubmit={handlePlacementSubmit}>
              <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <label>Student Name</label>
                <input
                  type="text"
                  value={placementFormData.student_name}
                  onChange={(e) => setPlacementFormData({ ...placementFormData, student_name: e.target.value })}
                  required
                />
              </div>

              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <label>Company Name</label>
                <input
                  type="text"
                  value={placementFormData.company_name}
                  onChange={(e) => setPlacementFormData({ ...placementFormData, company_name: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'flex-end' }}>
                <Button 
                  variant="secondary" 
                  onClick={() => setShowPlacementModal(false)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Mark as Placed
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Placements;