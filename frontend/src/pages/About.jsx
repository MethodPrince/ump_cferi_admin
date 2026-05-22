import { useState, useEffect } from 'react';
import { getSettings } from '../services/api';
import '../styles/about.css';

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

const About = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await getSettings();
        setSettings(data);
      } catch (error) {
        console.error('Failed to load about settings', error);
      }
    };
    fetchSettings();
  }, []);

  const aboutDescription = settings?.aboutDescription || 'UMPCFERI is a dynamic entrepreneurship hub dedicated to fostering innovation, supporting student startups, and driving economic growth through structured incubation programs and mentorship.';
  const missionText = settings?.mission || 'To foster a dynamic entrepreneurship ecosystem through development programmes, strategic partnerships, and applied research aimed at building sustainable enterprises and contributing to local, national and regional economic growth.';
  const visionText = settings?.vision || 'To be a leading entrepreneurship centre in nurturing innovative and creative enterprises for sustainable development within the African context.';
  const values = settings?.values?.length ? settings.values : defaultValues;
  const goals = settings?.goals?.length ? settings.goals : defaultGoals;
  const achievementsHeading = settings?.achievementsHeading || "CFERI'S KEY ACHIEVEMENTS";
  const journeyData = settings?.achievements?.length ? settings.achievements : defaultAchievements;

  const galleryImages = [
    { src: '/images/audiencesimages/IMG_0738.jpg', category: 'audiences', title: 'Event Audience', description: 'Engaged participants at UMPCFERI events' },
    { src: '/images/audiencesimages/IMG_0807.jpg', category: 'audiences', title: 'Event Attendees', description: 'Diverse audience showing interest' },
    { src: '/images/audiencesimages/IMG_0828.jpg', category: 'audiences', title: 'Crowd Engagement', description: 'Active participation in sessions' },
    { src: '/images/audiencesimages/IMG_0947.jpg', category: 'audiences', title: 'Audience Focus', description: 'Attentive listeners during presentations' },
    { src: '/images/audiencesimages/IMG_0961.jpg', category: 'audiences', title: 'Group Session', description: 'Interactive audience engagement' },
    { src: '/images/audiencesimages/IMG_1052.jpg', category: 'audiences', title: 'Event Participants', description: 'Community involvement' },
    { src: '/images/audiencesimages/IMG_1117.jpg', category: 'audiences', title: 'Workshop Audience', description: 'Learning and networking' },
    { src: '/images/audiencesimages/IMG_1150.jpg', category: 'audiences', title: 'Seminar Attendees', description: 'Knowledge sharing session' },
    { src: '/images/choirimages/IMG_0783.jpg', category: 'choir', title: 'Choir Performance', description: 'Cultural entertainment at events' },
    { src: '/images/choirimages/IMG_0791.jpg', category: 'choir', title: 'Musical Performance', description: 'Traditional choir singing' },
    { src: '/images/choirimages/IMG_0805.jpg', category: 'choir', title: 'Choir Group', description: 'Harmonious musical presentation' },
    { src: '/images/choirimages/IMG_0821.jpg', category: 'choir', title: 'Cultural Performance', description: 'Entertainment during events' },
    { src: '/images/groupimages/IMG_0728.jpg', category: 'groups', title: 'Team Discussion', description: 'Collaborative brainstorming session' },
    { src: '/images/groupimages/IMG_0730.jpg', category: 'groups', title: 'Group Meeting', description: 'Entrepreneurship discussions' },
    { src: '/images/groupimages/IMG_1243.jpg', category: 'groups', title: 'Workshop Group', description: 'Interactive learning session' },
    { src: '/images/groupimages/IMG_1507.jpg', category: 'groups', title: 'Team Collaboration', description: 'Working together on projects' },
    { src: '/images/groupimages/IMG_1511.jpg', category: 'groups', title: 'Group Activity', description: 'Hands-on entrepreneurship training' },
    { src: '/images/groupimages/IMG_1523.jpg', category: 'groups', title: 'Mentorship Session', description: 'Guidance and support' },
    { src: '/images/groupimages/IMG_1524.jpg', category: 'groups', title: 'Team Building', description: 'Building entrepreneurial skills' },
    { src: '/images/groupimages/IMG_1539.jpg', category: 'groups', title: 'Collaborative Work', description: 'Group project development' },
    { src: '/images/groupimages/IMG_1543.jpg', category: 'groups', title: 'Innovation Workshop', description: 'Creative problem solving' },
    { src: '/images/groupimages/IMG_1546.jpg', category: 'groups', title: 'Entrepreneurial Minds', description: 'Future business leaders' },
    { src: '/images/interactionImages/IMG_0709.jpg', category: 'interactions', title: 'Networking Session', description: 'Building connections and partnerships' },
    { src: '/images/interactionImages/IMG_0712.jpg', category: 'interactions', title: 'Interactive Discussion', description: 'Engaged conversation' },
    { src: '/images/interactionImages/IMG_0826.jpg', category: 'interactions', title: 'Mentor-Mentee', description: 'Knowledge transfer and guidance' },
    { src: '/images/interactionImages/IMG_1248.jpg', category: 'interactions', title: 'Collaborative Exchange', description: 'Sharing ideas and experiences' },
    { src: '/images/interactionImages/IMG_1260.jpg', category: 'interactions', title: 'Business Networking', description: 'Professional connections' },
    { src: '/images/interactionImages/IMG_1403.jpg', category: 'interactions', title: 'Interactive Workshop', description: 'Hands-on learning experience' },
    { src: '/images/interactionImages/IMG_1409.jpg', category: 'interactions', title: 'Group Interaction', description: 'Team collaboration' },
    { src: '/images/interactionImages/IMG_1420.jpg', category: 'interactions', title: 'Discussion Forum', description: 'Open dialogue and exchange' },
    { src: '/images/speakersimages/IMG_0756.jpg', category: 'speakers', title: 'Keynote Speaker', description: 'Expert sharing insights' },
    { src: '/images/speakersimages/IMG_0928.jpg', category: 'speakers', title: 'Panel Discussion', description: 'Expert panel sharing knowledge' },
    { src: '/images/speakersimages/IMG_0968.jpg', category: 'speakers', title: 'Guest Speaker', description: 'Industry expert presentation' },
    { src: '/images/speakersimages/IMG_1000.jpg', category: 'speakers', title: 'Motivational Speaker', description: 'Inspiring entrepreneurship' },
    { src: '/images/speakersimages/IMG_1077.jpg', category: 'speakers', title: 'Workshop Facilitator', description: 'Guiding learning sessions' },
    { src: '/images/speakersimages/IMG_1093.jpg', category: 'speakers', title: 'Industry Expert', description: 'Sharing real-world experience' },
    { src: '/images/speakersimages/IMG_1283.jpg', category: 'speakers', title: 'Entrepreneur Speaker', description: 'Success story sharing' },
    { src: '/images/speakersimages/IMG_1299.jpg', category: 'speakers', title: 'Academic Speaker', description: 'Research and education insights' },
    { src: '/images/speakersimages/IMG_1481.jpg', category: 'speakers', title: 'Leadership Speaker', description: 'Leadership and management' }
  ];

  const categories = [
    { id: 'all', name: 'All Highlights', count: galleryImages.length },
    { id: 'audiences', name: 'Event Audiences', count: galleryImages.filter(img => img.category === 'audiences').length },
    { id: 'choir', name: 'Choir Performances', count: galleryImages.filter(img => img.category === 'choir').length },
    { id: 'groups', name: 'Group Activities', count: galleryImages.filter(img => img.category === 'groups').length },
    { id: 'interactions', name: 'Interactions', count: galleryImages.filter(img => img.category === 'interactions').length },
    { id: 'speakers', name: 'Speakers & Experts', count: galleryImages.filter(img => img.category === 'speakers').length }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="about-container">
      <h1 className="about-title">About UMPCFERI</h1> 
      
      <div className="about-section">
        <h2>Centre for Entrepreneurship and Rapid Incubation</h2>
        <p className="about-description">
          {aboutDescription}
        </p>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <h3 className="about-card-title">Our Mission</h3>
          <p>{missionText}</p>
        </div>
        <div className="about-card">
          <h3 className="about-card-title">Our Vision</h3>
          <p>{visionText}</p>
        </div>
        <div className="about-card">
          <h3 className="about-card-title">Our Values</h3>
          <ul className="about-list">
            {values.map((value, index) => (
              <li key={index} className="about-list-item">✓ {value}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="about-section">
        <h2 className="about-title">Goals and Objectives</h2>
        <div className="goals-grid">
          {goals.map((goal, index) => (
            <div key={index} className="goal-card">
              <h3 className="goal-title">{goal.title}</h3>
              <ul className="goal-objectives">
                {goal.objectives.map((objective, objectiveIndex) => (
                  <li key={objectiveIndex}>{objective}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Journey Section with Square Cards */}
      <div className="about-section">
        <h2 className="about-title">{achievementsHeading}</h2>
        <div className="journey-grid">
          {journeyData.map((item, index) => (
            <div key={index} className="journey-card">
              <div className="journey-content">
                <div className="journey-year">{item.year}</div>
                <div className="journey-message">{item.message}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Gallery Section */}
      <div className="about-section">
        <h2 className="about-title">Event Highlights Gallery</h2>
        <p className="gallery-subtitle">Explore our vibrant community events, performances, and entrepreneurial activities</p>

        <div className="gallery-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredImages.map((image, index) => (
            <div
              key={`${image.category}-${index}`}
              className="gallery-item animate-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openLightbox(image)}
            >
              <img src={image.src} alt={image.title} loading="lazy" />
              <div className="gallery-overlay">
                <h4 className="gallery-title">{image.title}</h4>
                <p className="gallery-description">{image.description}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div className="lightbox" onClick={closeLightbox}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img src={selectedImage.src} alt={selectedImage.title} />
              <div className="lightbox-info">
                <h3>{selectedImage.title}</h3>
                <p>{selectedImage.description}</p>
              </div>
              <button className="close-btn" onClick={closeLightbox}>×</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;