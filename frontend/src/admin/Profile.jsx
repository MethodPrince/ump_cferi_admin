import { useState, useEffect } from 'react';
import { getAdminProfile, updateAdminProfile } from '../services/api';
import '../styles/admin-forms.css';

const AdminProfile = ({ setAdmin }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await getAdminProfile();
        setProfile(data);
        setFormData({ name: data.name || '', email: data.email || '', password: '' });
      } catch (err) {
        console.error('Failed to load profile', err);
        setError('Unable to load profile. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password && formData.password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.name || !formData.email) {
      setError('Name and email are required');
      return;
    }

    setSaving(true);

    try {
      const { data } = await updateAdminProfile(formData);
      setProfile(data);
      setSuccess('✓ Profile updated successfully!');
      setAdmin(data);
      localStorage.setItem('admin', JSON.stringify(data));
      setFormData({ ...formData, password: '' });
      setConfirmPassword('');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Update failed', err);
      setError(err.response?.data?.message || 'Unable to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading profile...</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>👤 Profile Settings</h1>
      </div>

      {error && <div className="admin-alert error">{error}</div>}
      {success && <div className="admin-alert success">{success}</div>}

      <div className="admin-form-container">
        <h2>Update Your Account</h2>
        
        <div style={{ marginBottom: '2rem', padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid var(--ump-gold)' }}>
          <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>
            💡 Keep your credentials secure. Change your password regularly for better security.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="settings-section">
            <h3 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '1.5rem', borderBottom: '1px solid #ddd', paddingBottom: '0.75rem' }}>Personal Information</h3>

            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="admin@example.com"
                />
                <small>This email is used for login</small>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h3 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '1.5rem', borderBottom: '1px solid #ddd', paddingBottom: '0.75rem' }}>Change Password</h3>

            <div className="form-row">
              <div className="form-group">
                <label>New Password</label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Leave blank to keep current password"
                />
                <small>Minimum 6 characters recommended</small>
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your new password"
                />
                <small>Must match the password above</small>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn-save"
              disabled={saving}
            >
              {saving ? '💾 Saving...' : '💾 Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
