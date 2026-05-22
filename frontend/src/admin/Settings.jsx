import { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '../services/api';
import '../styles/admin-forms.css';

const defaultValues = [
  'Innovation',
  'Excellence',
  'Collaboration',
  'Integrity',
  'Diversity',
  'Adaptability',
  'Relevance'
];

const defaultGoals = [
  {
    title: 'Goal 1: Foster Dynamic Entrepreneurial Ecosystem',
    objectives: [
      'To support start-ups through growth-oriented incubation services.',
      'To contribute to the local entrepreneurship ecosystem building.'
    ]
  },
  {
    title: 'Goal 2: To identify, nurture and support entrepreneurial talent and innovation.',
    objectives: [
      'To identify and enable students with business ideas into entrepreneurs.',
      'To promote entrepreneurship and creative problem solving in staff and students.',
      'To offer business support services'
    ]
  },
  {
    title: 'Goal 3: To establish and maintain strategic partnerships, locally, nationally and internationally.',
    objectives: [
      'To facilitate strategic relationships through collaborations, networks, linkages and partnerships.',
      'To leverage resources through our partnerships.'
    ]
  },
  {
    title: 'Goal 4: To contribute to applied research in entrepreneurship development.',
    objectives: [
      'To conduct applied research in entrepreneurship to inform policy and practice.',
      'To provide consultancy services in entrepreneurship'
    ]
  }
];

const defaultAchievements = [
  { year: '2020', message: 'INCEPTION OF UMPCFERI INFRASTRUCTURAL DEVELOPMENT. UMP PARTICIPATED VIRTUALLY IN EDHE NATIONAL ROUNDS DURING LOCKDOWN.' },
  { year: '2021', message: 'CONTINUED PARTNERSHIP/MOA WITH SEDFA. STUDENTPRENEUR ADVANCED TO EDHE NATIONAL FINALS. CENTRE ACQUIRED STATE-OF-THE-ART EQUIPMENT AND INFRASTRUCTURE FOR SHARED WORKING SPACES AND THE ENTREPRENEURSHIP HUB.' },
  { year: '2022', message: 'UMPCFERI WON THE BEST PITCH AWARD AT UNIFIC SUMMIT (MALAYSIA). MOA SIGNED WITH 11 ASIAN UNIVERSITIES CONSORTIUM. 6 STUDENTPRENEURS COMPETED IN THE EDHE REGIONAL ROUNDS AND 3 ADVANCED TO THE NATIONAL ROUNDS.' },
  { year: '2023', message: 'GRAND OPENING OF UMPCFERI, INCLUDING ENTREPRENEURSHIP EXHIBITION. HOSTED EDHE REGIONAL ROUNDS WITH 3 OTHER UNIVERSITIES. HOSTED POP-UP MARKET (CBD, PARTNERSHIP WITH SEDFA). LAUNCHED UMP SWEEP CHAPTER WITH STANDARD BANK, OLD MUTUAL, ETC. UMP STUDENTPRENEURS WON BRAND FUSION SA PITCH TOUR (TOP 3 PRIZES IN MPUMALANGA). 2 STUDENTPRENEURS REPRESENTED MPUMALANGA AT THE CAPE TOWN INNOVATION SUMMIT (FUNDED BY TIA, MLAB, AND SET UP A START-UP).' },
  { year: '2024', message: 'UMPCFERI TEAM WON 1ST PLACE IN THE PHILIPPINES (UNIC HEALTH & WELLNESS IDEATHON) WITH THE MANGO AGROPROCESSING PROJECT. HOSTED THE 1ST UMP ENTREPRENEURSHIP SUMMIT. HOSTED THE 1ST WOMEN IN LEADERSHIP CONFERENCE (SWEEP). 1ST CONTRACT FROM THE GOVERNMENT DEPARTMENT DEDT TO DEVELOP MPUMALANGA INFORMAL SECTOR POLICY. SIGNED MOU WITH TUT; RENEWED MOU WITH SEDA (FUNDING). CO-AUTHORED 2 BOOKS ON UNIVERSITY-LED ENTREPRENEURSHIP. SECURED EDHE EAO AND UCDP FUNDING.' },
  { year: '2025', message: 'HOSTED AFRICA-ASIA ROUNDTABLE EVENT WITH MORE THAN 90 DELEGATES FROM MORE THAN 11 COUNTRIES. ENTREPRENEURSHIP BOOTCAMP (SKILLS + INCUBATION PIPELINE). SWEEP BRANDING MASTERCLASS. EDHE-FULBRIGHT WORKSHOP ON EMBEDDING ENTREPRENEURSHIP INTO THE CURRICULUM. STANDARD BANK PITCHING MASTERCLASS. UMPCFERI STUDENTPRENEUR WINS 1ST PLACE AT THE ABSA/YAEI 2025 COMPETITION. UMPCFERI STAKEHOLDER ENGAGEMENT. CFERI WINS ENGAGEMENT TEAM EXCELLENCE AWARDS.' },
  { year: '2026', message: 'HOSTED EDHE ABSA ENTREPRENEURSHIP INNOVARSITY 2026 NATIONAL LUNCH ON 17 APRIL 2026 AT UNIVERSITY OF MPUMALANGA.' }
];

const AdminSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    slideInterval: 5000,
    slideTransition: 'fade',
    autoPlay: true,
    showNavigation: true,
    showDots: true,
    siteName: 'UMP CFERI Platform',
    siteDescription: '',
    contactEmail: '',
    contactPhone: '',
    aboutDescription: '',
    mission: '',
    vision: '',
    achievementsHeading: "CFERI'S KEY ACHIEVEMENTS",
    values: defaultValues,
    goals: defaultGoals,
    achievements: defaultAchievements,
    socialLinks: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: ''
    }
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data } = await getSettings();
      setSettings(data);
      setFormData({
        slideInterval: data.slideInterval || 5000,
        slideTransition: data.slideTransition || 'fade',
        autoPlay: data.autoPlay !== false,
        showNavigation: data.showNavigation !== false,
        showDots: data.showDots !== false,
        siteName: data.siteName || 'UMP CFERI Platform',
        siteDescription: data.siteDescription || '',
        contactEmail: data.contactEmail || '',
        contactPhone: data.contactPhone || '',
        aboutDescription: data.aboutDescription || '',
        mission: data.mission || '',
        vision: data.vision || '',
        achievementsHeading: data.achievementsHeading || "CFERI'S KEY ACHIEVEMENTS",
        values: data.values?.length ? data.values : defaultValues,
        goals: data.goals?.length ? data.goals : defaultGoals,
        achievements: data.achievements?.length ? data.achievements : defaultAchievements,
        socialLinks: data.socialLinks || {
          facebook: '',
          twitter: '',
          linkedin: '',
          instagram: ''
        }
      });
    } catch (err) {
      console.error('Failed to fetch settings', err);
      setError('Unable to load settings');
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

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      socialLinks: {
        ...formData.socialLinks,
        [name]: value
      }
    });
  };

  const updateArrayField = (field, index, value) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData({ ...formData, [field]: updated });
  };

  const addArrayItem = (field, defaultValue) => {
    setFormData({ ...formData, [field]: [...formData[field], defaultValue] });
  };

  const removeArrayItem = (field, index) => {
    setFormData({ ...formData, [field]: formData[field].filter((_, i) => i !== index) });
  };

  const updateGoalField = (goalIndex, key, value) => {
    const updatedGoals = [...formData.goals];
    updatedGoals[goalIndex] = {
      ...updatedGoals[goalIndex],
      [key]: value
    };
    setFormData({ ...formData, goals: updatedGoals });
  };

  const updateGoalObjective = (goalIndex, objectiveIndex, value) => {
    const updatedGoals = [...formData.goals];
    const updatedObjectives = [...updatedGoals[goalIndex].objectives];
    updatedObjectives[objectiveIndex] = value;
    updatedGoals[goalIndex].objectives = updatedObjectives;
    setFormData({ ...formData, goals: updatedGoals });
  };

  const addGoalObjective = (goalIndex) => {
    const updatedGoals = [...formData.goals];
    updatedGoals[goalIndex].objectives = [...updatedGoals[goalIndex].objectives, ''];
    setFormData({ ...formData, goals: updatedGoals });
  };

  const removeGoalObjective = (goalIndex, objectiveIndex) => {
    const updatedGoals = [...formData.goals];
    updatedGoals[goalIndex].objectives = updatedGoals[goalIndex].objectives.filter((_, i) => i !== objectiveIndex);
    setFormData({ ...formData, goals: updatedGoals });
  };

  const updateAchievementField = (index, key, value) => {
    const updated = [...formData.achievements];
    updated[index] = { ...updated[index], [key]: value };
    setFormData({ ...formData, achievements: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      await updateSettings(formData);
      setSuccess('Settings updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Failed to update settings', err);
      setError(err.response?.data?.message || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading settings...</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>⚙️ Settings & Configuration</h1>
      </div>

      {error && <div className="admin-alert error">{error}</div>}
      {success && <div className="admin-alert success">{success}</div>}

      <form onSubmit={handleSubmit} className="admin-form-container">
        {/* Slideshow Settings */}
        <div className="settings-section">
          <h2> Slideshow Settings</h2>
          <p className="section-description">Configure how your homepage slideshow behaves</p>

          <div className="form-row">
            <div className="form-group">
              <label>Slide Interval (milliseconds)</label>
              <input
                type="number"
                name="slideInterval"
                value={formData.slideInterval}
                onChange={handleInputChange}
                min="1000"
                step="500"
                placeholder="5000"
              />
              <small>Time between slides (e.g., 5000 = 5 seconds)</small>
            </div>

            <div className="form-group">
              <label>Transition Animation</label>
              <select
                name="slideTransition"
                value={formData.slideTransition}
                onChange={handleInputChange}
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
                  checked={formData.autoPlay}
                  onChange={handleInputChange}
                />
                <span>Auto-play on Page Load</span>
              </label>
              <small>Slideshow will automatically start when users visit the site</small>
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="showNavigation"
                  checked={formData.showNavigation}
                  onChange={handleInputChange}
                />
                <span>Show Navigation Arrows</span>
              </label>
              <small>Allow users to manually navigate slides</small>
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="showDots"
                  checked={formData.showDots}
                  onChange={handleInputChange}
                />
                <span>Show Indicator Dots</span>
              </label>
              <small>Display slide indicators at the bottom</small>
            </div>
          </div>
        </div>

        {/* Site Information */}
        <div className="settings-section">
          <h2> Site Information</h2>
          <p className="section-description">Basic information about your organization</p>

          <div className="form-row">
            <div className="form-group">
              <label>Site Name</label>
              <input
                type="text"
                name="siteName"
                value={formData.siteName}
                onChange={handleInputChange}
                placeholder="UMP CFERI Platform"
              />
            </div>

            <div className="form-group">
              <label>Site Description</label>
              <input
                type="text"
                name="siteDescription"
                value={formData.siteDescription}
                onChange={handleInputChange}
                placeholder="Brief description of your organization"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleInputChange}
                placeholder="contact@umpferi.com"
              />
            </div>

            <div className="form-group">
              <label>Contact Phone</label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
        </div>

        {/* About Page Content */}
        <div className="settings-section">
          <h2> About Page Content</h2>
          <p className="section-description">Update the About page copy, values, goals and achievements</p>

          <div className="form-group">
            <label>About Description</label>
            <textarea
              name="aboutDescription"
              value={formData.aboutDescription}
              onChange={handleInputChange}
              rows="4"
              placeholder="Describe UMPCFERI for the About page"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Mission</label>
              <textarea
                name="mission"
                value={formData.mission}
                onChange={handleInputChange}
                rows="3"
                placeholder="Our mission statement"
              />
            </div>
            <div className="form-group">
              <label>Vision</label>
              <textarea
                name="vision"
                value={formData.vision}
                onChange={handleInputChange}
                rows="3"
                placeholder="Our vision statement"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Achievements Heading</label>
            <input
              type="text"
              name="achievementsHeading"
              value={formData.achievementsHeading}
              onChange={handleInputChange}
              placeholder="CFERI'S KEY ACHIEVEMENTS"
            />
          </div>

          <div className="form-group">
            <label>Values</label>
            {formData.values.map((value, index) => (
              <div key={index} className="form-inline-row">
                <input
                  value={value}
                  onChange={(e) => updateArrayField('values', index, e.target.value)}
                  placeholder={`Value ${index + 1}`}
                />
                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => removeArrayItem('values', index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn-add"
              onClick={() => addArrayItem('values', '')}
            >
              + Add Value
            </button>
          </div>

          <div className="form-group">
            <label>Goals and Objectives</label>
            {formData.goals.map((goal, goalIndex) => (
              <div key={goalIndex} className="section-nested">
                <div className="form-row">
                  <div className="form-group">
                    <label>Goal Title</label>
                    <input
                      value={goal.title}
                      onChange={(e) => updateGoalField(goalIndex, 'title', e.target.value)}
                      placeholder={`Goal ${goalIndex + 1} title`}
                    />
                  </div>
                  <div className="form-group action-group">
                    <button
                      type="button"
                      className="btn-remove"
                      onClick={() => removeArrayItem('goals', goalIndex)}
                    >
                      Remove Goal
                    </button>
                  </div>
                </div>
                {goal.objectives.map((objective, objectiveIndex) => (
                  <div key={objectiveIndex} className="form-inline-row">
                    <input
                      value={objective}
                      onChange={(e) => updateGoalObjective(goalIndex, objectiveIndex, e.target.value)}
                      placeholder={`Objective ${objectiveIndex + 1}`}
                    />
                    <button
                      type="button"
                      className="btn-remove"
                      onClick={() => removeGoalObjective(goalIndex, objectiveIndex)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn-add"
                  onClick={() => addGoalObjective(goalIndex)}
                >
                  + Add Objective
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn-add"
              onClick={() => addArrayItem('goals', { title: '', objectives: [''] })}
            >
              + Add Goal
            </button>
          </div>

          <div className="form-group">
            <label>Achievements</label>
            {formData.achievements.map((achievement, index) => (
              <div key={index} className="section-nested">
                <div className="form-row">
                  <div className="form-group">
                    <input
                      name="year"
                      value={achievement.year}
                      onChange={(e) => updateAchievementField(index, 'year', e.target.value)}
                      placeholder="Year"
                    />
                  </div>
                  <div className="form-group action-group">
                    <button
                      type="button"
                      className="btn-remove"
                      onClick={() => removeArrayItem('achievements', index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <textarea
                  name="message"
                  value={achievement.message}
                  onChange={(e) => updateAchievementField(index, 'message', e.target.value)}
                  rows="3"
                  placeholder="Achievement details"
                />
              </div>
            ))}
            <button
              type="button"
              className="btn-add"
              onClick={() => addArrayItem('achievements', { year: '', message: '' })}
            >
              + Add Achievement
            </button>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="settings-section">
          <h2> Social Media Links</h2>
          <p className="section-description">Connect your social media accounts</p>

          <div className="form-row">
            <div className="form-group">
              <label>Facebook URL</label>
              <input
                type="url"
                name="facebook"
                value={formData.socialLinks.facebook}
                onChange={handleSocialChange}
                placeholder="https://facebook.com/yourpage"
              />
            </div>

            <div className="form-group">
              <label>Twitter URL</label>
              <input
                type="url"
                name="twitter"
                value={formData.socialLinks.twitter}
                onChange={handleSocialChange}
                placeholder="https://twitter.com/yourhandle"
              />
            </div>

            <div className="form-group">
              <label>LinkedIn URL</label>
              <input
                type="url"
                name="linkedin"
                value={formData.socialLinks.linkedin}
                onChange={handleSocialChange}
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>

            <div className="form-group">
              <label>Instagram URL</label>
              <input
                type="url"
                name="instagram"
                value={formData.socialLinks.instagram}
                onChange={handleSocialChange}
                placeholder="https://instagram.com/yourhandle"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-save"
            disabled={saving}
          >
            {saving ? '💾 Saving...' : '💾 Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
