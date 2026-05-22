import { useState, useEffect } from 'react';
import {
  getNewsletterPages,
  createNewsletterPage,
  updateNewsletterPage,
  deleteNewsletterPage,
  BACKEND_URL,
} from '../services/api';
import '../styles/admin-forms.css';

const AdminNewsletter = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPageId, setEditingPageId] = useState(null);
  const [preview, setPreview] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    alt: 'Newsletter page',
    image: '',
    order: 0,
    active: true,
  });

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    setLoading(true);
    try {
      const response = await getNewsletterPages();
      setPages(response.data);
    } catch (error) {
      console.error('Unable to load newsletter pages', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingPageId(null);
    setPreview('');
    setFormData({
      title: '',
      alt: 'Newsletter page',
      image: '',
      order: 0,
      active: true,
    });
    setShowForm(false);
  };

  const resolveImageUrl = (image) => {
    if (!image) {
      return '';
    }
    return image.startsWith('http') ? image : `${BACKEND_URL}${image}`;
  };

  const handleEdit = (page) => {
    setEditingPageId(page._id);
    setFormData({
      title: page.title || '',
      alt: page.alt || 'Newsletter page',
      image: page.image || '',
      order: page.order || 0,
      active: page.active !== false,
    });
    setPreview(resolveImageUrl(page.image || ''));
    setShowForm(true);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title || !formData.image) {
      alert('Please provide a title and image for the newsletter page.');
      return;
    }

    try {
      if (editingPageId) {
        await updateNewsletterPage(editingPageId, formData);
      } else {
        await createNewsletterPage(formData);
      }
      await loadPages();
      resetForm();
    } catch (error) {
      console.error('Unable to save newsletter page', error);
      alert('Could not save newsletter page. Please try again.');
    }
  };

  const handleDelete = async (pageId) => {
    if (!window.confirm('Remove this newsletter page?')) {
      return;
    }

    try {
      await deleteNewsletterPage(pageId);
      await loadPages();
    } catch (error) {
      console.error('Unable to delete newsletter page', error);
      alert('Could not delete newsletter page.');
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header-row">
        <div>
          <h2>Newsletter Pages</h2>
          <p>Upload and manage newsletter pages for the website.</p>
        </div>
        <button className="primary-button" onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? 'Hide Form' : 'Add New Page'}
        </button>
      </div>

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="alt">Image Alt Text</label>
            <input
              id="alt"
              name="alt"
              type="text"
              value={formData.alt}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-row">
            <label htmlFor="order">Order</label>
            <input
              id="order"
              name="order"
              type="number"
              value={formData.order}
              onChange={handleInputChange}
              min="0"
            />
          </div>

          <div className="form-row">
            <label htmlFor="image">Image File</label>
            <input id="image" name="image" type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          {preview && (
            <div className="form-row">
              <label>Preview</label>
              <img src={preview} alt="Preview" className="preview-image" />
            </div>
          )}

          <div className="form-row form-actions">
            <button type="submit" className="primary-button">
              {editingPageId ? 'Update Page' : 'Create Page'}
            </button>
            <button type="button" className="secondary-button" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="admin-list">
        {loading ? (
          <p>Loading newsletter pages…</p>
        ) : pages.length ? (
          pages.map((page) => (
            <div key={page._id} className="admin-card">
              <div className="admin-card-body">
                <div>
                  <h3>{page.title}</h3>
                  <p>{page.alt}</p>
                  <p>Order: {page.order}</p>
                </div>
                {page.image && <img src={resolveImageUrl(page.image)} alt={page.alt} className="admin-thumbnail" />}
              </div>
              <div className="admin-card-actions">
                <button className="primary-button" onClick={() => handleEdit(page)}>
                  Edit
                </button>
                <button className="secondary-button" onClick={() => handleDelete(page._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No newsletter pages have been added yet.</p>
        )}
      </div>
    </div>
  );
};

export default AdminNewsletter;
