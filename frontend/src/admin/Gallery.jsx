import { useState, useEffect } from 'react';
import { getGalleryImages, createGalleryImage, updateGalleryImage, deleteGalleryImage } from '../services/api';
import '../styles/admin-forms.css';

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'highlight',
    image: '',
    order: 0,
    active: true
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data } = await getGalleryImages();
      setImages(data);
    } catch (error) {
      console.error('Failed to fetch gallery images', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditing(null);
    setImagePreview('');
    setFormData({
      title: '',
      description: '',
      category: 'highlight',
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

    if (!formData.title || !formData.image) {
      alert('Title and image URL are required');
      return;
    }

    try {
      if (editing) {
        await updateGalleryImage(editing, formData);
      } else {
        await createGalleryImage(formData);
      }
      resetForm();
      setShowForm(false);
      fetchImages();
    } catch (error) {
      console.error('Error saving image', error);
      alert('Unable to save image. Please try again.');
    }
  };

  const handleEdit = (image) => {
    setEditing(image._id);
    setFormData({
      title: image.title || '',
      description: image.description || '',
      category: image.category || 'highlight',
      image: image.image || '',
      order: image.order || 0,
      active: image.active !== false
    });
    setImagePreview(image.image || '');
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this image permanently?')) return;
    try {
      await deleteGalleryImage(id);
      fetchImages();
    } catch (error) {
      console.error('Failed to delete image', error);
      alert('Unable to delete image.');
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading gallery...</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>🖼️ Gallery Management</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            resetForm();
          }}
          className="admin-add-btn"
        >
          {showForm ? 'Cancel' : '+ Add Image'}
        </button>
      </div>

      {showForm && (
        <div className="admin-form-container">
          <h2>{editing ? 'Edit Gallery Image' : 'Add Gallery Image'}</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                />
                <label>Title *</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Image title"
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="highlight">Highlight</option>
                  <option value="event">Event</option>
                  <option value="team">Team</option>
                  <option value="project">Project</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                placeholder="Image description"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Image URL *</label>
                <input
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                  placeholder="https://example.com/image.jpg"
                />
                <small>Paste the full URL of the image</small>
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
                <img src={imagePreview} alt="Preview" onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                }} />
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
                <span>Active</span>
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-save">✓ Save Image</button>
            </div>
          </form>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {images.length > 0 ? (
          images.map((image) => (
            <div key={image._id} className="gallery-card">
              <div className="gallery-image-wrapper">
                <img
                  src={image.image}
                  alt={image.title}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                  }}
                />
                <span className={`status-badge ${image.active ? 'active' : 'inactive'}`}>
                  {image.active ? '✓ Active' : '○ Inactive'}
                </span>
              </div>
              <div className="gallery-card-content">
                <h3>{image.title}</h3>
                <p className="category-tag">{image.category}</p>
                {image.description && <p className="description">{image.description}</p>}
                <p className="order-info">Order: {image.order}</p>
                <div className="gallery-actions">
                  <button
                    onClick={() => handleEdit(image)}
                    className="action-btn action-edit"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(image._id)}
                    className="action-btn action-delete"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No gallery images yet. Create one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGallery;
