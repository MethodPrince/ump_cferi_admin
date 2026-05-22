import { useState, useEffect } from 'react';
import { getPrograms, createProgram, updateProgram, deleteProgram } from '../services/api';
import '../styles/admin-forms.css';

const AdminPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'General',
    description: '',
    fullDetails: '',
    benefits: '',
    contact: '',
    image: '',
    order: 0,
    active: true
  });

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const { data } = await getPrograms();
      setPrograms(data);
    } catch (error) {
      console.error('Failed to fetch programs', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditing(null);
    setImagePreview('');
    setFormData({
      title: '',
      slug: '',
      category: 'General',
      description: '',
      fullDetails: '',
      benefits: '',
      contact: '',
      image: '',
      order: 0,
      active: true
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });

    if (name === 'image' && value) {
      setImagePreview(value);
    }
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, image: reader.result });
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      slug: formData.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      benefits: formData.benefits
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    };

    if (!payload.title || !payload.slug) {
      alert('Title and slug are required');
      return;
    }

    try {
      if (editing) {
        await updateProgram(editing, payload);
      } else {
        await createProgram(payload);
      }
      resetForm();
      setShowForm(false);
      fetchPrograms();
    } catch (error) {
      console.error('Error saving program', error);
      alert('Unable to save program. Please check the fields and try again.');
    }
  };

  const handleEdit = (program) => {
    setEditing(program._id);
    setFormData({
      title: program.title || '',
      slug: program.slug || '',
      category: program.category || 'General',
      description: program.description || '',
      fullDetails: program.fullDetails || '',
      benefits: (program.benefits || []).join(', '),
      contact: program.contact || '',
      image: program.image || '',
      order: program.order || 0,
      active: program.active !== false
    });
    setImagePreview(program.image || '');
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this program permanently?')) return;
    try {
      await deleteProgram(id);
      fetchPrograms();
    } catch (error) {
      console.error('Failed to delete program', error);
      alert('Unable to delete program.');
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading programs...</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>🧭 Program Management</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            resetForm();
          }}
          className="admin-add-btn"
        >
          {showForm ? 'Cancel' : '+ Add Program'}
        </button>
      </div>

      {showForm && (
        <div className="admin-form-container">
          <h2>{editing ? 'Edit Program' : 'Add New Program'}</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <label>Title *</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Program title"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="e.g. Incubation Programs"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Slug (URL-friendly name) *</label>
                <input
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                  placeholder="program-name"
                />
                <small>Auto-formatted. Used in website URLs</small>
              </div>
              <div className="form-group">
                <label>Contact Email</label>
                <input
                  name="contact"
                  type="email"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="contact@example.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Short Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                placeholder="Brief description for program cards (shown on main page)"
              />
            </div>

            <div className="form-group">
              <label>Full Details</label>
              <textarea
                name="fullDetails"
                value={formData.fullDetails}
                onChange={handleInputChange}
                rows="6"
                placeholder="Detailed program explanation (shown on detail page)"
              />
            </div>

            <div className="form-group">
              <label>Benefits</label>
              <textarea
                name="benefits"
                value={formData.benefits}
                onChange={handleInputChange}
                rows="4"
                placeholder="List benefits separated by commas&#10;e.g. Funding support, Mentorship, Networking opportunities"
              />
              <small>Enter each benefit on a new line or separated by commas</small>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Program Image URL</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                />
                <input
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/program-image.jpg"
                />
                <small>Paste the full URL of the program image or upload a file.</small>
              </div>

              <div className="form-group">
                <label>Display Order</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="0"
                />
              </div>
            </div>

            {imagePreview && (
              <div className="image-preview">
                <img
                  src={imagePreview}
                  alt="Preview"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                  }}
                />
              </div>
            )}

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="active"
                  checked={formData.active}
                  onChange={handleInputChange}
                />
                <span>Active on Website</span>
              </label>
              <small>Check this to display the program on the website</small>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-save">
                ✓ Save Program
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Programs List */}
      <div className="programs-grid">
        {programs.length > 0 ? (
          programs.map((program) => (
            <div key={program._id} className="program-card">
              {program.image && (
                <div className="program-image-wrapper">
                  <img
                    src={program.image}
                    alt={program.title}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                    }}
                  />
                </div>
              )}
              <div className="program-card-content">
                <h3>{program.title}</h3>
                <p className="category">{program.category}</p>
                {program.description && (
                  <p className="description">{program.description.substring(0, 100)}...</p>
                )}
                <div className="program-meta">
                  <span className="order-badge">Order: {program.order}</span>
                  <span className={`status-badge ${program.active ? 'active' : 'inactive'}`}>
                    {program.active ? '✓ Active' : '○ Inactive'}
                  </span>
                </div>
                {program.contact && (
                  <p className="contact-info">📧 {program.contact}</p>
                )}
                <div className="program-actions">
                  <button
                    onClick={() => handleEdit(program)}
                    className="action-btn action-edit"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(program._id)}
                    className="action-btn action-delete"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
            <p>No programs yet. Create your first program to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPrograms;
