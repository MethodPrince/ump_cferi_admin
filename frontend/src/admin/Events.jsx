import { useState, useEffect } from 'react';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../services/api';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/admin.css';

const EventsAdmin = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    type: 'workshop'
  });

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  useEffect(() => {
    fetchEvents();
    if (query.get('action') === 'add') {
      setShowForm(true);
    }
  }, [query]);

  const fetchEvents = async () => {
    try {
      const { data } = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editing) {
        await updateEvent(editing, formData);
      } else {
        await createEvent(formData);
      }
      setShowForm(false);
      setEditing(null);
      setFormData({
        title: '',
        description: '',
        date: '',
        location: '',
        type: 'workshop'
      });
      await fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Error saving event. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (event) => {
    setEditing(event._id);
    setFormData({
      title: event.title || '',
      description: event.description || '',
      date: event.date ? event.date.split('T')[0] : '',
      location: event.location || '',
      type: event.type || 'workshop'
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setDeleting(id);
      try {
        await deleteEvent(id);
        await fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Error deleting event. Please try again.');
      } finally {
        setDeleting(null);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading events..." />;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Manage Events</h1>
        <button onClick={() => {
          setShowForm(!showForm);
          setEditing(null);
          setFormData({
            title: '',
            description: '',
            date: '',
            location: '',
            type: 'workshop'
          });
        }} className="admin-add-btn">
          {showForm ? 'Cancel' : '+ Add New Event'}
        </button>
      </div>

      {showForm && (
        <div className="admin-form-container">
          <h2>{editing ? 'Edit Event' : 'Add New Event'}</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label>Event Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="e.g., Entrepreneurship Workshop 2024"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Event Type</label>
                <select name="type" value={formData.type} onChange={handleInputChange}>
                  <option value="workshop">Workshop</option>
                  <option value="seminar">Seminar</option>
                  <option value="networking">Networking</option>
                  <option value="training">Training</option>
                  <option value="Business Pitch">Business Pitch</option>
                  <option value="conference">Conference</option>
                  <option value="other">Other</option>
                  
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Mbombela Campus"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                placeholder="Describe the event..."
              />
            </div>

            <div className="form-actions">
              <button type="submit" className={`btn-save ${submitting ? 'btn-loading' : ''}`} disabled={submitting}>
                {submitting ? 'Saving...' : (editing ? 'Update Event' : 'Save Event')}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-cancel" disabled={submitting}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-events-grid">
        {events.map(event => (
          <div key={event._id} className="admin-event-card">
            <div className="event-card-header">
              <h3>{event.title}</h3>
              <span className={`event-type ${event.type}`}>{event.type}</span>
            </div>
            <p className="event-date">📅 {new Date(event.date).toLocaleDateString()}</p>
            {event.location && <p className="event-location">📍 {event.location}</p>}
            <p className="event-description">{event.description}</p>
            <div className="event-card-actions">
              <button onClick={() => handleEdit(event)} className="btn-edit" disabled={deleting}>Edit</button>
              <button onClick={() => handleDelete(event._id)} className={`btn-delete ${deleting === event._id ? 'btn-loading' : ''}`} disabled={deleting}>
                {deleting === event._id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <p className="no-data">No events found. Add your first event!</p>
        )}
      </div>
    </div>
  );
};

export default EventsAdmin;