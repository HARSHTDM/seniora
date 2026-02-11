import React, { useState, useEffect } from 'react';
import { Plus, Building2 } from 'lucide-react';
import Button from '../components/common/Button';
import { companyService } from '../services/companyService';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    eligibility: ''
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const data = await companyService.getCompanies();
      setCompanies(data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await companyService.addCompany(formData);
      setShowModal(false);
      setFormData({ name: '', role: '', eligibility: '' });
      fetchCompanies();
    } catch (error) {
      console.error('Error adding company:', error);
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
          <h1 className="section-title">Companies</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-xs)' }}>
            Manage company partnerships and job opportunities
          </p>
        </div>
        <Button 
          variant="primary" 
          icon={<Plus size={20} />}
          onClick={() => setShowModal(true)}
        >
          Add Company
        </Button>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-3">
        {companies.map((company) => (
          <div key={company.id} className="card hover-lift">
            <div style={{
              width: '48px',
              height: '48px',
              background: 'rgba(245, 158, 11, 0.1)',
              color: '#f59e0b',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--spacing-md)'
            }}>
              <Building2 size={24} />
            </div>

            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600',
              marginBottom: 'var(--spacing-sm)'
            }}>
              {company.name}
            </h3>

            <div style={{ 
              padding: 'var(--spacing-md) 0',
              borderTop: '1px solid var(--color-border-light)',
              borderBottom: '1px solid var(--color-border-light)',
              marginBottom: 'var(--spacing-md)'
            }}>
              <div style={{ 
                fontSize: '0.875rem',
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--spacing-xs)'
              }}>
                Role
              </div>
              <div style={{ 
                fontSize: '0.9375rem',
                fontWeight: '500',
                color: 'var(--color-text-primary)'
              }}>
                {company.role}
              </div>
            </div>

            <div>
              <div style={{ 
                fontSize: '0.875rem',
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--spacing-xs)'
              }}>
                Eligibility
              </div>
              <div style={{ 
                fontSize: '0.9375rem',
                color: 'var(--color-text-primary)'
              }}>
                {company.eligibility}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Company Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add New Company</h2>
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
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="e.g., Google"
                />
              </div>

              <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <label>Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                  placeholder="e.g., Software Engineer"
                />
              </div>

              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <label>Eligibility Criteria</label>
                <textarea
                  value={formData.eligibility}
                  onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                  required
                  placeholder="e.g., 7+ CGPA, No backlogs"
                  rows="3"
                />
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
                  Add Company
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Companies;