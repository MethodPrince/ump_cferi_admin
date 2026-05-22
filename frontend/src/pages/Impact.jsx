import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBusinesses } from '../services/api';
import '../styles/impact.css';

const Impact = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');
  // slideshow state for impact pictures
  const [currentSlide, setCurrentSlide] = useState(0);

  // Impact picture gallery
  const impactPictures = [
    {
      id: 1,
      image: '/impactImages/7f6d8b85-bdfa-466e-8a0e-ae3a83dcee41.jpeg',
      title: 'ASIP Conference 2025 - Best Paper Award',
      description: 'Professor Ogujuba Kanayo, Lethabo Maponya and Confidence Ndlovu received Best Paper Award for "Governance, Digital Innovation, and Entrepreneurship in South Africa"',
      category: 'awards',
      date: 'December 2025',
      location: 'Cambodia'
    },
    {
      id: 2,
      image: '/impactImages/99b11d0c-48a8-445a-8bef-0364e602e37b.jpeg',
      title: 'ASIP Conference 2025',
      description: 'Governance of Emerging Intelligent Technologies Conference at CamTech University',
      category: 'conference',
      date: 'December 4-5, 2025',
      location: 'Cambodia'
    },
    {
      id: 3,
      image: '/impactImages/881f8aee-08fb-4a7e-a748-a28d76f71a23.jpeg',
      title: 'Strategic Partners',
      description: 'Collaboration with DHV, Telkom, and Chitkara University',
      category: 'partnerships',
      date: '2025',
      location: 'International'
    },
    {
      id: 4,
      image: '/impactImages/899b9899-3cc5-4d19-bda5-19365f01b8cb.jpeg',
      title: 'ASIP Conference 2025',
      description: 'Asian Society for Innovation and Policy Conference',
      category: 'conference',
      date: 'December 2025',
      location: 'Cambodia'
    },
    {
      id: 5,
      image: '/impactImages/a23f3b55-e455-4ad6-beb5-19f7dc2fee9f.jpeg',
      title: 'Infrastructure Impact',
      description: 'US$606 Million investment in electricity and irrigation',
      category: 'impact',
      date: '2025',
      location: 'Regional'
    },
    {
      id: 6,
      image: '/impactImages/f93dfc40-08dd-4702-b640-a441b36b1d14.jpeg',
      title: 'UNIIC MOU Ceremony 2025',
      description: 'Welcome Delegations and Participants from DHV, UMN, ASIP, Chitkara',
      category: 'partnerships',
      date: 'December 3, 2025',
      location: 'Cambodia'
    },
    {
      id: 7,
      image: '/impactImages/2f538ca8-2288-4afb-bf27-204d95a3a8df.jpeg',
      title: 'ASIP Innovation & Policy Conference',
      description: 'Governance of Emerging Intelligent Technologies',
      category: 'conference',
      date: 'December 4-5, 2025',
      location: 'CamTech University'
    },
    {
      id: 8,
      image: '/impactImages/6b90f0b0-41c6-4be2-9c27-c517f3afea1e.jpeg',
      title: 'UNIIC MOU Ceremony',
      description: 'International partnerships with DHV, Telkom, ASIP, Chitkara',
      category: 'partnerships',
      date: 'December 3, 2025',
      location: 'Cambodia'
    },
    {
      id: 9,
      image: '/impactImages/14ecd6a5-72cd-4ad5-96f7-a78cbad34ee5.jpeg',
      title: 'ASIP Conference Achievement',
      description: 'Congratulations on outstanding achievement',
      category: 'awards',
      date: 'December 2025',
      location: 'Cambodia'
    }
  ];

  useEffect(() => {
    getBusinesses()
      .then(({ data }) => setBusinesses(data))
      .finally(() => setLoading(false));
  }, []);

  const totalJobs = businesses.reduce((sum, b) => sum + (b.jobsCreated || 0), 0);
  const industries = new Set(businesses.map(b => b.industry)).size;

  const stats = [
    { number: businesses.length || '0', label: 'Businesses Supported' },
    { number: totalJobs || '0', label: 'Jobs Created' },
    { number: industries || '0', label: 'Industry Sectors' },
    { number: '9', label: 'International Awards' },
    { number: '5+', label: 'Global Partners' },
    { number: '3', label: 'Continents' }
  ];

  // autoplay slideshow effect (first 5 pictures)
  useEffect(() => {
    const slideCount = Math.min(5, impactPictures.length);
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slideCount);
    }, 4000);
    return () => clearInterval(timer);
  }, [impactPictures.length]);

  // Filter pictures by category
  const categories = ['all', 'awards', 'conference', 'partnerships', 'impact'];
  const filteredPictures = filter === 'all' 
    ? impactPictures 
    : impactPictures.filter(pic => pic.category === filter);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  if (loading) {
    return <div className="impact-container loading">Loading...</div>;
  }

  return (
    <div className="impact-page">
      {/* Hero Section */}
      <section className="impact-hero">
        {/* slideshow backgrounds */}
        <div className="impact-slideshow">
          {impactPictures.slice(0,5).map((pic,index)=>(
            <div
              key={index}
              className={`impact-slide ${index===currentSlide? 'active':''}`}
              style={{backgroundImage:`url(${pic.image})`}}
            >
              <div className="slide-overlay"></div>
            </div>
          ))}
        </div>
        <div className="impact-hero-overlay"></div>
        <div className="impact-hero-content">
          <h1 className="impact-hero-title">Our Global Impact</h1>
          <p className="impact-hero-subtitle">
            Celebrating achievements, partnerships, and innovations across the globe
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="impact-stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Pictures Gallery */}
      <section className="impact-gallery-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Impact Gallery 2025</h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">
              Capturing moments of excellence, innovation, and global recognition
            </p>
          </div>

          {/* Category Filter */}
          <div className="gallery-filter">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid">
            {filteredPictures.map((item) => (
              <div 
                key={item.id} 
                className="gallery-item fade-in"
                onClick={() => openLightbox(item)}
              >
                <div className="gallery-image-container">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="gallery-image"
                    loading="lazy"
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-info">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <div className="gallery-meta">
                        <span className="gallery-date">📅 {item.date}</span>
                        <span className="gallery-location">📍 {item.location}</span>
                      </div>
                      <span className="gallery-category">{item.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPictures.length === 0 && (
            <p className="no-images">No images found in this category.</p>
          )}
        </div>
      </section>

      {/* Featured Achievement */}
      <section className="featured-achievement">
        <div className="container">
          <div className="achievement-card featured">
            <div className="achievement-badge">🏆 BEST PAPER AWARD</div>
            <h3>ASIP Conference 2025 - Phnom Penh, Cambodia</h3>
            <p className="achievement-title">
              "Governance, Digital Innovation, and Entrepreneurship in South Africa: 
              Navigating the Fourth Industrial Revolution"
            </p>
            <div className="achievement-recipients">
              <span className="recipient">Prof. Dr Oguijuba Kanayo</span>
              <span className="recipient">Lethabo Maponya</span>
              <span className="recipient">Confidence Ndlovu</span>
            </div>
            <p className="achievement-org">
              Presented by: CamTech University • ASIP • UNIIC
            </p>
          </div>
        </div>
      </section>

      {/* Business Impact Section */}
      <section className="business-impact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Student Business Impact</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="business-stats-highlight">
            <div className="highlight-card">
              <div className="highlight-number">{businesses.length}</div>
              <div className="highlight-label">Active Student Businesses</div>
            </div>
            <div className="highlight-card">
              <div className="highlight-number">{totalJobs}</div>
              <div className="highlight-label">Jobs Created</div>
            </div>
            <div className="highlight-card">
              <div className="highlight-number">{industries}</div>
              <div className="highlight-label">Industries</div>
            </div>
          </div>

          <div className="business-grid">
            {businesses.slice(0, 6).map(business => (
              <div key={business._id} className="business-card fade-in">
                <h3>{business.name}</h3>
                <p className="business-owner">{business.owner}</p>
                <p className="business-industry">{business.industry}</p>
                <p className="business-description">{business.description}</p>
                <div className="business-meta">
                  <span>📊 {business.jobsCreated || 0} jobs</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/businesses" className="btn btn-secondary">View All Businesses</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impact;