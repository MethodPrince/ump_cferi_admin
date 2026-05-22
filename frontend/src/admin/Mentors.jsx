import { useState, useEffect } from 'react';
import { getMentors, createMentor, updateMentor, deleteMentor } from '../services/api';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/admin.css';

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    expertise: '',
    bio: '',
    availability: 'available',
    company: '',
    yearsExperience: '',
    linkedin: ''
  });

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  useEffect(() => {
    fetchMentors();
    if (query.get('action') === 'add') {
      setShowForm(true);
    }
  }, [query]);

  const fetchMentors = async () => {
    try {
      const { data } = await getMentors();
      setMentors(data);
    } catch (error) {
      console.error('Error fetching mentors:', error);
      // If mentors endpoint doesn't exist yet, set empty array
      setMentors([]);
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
    try {
      if (editing) {
        await updateMentor(editing, formData);
      } else {
        await createMentor(formData);
      }
      setShowForm(false);
      setEditing(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        expertise: '',
        bio: '',
        availability: 'available',
        company: '',
        yearsExperience: '',
        linkedin: ''
      });
      fetchMentors();
    } catch (error) {
      console.error('Error saving mentor:', error);
      alert('Error saving mentor. Please try again.');
    }
  };

  const handleEdit = (mentor) => {
    setEditing(mentor._id);
    setFormData({
      name: mentor.name || '',
      email: mentor.email || '',
      phone: mentor.phone || '',
      expertise: mentor.expertise || '',
      bio: mentor.bio || '',
      availability: mentor.availability || 'available',
      company: mentor.company || '',
      yearsExperience: mentor.yearsExperience || '',
      linkedin: mentor.linkedin || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this mentor?')) {
      try {
        await deleteMentor(id);
        fetchMentors();
      } catch (error) {
        console.error('Error deleting mentor:', error);
        alert('Error deleting mentor. Please try again.');
      }
    }
  };

  const handleToggleAvailability = async (mentor) => {
    try {
      const newAvailability = mentor.availability === 'available' ? 'unavailable' : 'available';
      await updateMentor(mentor._id, { ...mentor, availability: newAvailability });
      fetchMentors();
    } catch (error) {
      console.error('Error updating mentor:', error);
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading...</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Manage Mentors</h1>
        <button onClick={() => {
          setShowForm(!showForm);
          setEditing(null);
          setFormData({
            name: '',
            email: '',
            phone: '',
            expertise: '',
            bio: '',
            availability: 'available',
            company: '',
            yearsExperience: '',
            linkedin: ''
          });
        }} className="admin-add-btn">
          {showForm ? 'Cancel' : '+ Add New Mentor'}
        </button>
      </div>

      {showForm && (
        <div className="admin-form-container">
          <h2>{editing ? 'Edit Mentor' : 'Add New Mentor'}</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Dr. Jane Smith"
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="jane.smith@example.com"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+27 13 002 0000"
                />
              </div>
              <div className="form-group">
                <label>Company/Organization</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="e.g., ABC Corp"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Expertise/Industry *</label>
                <input
                  type="text"
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Technology, Finance, Marketing"
                />
              </div>
              <div className="form-group">
                <label>Years of Experience</label>
                <input
                  type="number"
                  name="yearsExperience"
                  value={formData.yearsExperience}
                  onChange={handleInputChange}
                  placeholder="e.g., 10"
                  min="0"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Availability Status</label>
                <select name="availability" value={formData.availability} onChange={handleInputChange}>
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                  <option value="limited">Limited Availability</option>
                </select>
              </div>
              <div className="form-group">
                <label>LinkedIn Profile</label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Bio/Background</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows="4"
                placeholder="Describe mentor's background, expertise, and experience..."
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-save">
                {editing ? 'Update Mentor' : 'Save Mentor'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-cancel">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-mentors-grid">
        {mentors.length > 0 ? (
          mentors.map(mentor => (
            <div key={mentor._id} className={`admin-mentor-card ${mentor.availability}`}>
              <div className="mentor-card-header">
                <h3>{mentor.name}</h3>
                <span className={`availability-badge ${mentor.availability}`}>
                  {mentor.availability}
                </span>
              </div>
              <p className="mentor-expertise"><strong>Expertise:</strong> {mentor.expertise}</p>
              {mentor.company && <p className="mentor-company">{mentor.company}</p>}
              {mentor.email && <p className="mentor-email">✉️ {mentor.email}</p>}
              {mentor.phone && <p className="mentor-phone">📞 {mentor.phone}</p>}
              {mentor.yearsExperience && <p className="mentor-experience">📊 {mentor.yearsExperience} years experience</p>}
              {mentor.bio && <p className="mentor-bio">{mentor.bio}</p>}
              
              <div className="mentor-actions">
                <button onClick={() => handleToggleAvailability(mentor)} className="btn-toggle">
                  Toggle Availability
                </button>
                <button onClick={() => handleEdit(mentor)} className="btn-edit">Edit</button>
                <button onClick={() => handleDelete(mentor._id)} className="btn-delete">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">No mentors found. Add your first mentor!</p>
        )}
      </div>
    </div>
  );
};

export default Mentors;