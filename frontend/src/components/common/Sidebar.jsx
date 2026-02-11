import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Calendar,
  TrendingUp,
  FileText,
  Home
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Landing' },
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/students', icon: Users, label: 'Students' },
    { path: '/companies', icon: Building2, label: 'Companies' },
    { path: '/drives', icon: Calendar, label: 'Drives' },
    { path: '/placements', icon: FileText, label: 'Placements' },
    { path: '/analytics', icon: TrendingUp, label: 'Analytics' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        PMS
      </div>
      
      <nav>
        <ul className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path} className="sidebar-nav-item">
                <Link 
                  to={item.path} 
                  className={`sidebar-nav-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;