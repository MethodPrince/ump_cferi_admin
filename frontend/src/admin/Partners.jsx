import { useState, useEffect } from 'react';
import { getPartners, createPartner, updatePartner, deletePartner } from '../services/api';
import '../styles/admin-forms.css';

const AdminPartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', logo: '', link: '', order: 0, active: true });
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const { data } = await getPartners();
      setPartners(data || []);
    } catch (err) {
      console.error('Failed to load partners', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditing(null);
    setFormData({ name: '', description: '', logo: '', link: '', order: 0, active: true });
    setImagePreview('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, logo: reader.result });
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) { alert('Name is required'); return; }
    try {
      if (editing) {
        await updatePartner(editing, formData);
      } else {
        await createPartner(formData);
      }
      resetForm();
      setShowForm(false);
      fetchData();
    } catch (err) {
      console.error('Failed to save partner', err);
      alert('Unable to save partner');
    }
  };

  const handleEdit = (p) => {
    setEditing(p._id);
    setFormData({ name: p.name || '', description: p.description || '', logo: p.logo || '', link: p.link || '', order: p.order || 0, active: p.active !== false });
    setImagePreview(p.logo || '');
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this partner?')) return;
    try {
      await deletePartner(id);
      fetchData();
    } catch (err) {
      console.error('Failed to delete partner', err);
      alert('Unable to delete partner');
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading partners...</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>🤝 Partners & Sponsors</h1>
        <div>
          <button className="admin-add-btn" onClick={() => { setShowForm(!showForm); resetForm(); }}>
            {showForm ? 'Cancel' : '+ Add Partner'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="admin-form-container">
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input name="name" value={formData.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Link (optional)</label>
                <input name="link" value={formData.link} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={3} />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Logo (upload image)</label>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                {imagePreview && <div className="image-preview"><img src={imagePreview} alt="preview" /></div>}
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} />
                  <span>Active</span>
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-save">{editing ? 'Save Changes' : 'Add Partner'}</button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-list">
        {partners.map(p => (
          <div key={p._id} className="admin-list-item">
            <div className="admin-list-item-left">
              <div className="logo-small">
                {p.logo ? ((p.logo.startsWith('/uploads/') || p.logo.startsWith('http')) ? (<img src={p.logo} alt={p.name} />) : p.logo) : (p.name?.charAt(0) || 'P')}
              </div>
              <div>
                <strong>{p.name}</strong>
                <div className="muted">{p.description}</div>
              </div>
            </div>
            <div className="admin-list-item-actions">
              <button className="btn-edit" onClick={() => handleEdit(p)}>Edit</button>
              <button className="btn-delete" onClick={() => handleDelete(p._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPartners;
