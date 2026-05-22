import { useState, useEffect } from 'react';
import { getBusinesses, createBusiness, updateBusiness, deleteBusiness } from '../services/api';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/admin.css';

const Businesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    owner: '',
    industry: '',
    description: '',
    yearStarted: '',
    jobsCreated: '',
    featured: false
  });

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  useEffect(() => {
    fetchBusinesses();
    if (query.get('action') === 'add') {
      setShowForm(true);
    }
  }, [query]);

  const fetchBusinesses = async () => {
    try {
      const { data } = await getBusinesses();
      setBusinesses(data);
    } catch (error) {
      console.error('Error fetching businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateBusiness(editing, formData);
      } else {
        await createBusiness(formData);
      }
      setShowForm(false);
      setEditing(null);
      setFormData({
        name: '',
        owner: '',
        industry: '',
        description: '',
        yearStarted: '',
        jobsCreated: '',
        featured: false
      });
      fetchBusinesses();
    } catch (error) {
      console.error('Error saving business:', error);
    }
  };

  const handleEdit = (business) => {
    setEditing(business._id);
    setFormData({
      name: business.name || '',
      owner: business.owner || '',
      industry: business.industry || '',
      description: business.description || '',
      yearStarted: business.yearStarted || '',
      jobsCreated: business.jobsCreated || '',
      featured: business.featured || false
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this business?')) {
      try {
        await deleteBusiness(id);
        fetchBusinesses();
      } catch (error) {
        console.error('Error deleting business:', error);
      }
    }
  };

  const handleToggleFeatured = async (business) => {
    try {
      await updateBusiness(business._id, { ...business, featured: !business.featured });
      fetchBusinesses();
    } catch (error) {
      console.error('Error updating business:', error);
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading...</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Manage Businesses</h1>
        <button onClick={() => {
          setShowForm(!showForm);
          setEditing(null);
          setFormData({
            name: '',
            owner: '',
            industry: '',
            description: '',
            yearStarted: '',
            jobsCreated: '',
            featured: false
          });
        }} className="admin-add-btn">
          {showForm ? 'Cancel' : '+ Add New Business'}
        </button>
      </div>

      {showForm && (
        <div className="admin-form-container">
          <h2>{editing ? 'Edit Business' : 'Add New Business'}</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <label>Business Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Tech Solutions Inc"
                />
              </div>
              <div className="form-group">
                <label>Owner Name *</label>
                <input
                  type="text"
                  name="owner"
                  value={formData.owner}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., John Doe"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Industry *</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Technology"
                />
              </div>
              <div className="form-group">
                <label>Year Started</label>
                <input
                  type="number"
                  name="yearStarted"
                  value={formData.yearStarted}
                  onChange={handleInputChange}
                  placeholder="e.g., 2023"
                  min="2000"
                  max="2026"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Jobs Created</label>
                <input
                  type="number"
                  name="jobsCreated"
                  value={formData.jobsCreated}
                  onChange={handleInputChange}
                  placeholder="e.g., 5"
                  min="0"
                />
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                  />
                  Featured Business
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                placeholder="Describe the business..."
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-save">
                {editing ? 'Update Business' : 'Save Business'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-cancel">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Featured</th>
              <th>Business Name</th>
              <th>Owner</th>
              <th>Industry</th>
              <th>Year</th>
              <th>Jobs</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {businesses.map(business => (
              <tr key={business._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={business.featured || false}
                    onChange={() => handleToggleFeatured(business)}
                    className="featured-checkbox"
                  />
                </td>
                <td>{business.name}</td>
                <td>{business.owner}</td>
                <td>{business.industry}</td>
                <td>{business.yearStarted || '-'}</td>
                <td>{business.jobsCreated || 0}</td>
                <td className="actions">
                  <button onClick={() => handleEdit(business)} className="btn-edit">Edit</button>
                  <button onClick={() => handleDelete(business._id)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
            {businesses.length === 0 && (
              <tr>
                <td colSpan="7" className="no-data">No businesses found. Add your first business!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Businesses;