import { useState, useEffect } from 'react';
import { getBusinesses } from '../services/api';
import '../styles/impact.css';

const Businesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const { data } = await getBusinesses();
        setBusinesses(data);
      } catch (err) {
        setError('Unable to fetch businesses at the moment.');
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  const totalJobs = businesses.reduce((sum, b) => sum + (b.jobsCreated || 0), 0);

  if (loading) {
    return <div className="impact-container loading">Loading businesses...</div>;
  }

  if (error) {
    return <div className="impact-container error">{error}</div>;
  }

  return (
    <div className="impact-page">
      <section className="business-impact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">All Student Businesses</h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">Live list of student businesses registered through the admin panel.</p>
          </div>

          <div className="business-stats-highlight">
            <div className="highlight-card">
              <div className="highlight-number">{businesses.length}</div>
              <div className="highlight-label">Live Businesses</div>
            </div>
            <div className="highlight-card">
              <div className="highlight-number">{totalJobs}</div>
              <div className="highlight-label">Total Jobs Created</div>
            </div>
          </div>

          <div className="business-grid">
            {businesses.length > 0 ? (
              businesses.map((business) => (
                <div key={business._id} className="business-card fade-in">
                  <h3>{business.name || 'Untitled Business'}</h3>
                  <p className="business-owner"><strong>Owner:</strong> {business.owner || 'N/A'}</p>
                  <p className="business-industry"><strong>Industry:</strong> {business.industry || 'N/A'}</p>
                  <p className="business-description">{business.description || 'No description available.'}</p>
                  <div className="business-meta">
                    <span>📅 Started: {business.yearStarted || 'Unknown'} </span>
                    <span>👥 Jobs: {business.jobsCreated || 0}</span>
                  </div>
                </div>
              ))
            ) : (
              <p>No businesses available yet.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Businesses;
