import React, { useState, useEffect } from 'react';
import { Users, Building2, TrendingUp, Calendar } from 'lucide-react';
import StatCard from '../components/cards/StatCard';
import FeatureCard from '../components/cards/FeatureCard';
import { placementService } from '../services/placementService';

const Dashboard = () => {
  const [kpis, setKpis] = useState(null);
  const [roundStats, setRoundStats] = useState(null);
  const [companyPlacements, setCompanyPlacements] = useState([]);
  const [recentPlacements, setRecentPlacements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [kpisData, roundsData, companiesData, recentData] = await Promise.all([
        placementService.getKPIs(),
        placementService.getRoundStats(),
        placementService.getCompanyPlacements(),
        placementService.getRecentPlacements()
      ]);

      setKpis(kpisData);
      setRoundStats(roundsData);
      setCompanyPlacements(companiesData);
      setRecentPlacements(recentData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
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
      {/* Page Header */}
      <div className="section-header">
        <div>
          <h1 className="section-title">Overview</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-xs)' }}>
            Welcome back! Here's what's happening with placements today.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-4" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <StatCard
          icon={<Users size={24} />}
          value={kpis?.total_students || 0}
          label="Total Students"
          color="#2563eb"
        />
        <StatCard
          icon={<TrendingUp size={24} />}
          value={kpis?.placed_students || 0}
          label="Placed Students"
          color="#10b981"
        />
        <StatCard
          icon={<Building2 size={24} />}
          value={kpis?.companies || 0}
          label="Companies"
          color="#f59e0b"
        />
        <StatCard
          icon={<Calendar size={24} />}
          value={kpis?.upcoming_drives || 0}
          label="Upcoming Drives"
          color="#8b5cf6"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-2" style={{ marginBottom: 'var(--spacing-xl)' }}>
        {/* Round Statistics */}
        <div className="card">
          <h2 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            marginBottom: 'var(--spacing-lg)',
            borderBottom: '1px solid var(--color-border-light)',
            paddingBottom: 'var(--spacing-md)'
          }}>
            Placement Rounds
          </h2>
          
          {roundStats && Object.entries(roundStats).map(([round, stats]) => (
            <div key={round} style={{ marginBottom: 'var(--spacing-lg)' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--spacing-sm)'
              }}>
                <span style={{ fontWeight: '600', fontSize: '0.9375rem' }}>{round}</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  {stats.cleared + stats.rejected} Total
                </span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                gap: 'var(--spacing-xs)',
                height: '8px',
                borderRadius: '4px',
                overflow: 'hidden',
                background: 'var(--color-bg-tertiary)'
              }}>
                <div style={{
                  flex: stats.cleared,
                  background: 'var(--color-success)',
                  transition: 'all 0.3s ease'
                }}></div>
                <div style={{
                  flex: stats.rejected,
                  background: 'var(--color-error)',
                  transition: 'all 0.3s ease'
                }}></div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                gap: 'var(--spacing-lg)',
                marginTop: 'var(--spacing-sm)',
                fontSize: '0.875rem'
              }}>
                <span style={{ color: 'var(--color-success)' }}>
                  ✓ {stats.cleared} Cleared
                </span>
                <span style={{ color: 'var(--color-error)' }}>
                  ✗ {stats.rejected} Rejected
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Company Placements */}
        <div className="card">
          <h2 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            marginBottom: 'var(--spacing-lg)',
            borderBottom: '1px solid var(--color-border-light)',
            paddingBottom: 'var(--spacing-md)'
          }}>
            Company-wise Placements
          </h2>
          
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {companyPlacements.map((company, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 'var(--spacing-md)',
                  borderBottom: index < companyPlacements.length - 1 ? '1px solid var(--color-border-light)' : 'none'
                }}
              >
                <div>
                  <div style={{ fontWeight: '600', fontSize: '0.9375rem' }}>
                    {company.company}
                  </div>
                </div>
                <div style={{
                  background: 'rgba(37, 99, 235, 0.1)',
                  color: 'var(--color-accent)',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  {company.placed_students} Students
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Placements */}
      <div className="card">
        <h2 style={{ 
          fontSize: '1.25rem', 
          fontWeight: '600', 
          marginBottom: 'var(--spacing-lg)'
        }}>
          Recent Placements
        </h2>
        
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Branch</th>
                <th>Company</th>
                <th>Skills</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentPlacements.map((student) => (
                <tr key={student.id}>
                  <td style={{ fontWeight: '600' }}>{student.name}</td>
                  <td>{student.branch}</td>
                  <td>
                    <span style={{ 
                      color: 'var(--color-accent)',
                      fontWeight: '500'
                    }}>
                      {student.placed_company || 'N/A'}
                    </span>
                  </td>
                  <td>
                    <div style={{ 
                      display: 'flex', 
                      gap: 'var(--spacing-xs)',
                      flexWrap: 'wrap'
                    }}>
                      {student.skills?.split(',').slice(0, 2).map((skill, idx) => (
                        <span 
                          key={idx}
                          className="badge badge-info"
                          style={{ fontSize: '0.75rem' }}
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${student.placed === 'Yes' ? 'success' : 'warning'}`}>
                      {student.placed === 'Yes' ? 'Placed' : 'In Progress'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;