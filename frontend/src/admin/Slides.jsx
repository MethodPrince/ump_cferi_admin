import { useState, useEffect } from 'react';
import { getSlides, createSlide, updateSlide, deleteSlide, getSettings, updateSettings } from '../services/api';
import '../styles/admin-forms.css';

const AdminSlides = () => {
  const [slides, setSlides] = useState([]);
  const [settings, setSettings] = useState({ slideInterval: 5000, slideTransition: 'fade' });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsData, setSettingsData] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    caption: '',
    image: '',
    section: 'home',
    displayMode: 'cover',
    imagePosition: 'center',
    order: 0,
    active: true
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [{ data: slideData }, { data: settingsDataResp }] = await Promise.all([
        getSlides(),
        getSettings()
      ]);
      setSlides(slideData);
      setSettings(settingsDataResp);
      setSettingsData({
        slideInterval: settingsDataResp.slideInterval || 5000,
        slideTransition: settingsDataResp.slideTransition || 'fade',
        autoPlay: settingsDataResp.autoPlay !== false,
        showNavigation: settingsDataResp.showNavigation !== false,
        showDots: settingsDataResp.showDots !== false
      });
    } catch (error) {
      console.error('Failed to load slides or settings', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditing(null);
    setImagePreview('');
    setFormData({ title: '', caption: '', image: '', section: 'home', order: 0, active: true });
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
      alert('Title and slide image are required');
      return;
    }

    try {
      if (editing) {
        await updateSlide(editing, formData);
      } else {
        await createSlide(formData);
      }
      resetForm();
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Error saving slide', error);
      alert('Unable to save slide. Please verify the image URL and try again.');
    }
  };

  const handleEdit = (slide) => {
    setEditing(slide._id);
    setFormData({
      title: slide.title || '',
      caption: slide.caption || '',
      image: slide.image || '',
      section: slide.section || 'home',
      order: slide.order || 0,
      active: slide.active !== false
    });
    setImagePreview(slide.image || '');
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this slide permanently?')) return;
    try {
      await deleteSlide(id);
      fetchData();
    } catch (error) {
      console.error('Failed to delete slide', error);
      alert('Unable to delete slide.');
    }
  };

  const handleSettingsChange = (e) => {
    const { name, type, value, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setSettingsData({ ...settingsData, [name]: newValue });
  };

  const handleSettingsSave = async () => {
    try {
      await updateSettings(settingsData);
      setSettings(settingsData);
      setSettingsOpen(false);
      alert('Slideshow settings updated successfully!');
    } catch (error) {
      console.error('Failed to update settings', error);
      alert('Unable to update slideshow settings.');
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading slideshow editor...</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>🎞️ Slideshow Management</h1>
          <p className="section-description">Manage homepage hero slides and moving pictures shown on the home page.</p>
        </div>
        <div>
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="admin-add-btn"
            style={{ marginRight: '1rem' }}
          >
            {settingsOpen ? 'Close Settings' : '⚙️ Settings'}
          </button>
          <button
            onClick={() => {
              setShowForm(!showForm);
              resetForm();
            }}
            className="admin-add-btn"
          >
            {showForm ? 'Cancel' : '+ Add Slide'}
          </button>
        </div>
      </div>

      {/* Slideshow Settings */}
      {settingsOpen && (
        <div className="admin-form-container">
          <h2>⚙️ Configure Slideshow</h2>
          <form className="admin-form">
            <div className="settings-section">
              <p className="section-description">Adjust how your slideshow behaves on the homepage</p>

              <div className="form-row">
                <div className="form-group">
                  <label>Interval Between Slides (milliseconds)</label>
                  <input
                    type="number"
                    name="slideInterval"
                    value={settingsData.slideInterval}
                    onChange={handleSettingsChange}
                    min="1000"
                    step="500"
                  />

              <div className="form-row">
                <div className="form-group">
                  <label>Image Display Mode</label>
                  <select
                    name="displayMode"
                    value={formData.displayMode}
                    onChange={handleInputChange}
                  >
                    <option value="cover">Cover</option>
                    <option value="contain">Contain</option>
                  </select>
                  <small>How slide images fill the slide area</small>
                </div>
                <div className="form-group">
                  <label>Image Position</label>
                  <select
                    name="imagePosition"
                    value={formData.imagePosition}
                    onChange={handleInputChange}
                  >
                    <option value="center">Center</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>
                  <small>How long each slide displays (5000 = 5 seconds)</small>
                </div>

                <div className="form-group">
                  <label>Transition Animation</label>
                  <select
                    name="slideTransition"
                    value={settingsData.slideTransition}
                    onChange={handleSettingsChange}
                  >
                    <option value="fade">Fade</option>
                    <option value="slide">Slide</option>
                    <option value="zoom">Zoom</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="autoPlay"
                      checked={settingsData.autoPlay !== false}
                      onChange={handleSettingsChange}
                    />
                    <span>Auto-play Slideshow</span>
                  </label>
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="showNavigation"
                      checked={settingsData.showNavigation !== false}
                      onChange={handleSettingsChange}
                    />
                    <span>Show Navigation Arrows</span>
                  </label>
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="showDots"
                      checked={settingsData.showDots !== false}
                      onChange={handleSettingsChange}
                    />
                    <span>Show Indicator Dots</span>
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleSettingsSave}
                  className="btn-save"
                >
                  💾 Save Settings
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Add/Edit Slide Form */}
      {showForm && (
        <div className="admin-form-container">
          <h2>{editing ? 'Edit Slide' : 'Add New Slide'}</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <label>Title *</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Slide title"
                />
              </div>
              <div className="form-group">
                <label>Caption/Subtitle</label>
                <input
                  name="caption"
                  value={formData.caption}
                  onChange={handleInputChange}
                  placeholder="Optional caption for the slide"
                />
              </div>
            <div className="form-group">
              <label>Slide Section</label>
              <select
                name="section"
                value={formData.section}
                onChange={handleInputChange}
              >
                <option value="home">Home Page</option>
                <option value="programs">Programs Page</option>
                <option value="gallery">Gallery Page</option>
                <option value="about">About Page</option>
                <option value="other">Other</option>
              </select>
              <small>Choose where this slide should appear.</small>
            </div>
              <small>Choose an image file to upload for the slide.</small>
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
              <small>Or paste the full URL of the slide image (recommended: 1920x1080 or similar aspect ratio)</small>
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

            {imagePreview && (
              <div className="image-preview">
                <img
                  src={imagePreview}
                  alt="Preview"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x300?text=Image+Not+Found';
                  }}
                />
              </div>
            )}

            <div className="form-actions">
              <button type="submit" className="btn-save">
                ✓ Save Slide
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Slides List */}
      <div className="slides-grid">
        {slides.length > 0 ? (
          slides.map((slide, index) => (
            <div key={slide._id} className="slide-card">
              <div className="slide-number">{index + 1}</div>
              <div className="slide-image-wrapper">
                <img
                  src={slide.image}
                  alt={slide.title}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x300?text=Image+Not+Found';
                  }}
                />
                <span className={`status-badge ${slide.active ? 'active' : 'inactive'}`}>
                  {slide.active ? '✓ Active' : '○ Inactive'}
                </span>
              </div>
              <div className="slide-card-content">
                <h3>{slide.title}</h3>
                <p className="slide-section">Section: {slide.section || 'home'}</p>
                {slide.caption && <p className="caption">{slide.caption}</p>}
                <p className="order-info">Position: {slide.order}</p>
                <div className="slide-actions">
                  <button
                    onClick={() => handleEdit(slide)}
                    className="action-btn action-edit"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(slide._id)}
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
            <p>No slides yet. Create your first slide to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSlides;
