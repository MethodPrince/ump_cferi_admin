import { useState, useEffect } from 'react';
import { getBusinesses, getEvents, getMentors } from '../services/api';
import { Link } from 'react-router-dom';
import '../styles/admin-forms.css';

const Dashboard = ({ admin }) => {
  const [businesses, setBusinesses] = useState([]);
  const [events, setEvents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [bRes, eRes, mRes] = await Promise.all([
        getBusinesses(),
        getEvents(),
        getMentors(),
      ]);
      setBusinesses(Array.isArray(bRes?.data) ? bRes.data : []);
      setEvents(Array.isArray(eRes?.data) ? eRes.data : []);
      setMentors(Array.isArray(mRes?.data) ? mRes.data : []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading dashboard...</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Dashboard</h1>
        {admin?.name && <p>Welcome back, {admin.name}.</p>}
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-icon">📅</div>
          <h3>{events.length || 0}</h3>
          <p>Total Events</p>
          <Link to="/admin/events" className="stat-link">Manage →</Link>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon">💼</div>
          <h3>{businesses.length || 0}</h3>
          <p>Total Businesses</p>
          <Link to="/admin/businesses" className="stat-link">Manage →</Link>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon">👥</div>
          <h3>{mentors.length || 0}</h3>
          <p>Total Mentors</p>
          <Link to="/admin/mentors" className="stat-link">Manage →</Link>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon">⚙️</div>
          <h3>∞</h3>
          <p>System Status</p>
          <Link to="/admin/settings" className="stat-link">Configure →</Link>
        </div>
      </div>

      <div className="admin-quick-actions">
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">
          <Link to="/admin/programs" className="quick-action-card">
            <span className="quick-icon">📚</span>
            <span>Manage Programs</span>
          </Link>
          <Link to="/admin/gallery" className="quick-action-card">
            <span className="quick-icon">🖼️</span>
            <span>Manage Gallery</span>
          </Link>
          <Link to="/admin/slides" className="quick-action-card">
            <span className="quick-icon">🎞️</span>
            <span>Manage Slideshow</span>
          </Link>
          <Link to="/admin/events" className="quick-action-card">
            <span className="quick-icon">📅</span>
            <span>Manage Events</span>
          </Link>
          <Link to="/admin/businesses" className="quick-action-card">
            <span className="quick-icon">💼</span>
            <span>Manage Businesses</span>
          </Link>
          <Link to="/admin/mentors" className="quick-action-card">
            <span className="quick-icon">👥</span>
            <span>Manage Mentors</span>
          </Link>
          <Link to="/admin/messages" className="quick-action-card">
            <span className="quick-icon">💬</span>
            <span>View Messages</span>
          </Link>
          <Link to="/admin/settings" className="quick-action-card">
            <span className="quick-icon">⚙️</span>
            <span>Configure Settings</span>
          </Link>
          <Link to="/admin/profile" className="quick-action-card">
            <span className="quick-icon">👤</span>
            <span>Update Profile</span>
          </Link>
        </div>
      </div>

      <div className="admin-welcome">
        <h2>Welcome to Your Admin Panel!</h2>
        <p>You now have full control over the website. Use the sidebar menu to navigate between different sections.</p>
        <ul>
          <li>📝 <strong>Programs</strong> - Add, edit, and remove programs</li>
          <li>🖼️ <strong>Gallery</strong> - Manage gallery images</li>
          <li>🎞️ <strong>Slideshow</strong> - Configure slideshow and manage slides</li>
          <li>📅 <strong>Events</strong> - Manage events</li>
          <li>💼 <strong>Businesses</strong> - Manage student businesses</li>
          <li>👥 <strong>Mentors</strong> - Manage mentors</li>
          <li>💬 <strong>Messages</strong> - View contact form submissions</li>
          <li>⚙️ <strong>Settings</strong> - Configure site-wide settings and slideshow behavior</li>
          <li>👤 <strong>Profile</strong> - Update your credentials</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;