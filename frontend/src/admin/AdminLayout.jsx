import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/admin-layout.css';

const AdminLayout = ({ children, admin, setAdmin }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin');
    setAdmin(null);
    navigate('/admin/login');
  };

  const isActive = (path) => {
    return location.pathname.includes(path) ? 'active' : '';
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: '', label: 'Dashboard', id: 'dashboard' },
    { path: '/admin/programs', icon: '', label: 'Programs', id: 'programs' },
    { path: '/admin/pages', icon: '', label: 'Pages', id: 'pages' },
    { path: '/admin/gallery', icon: '', label: 'Gallery', id: 'gallery' },
    { path: '/admin/slides', icon: '', label: 'Slideshow', id: 'slides' },
    { path: '/admin/partners', icon: '', label: 'Partners', id: 'partners' },
    { path: '/admin/newsletter', icon: '', label: 'Newsletter', id: 'newsletter' },
    { path: '/admin/events', icon: '', label: 'Events', id: 'events' },
    { path: '/admin/businesses', icon: '', label: 'Businesses', id: 'businesses' },
    { path: '/admin/mentors', icon: '', label: 'Mentors', id: 'mentors' },
    { path: '/admin/messages', icon: '💬', label: 'Messages', id: 'messages' },
    { path: '/admin/settings', icon: '⚙️', label: 'Settings', id: 'settings' },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            {sidebarOpen && <span className="logo-text">UMPCFERI</span>}
          </div>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '✕' : '☰'}
          </button>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`sidebar-menu-item ${isActive(item.path)}`}
              title={item.label}
            >
              <span className="menu-icon">{item.icon}</span>
              {sidebarOpen && <span className="menu-label">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {sidebarOpen && (
          <div className="sidebar-footer">
            <div className="sidebar-divider"></div>
            <p className="sidebar-version">Admin Panel v1.0</p>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="admin-main">
        {/* Top Navigation */}
        <div className="admin-topnav">
          <div className="topnav-left">
            <button 
              className="mobile-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <h1 className="topnav-title">Admin Dashboard</h1>
          </div>

          <div className="topnav-right">
            <div className="topnav-admin">
              <div className="admin-info">
                <p className="admin-name">{admin?.name || 'Admin'}</p>
                <p className="admin-email">{admin?.email || 'admin@umpferi.com'}</p>
              </div>
              <div className="admin-avatar">{admin?.name?.charAt(0) || 'A'}</div>
              
              <div className="profile-menu">
                <button 
                  className="profile-menu-btn"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                >
                  ⋮
                </button>
                {profileMenuOpen && (
                  <div className="profile-dropdown">
                    <Link to="/admin/profile" className="dropdown-item">
                      👤 Profile Settings
                    </Link>
                    <button 
                      className="dropdown-item logout"
                      onClick={handleLogout}
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="admin-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
