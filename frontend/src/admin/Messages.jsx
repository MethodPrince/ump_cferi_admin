import { useState, useEffect } from 'react';
import { getMessages, logoutAdmin, updateMessageStatus } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/admin.css';

const Messages = ({ setAdmin }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getMessages()
      .then(({ data }) => setMessages(data))
      .catch((error) => {
        if (error.response?.status === 401) {
          setAdmin(null);
          navigate('/admin/login');
        }
      })
      .finally(() => setLoading(false));
  }, [navigate, setAdmin]);

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      setAdmin(null);
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const handleStatusChange = async (messageId, currentStatus) => {
    const newStatus = currentStatus === 'answered' ? 'unanswered' : 'answered';
    try {
      const { data } = await updateMessageStatus(messageId, { status: newStatus });
      setMessages(messages.map(msg => msg._id === messageId ? data : msg));
    } catch (error) {
      console.error('Failed to update message status', error);
      alert('Failed to update message status');
    }
  };

  if (loading) {
    return <div className="admin-messages-container loading">Loading...</div>;
  }

  return (
    <div className="admin-messages-container">
      <div className="admin-header">
        <h1 className="admin-messages-title">Messages</h1>
        <div className="admin-user-section">
          <button onClick={handleLogout} className="admin-logout-btn">Logout</button>
        </div>
      </div>
      
      <div className="admin-messages-grid">
        {messages.length === 0 ? (
          <p className="no-messages">No messages yet.</p>
        ) : (
          messages.map(msg => (
            <div key={msg._id} className="admin-message-card">
              <div className="admin-message-header">
                <div>
                  <h3 className="admin-message-sender">{msg.senderName}</h3>
                  <p className="admin-message-email">{msg.senderEmail}</p>
                </div>
                <div className="admin-message-status-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={msg.status === 'answered'}
                      onChange={() => handleStatusChange(msg._id, msg.status)}
                    />
                    <span className={`admin-message-status ${msg.status === 'answered' ? 'status-answered' : 'status-unanswered'}`}>
                      {msg.status}
                    </span>
                  </label>
                </div>
              </div>
              <p className="admin-message-text">{msg.message}</p>
              {msg.reply && (
                <div className="admin-message-reply">
                  <strong>Reply:</strong>
                  <p>{msg.reply}</p>
                </div>
              )}
              <p className="admin-message-date">{new Date(msg.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
      
      <div className="admin-links">
        <Link to="/admin/dashboard" className="admin-link">Back to Dashboard</Link>
        <Link to="/" className="admin-link admin-link-secondary">Back to Site</Link>
      </div>
    </div>
  );
};

export default Messages;