import { useState, useEffect } from 'react';
import { getPages, createPage, updatePage, deletePage } from '../services/api';
import '../styles/admin-forms.css';

const AdminPages = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    showInNav: false,
    order: 0,
    active: true
  });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const { data } = await getPages(true);
      setPages(data);
    } catch (error) {
      console.error('Failed to fetch pages', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditing(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      showInNav: false,
      order: 0,
      active: true
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      slug: formData.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-'),
    };

    if (!payload.title || !payload.slug) {
      alert('Title and slug are required');
      return;
    }

    try {
      if (editing) {
        await updatePage(editing, payload);
      } else {
        await createPage(payload);
      }
      resetForm();
      setShowForm(false);
      fetchPages();
    } catch (error) {
      console.error('Error saving page', error);
      alert('Unable to save page. Please check the fields and try again.');
    }
  };

  const handleEdit = (page) => {
    setEditing(page._id);
    setFormData({
      title: page.title || '',
      slug: page.slug || '',
      excerpt: page.excerpt || '',
      content: page.content || '',
      showInNav: page.showInNav || false,
      order: page.order || 0,
      active: page.active !== false
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this page permanently?')) return;
    try {
      await deletePage(id);
      fetchPages();
    } catch (error) {
      console.error('Failed to delete page', error);
      alert('Unable to delete page.');
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading pages...</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>📝 Page Management</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            resetForm();
          }}
          className="admin-add-btn"
        >
          {showForm ? 'Cancel' : '+ Add Page'}
        </button>
      </div>

      {showForm && (
        <div className="admin-form-container">
          <h2>{editing ? 'Edit Page' : 'Create New Page'}</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <label>Title *</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Page title"
                />
              </div>
              <div className="form-group">
                <label>Slug (URL) *</label>
                <input
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                  placeholder="page-slug"
                />
                <small>Used in the website URL like /pages/page-slug</small>
              </div>
            </div>

            <div className="form-group">
              <label>Excerpt</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows="3"
                placeholder="Short summary that appears near the title"
              />
            </div>

            <div className="form-group">
              <label>Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows="8"
                placeholder="Page content. Use line breaks to separate paragraphs."
              />
            </div>

            <div className="form-row">
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="showInNav"
                    checked={formData.showInNav}
                    onChange={handleInputChange}
                  />
                  <span>Show in header navigation</span>
                </label>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleInputChange}
                  />
                  <span>Active</span>
                </label>
              </div>
            </div>

            <div className="form-row">
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

            <div className="form-actions">
              <button type="submit" className="btn-save">✓ Save Page</button>
            </div>
          </form>
        </div>
      )}

      <div className="pages-grid">
        {pages.length > 0 ? (
          pages.map((page) => (
            <div key={page._id} className="page-card">
              <div className="page-card-header">
                <h3>{page.title}</h3>
                <span className={`status-badge ${page.active ? 'active' : 'inactive'}`}>
                  {page.active ? '✓ Live' : '○ Offline'}
                </span>
              </div>
              <p className="slug-text">/{`pages/${page.slug}`}</p>
              {page.excerpt && <p>{page.excerpt}</p>}
              <div className="page-meta">
                <span>{page.showInNav ? 'In nav' : 'Hidden from nav'}</span>
                <span>Order: {page.order}</span>
              </div>
              <div className="page-actions">
                <button onClick={() => handleEdit(page)} className="action-btn action-edit">✏️ Edit</button>
                <button onClick={() => handleDelete(page._id)} className="action-btn action-delete">🗑️ Delete</button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No pages yet. Create a page from the form above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPages;
