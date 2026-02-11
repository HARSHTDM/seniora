import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, User, Search, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Menu size={24} style={{ marginRight: '12px', cursor: 'pointer' }} />
        Placement Management
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button className="btn-outline" style={{ padding: '8px', borderRadius: '50%' }}>
          <Search size={20} />
        </button>
        <button className="btn-outline" style={{ padding: '8px', borderRadius: '50%', position: 'relative' }}>
          <Bell size={20} />
          <span style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            width: '8px',
            height: '8px',
            background: 'var(--color-error)',
            borderRadius: '50%'
          }}></span>
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '16px', borderLeft: '1px solid var(--color-border-light)' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>
              {user?.email || 'Admin User'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
              Administrator
            </div>
          </div>
          <button className="btn-outline" style={{ padding: '8px', borderRadius: '50%' }}>
            <User size={20} />
          </button>
          <button 
            onClick={logout}
            className="btn-outline" 
            style={{ padding: '8px', borderRadius: '50%', color: 'var(--color-error)' }}
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;