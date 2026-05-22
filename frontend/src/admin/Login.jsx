import { useState } from 'react';
import { loginAdmin, setAuthToken } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';

const Login = ({ setAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const { data } = await loginAdmin(normalizedEmail, password);
      setAuthToken(data.token);
      setAdmin(data);
      navigate('/admin/dashboard');
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Invalid email or password');
      } else if (err.code === 'ECONNABORTED') {
        setError('Request timeout. Server may be slow. Try again.');
      } else if (err.message?.includes('Network Error')) {
        setError('Network error. Check your connection.');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <div className="admin-login-header">
          <div className="admin-login-logo">
            <img src="/images/ump-logo.jpg" alt="UMP Logo" />
          </div>
          <h2>Admin Login</h2>
          <p>UMP CFERI Administration</p>
        </div>
        
        <div className="admin-login-form">
          {error && <div className="admin-login-error">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="admin-login-form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                className="admin-login-input"
                placeholder="Kholofelo.Makhubepetsi@ump.ac.za"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            
            <div className="admin-login-form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="admin-login-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            
            <button 
              type="submit" 
              className="admin-login-button"
              disabled={loading}
            >
              {loading ? (
                <span className="admin-login-loading">
                  <span className="admin-login-spinner"></span>
                  Logging in...
                </span>
              ) : (
                'Login'
              )}
            </button>
          </form>
          
          <div className="admin-login-footer">
            <p>Default: <strong>Kholofelo.Makhubepetsi@ump.ac.za</strong> / <strong>Kholo@2021</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;