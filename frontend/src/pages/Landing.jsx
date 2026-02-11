import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Building2, TrendingUp, CheckCircle } from 'lucide-react';
import Button from '../components/common/Button';

const Landing = () => {
  const features = [
    {
      icon: <Users size={32} />,
      title: 'Student Management',
      description: 'Comprehensive student profiles with skills, branches, and placement status tracking'
    },
    {
      icon: <Building2 size={32} />,
      title: 'Company Portal',
      description: 'Manage company partnerships, job roles, and eligibility criteria efficiently'
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Analytics Dashboard',
      description: 'Real-time insights into placement statistics, trends, and performance metrics'
    },
    {
      icon: <CheckCircle size={32} />,
      title: 'Placement Tracking',
      description: 'Track every stage of the placement process from application to final selection'
    }
  ];

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--color-accent) 0%, #1e40af 100%)',
        color: 'white',
        padding: 'var(--spacing-2xl) var(--spacing-lg)',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: '700', 
            marginBottom: 'var(--spacing-lg)',
            color: 'white'
          }}>
            Placement Management System
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: 'var(--spacing-xl)',
            maxWidth: '800px',
            margin: '0 auto var(--spacing-xl)',
            opacity: 0.95
          }}>
            Streamline your campus placement process with our comprehensive management platform. 
            Track students, manage companies, and analyze placement data all in one place.
          </p>
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center' }}>
            <Link to="/login">
              <Button 
                variant="secondary" 
                size="large"
                icon={<ArrowRight size={20} />}
              >
                Get Started
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button 
                variant="outline" 
                size="large"
                style={{ 
                  background: 'rgba(255,255,255,0.1)', 
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.3)'
                }}
              >
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: 'var(--spacing-2xl) var(--spacing-lg)' }}>
        <div className="container">
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: 'var(--spacing-xl)',
            fontSize: '2.5rem'
          }}>
            Key Features
          </h2>
          
          <div className="grid grid-4">
            {features.map((feature, index) => (
              <div key={index} className="card hover-lift" style={{ textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'rgba(37, 99, 235, 0.1)',
                  color: 'var(--color-accent)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--spacing-lg)'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  marginBottom: 'var(--spacing-md)'
                }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.6'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ 
        background: 'var(--color-bg-tertiary)', 
        padding: 'var(--spacing-2xl) var(--spacing-lg)' 
      }}>
        <div className="container">
          <div className="grid grid-4">
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '3rem', 
                fontWeight: '700', 
                color: 'var(--color-accent)',
                marginBottom: 'var(--spacing-sm)'
              }}>
                500+
              </div>
              <div style={{ 
                fontSize: '1rem', 
                color: 'var(--color-text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Students Placed
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '3rem', 
                fontWeight: '700', 
                color: 'var(--color-accent)',
                marginBottom: 'var(--spacing-sm)'
              }}>
                50+
              </div>
              <div style={{ 
                fontSize: '1rem', 
                color: 'var(--color-text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Partner Companies
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '3rem', 
                fontWeight: '700', 
                color: 'var(--color-accent)',
                marginBottom: 'var(--spacing-sm)'
              }}>
                85%
              </div>
              <div style={{ 
                fontSize: '1rem', 
                color: 'var(--color-text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Placement Rate
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '3rem', 
                fontWeight: '700', 
                color: 'var(--color-accent)',
                marginBottom: 'var(--spacing-sm)'
              }}>
                100+
              </div>
              <div style={{ 
                fontSize: '1rem', 
                color: 'var(--color-text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Active Drives
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'var(--color-bg-primary)',
        borderTop: '1px solid var(--color-border-light)',
        padding: 'var(--spacing-xl) var(--spacing-lg)',
        textAlign: 'center'
      }}>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          &copy; {new Date().getFullYear()} Placement Management System. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Landing;