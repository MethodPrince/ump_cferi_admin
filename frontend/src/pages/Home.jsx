import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getSlides } from '../services/api';
import '../styles/home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselIndices, setCarouselIndices] = useState([0, 0, 0, 0, 0]); // One for each category
  const [slides, setSlides] = useState([
    {
      image: '/slideshow/Cferi 04.jpg',
      caption: 'Be Limitless - Ntseka Mahale',
      title: 'Entrepreneurship Tips'
    },
    {
      image: '/images/speakersimages/IMG_0756.jpg',
      caption: 'EDHE ABSA 2026 National Lunch - Keynote Speaker',
      title: 'Inspiring Leadership'
    },
    {
      image: '/images/audiencesimages/IMG_0738.jpg',
      caption: 'EDHE ABSA 2026 National Lunch - Engaged Audience',
      title: 'Community Engagement'
    },
    {
      image: '/slideshow/Cferi 09.jpg',
      caption: 'CFERI Entrepreneurship Development',
      title: 'Program Highlights'
    },
    {
      image: '/images/interactionImages/IMG_0709.jpg',
      caption: 'EDHE ABSA 2026 - Networking Session',
      title: 'Building Connections'
    },
    {
      image: '/images/groupimages/IMG_0728.jpg',
      caption: 'EDHE ABSA 2026 - Team Collaboration',
      title: 'Entrepreneurial Minds'
    },
    {
      image: '/slideshow/DSC_5377.jpg',
      caption: 'DSC 5377',
      title: 'Event Snapshot'
    },
    {
      image: '/images/choirimages/IMG_0783.jpg',
      caption: 'EDHE ABSA 2026 - Cultural Performance',
      title: 'Celebrating Excellence'
    },
    {
      image: '/slideshow/DSC_5385.jpg',
      caption: 'DSC 5385',
      title: 'Event Snapshot'
    },
    {
      image: '/slideshow/DSC_5388.jpg',
      caption: 'DSC 5388',
      title: 'Event Snapshot'
    },
    {
      image: '/slideshow/DSC_5391.jpg',
      caption: 'DSC 5391',
      title: 'Event Snapshot'
    },
  ]);
  const [slideInterval, setSlideInterval] = useState(5000);

  useEffect(() => {
    const loadSlides = async () => {
      try {
        const { data } = await getSlides();
        if (Array.isArray(data) && data.length > 0) {
          setSlides(data.map((slide) => ({
            image: slide.image,
            caption: slide.caption,
            title: slide.title
          })));
        }
      } catch (error) {
        console.error('Failed to load home slides:', error);
      }
    };

    loadSlides();
  }, []);

  // Automatic slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, slideInterval);
    return () => clearInterval(timer);
  }, [slides.length, slideInterval]);

  // Automatic carousel rotation for gallery categories
  useEffect(() => {
    const carouselTimer = setInterval(() => {
      setCarouselIndices(prev => prev.map(index => (index + 1) % 4)); // 4 images per category
    }, 4000); // Change every 4 seconds for smoother experience
    return () => clearInterval(carouselTimer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Head programs data (clickable cards) - ONLY 3 CARDS
  const headPrograms = [
    {
      id: 'incubation',
      title: 'Incubation Programs',
      icon: '🚀',
      color: '#242753',
      description: 'Renting Facilities, Industry Development, Business Plan, Record Keeping & Accounting, Coaching on Market Strategy',
      sectionId: 'incubation-programs'
    },
    {
      id: 'funding',
      title: 'Enterpreneurship Development Programs',
      icon: '🏆',
      color: '#e31b23',
      description: 'EDHE Competition, Student Indaba, Staff Entrepreneurship Capacity Building, CFERI Student Chapters',
      sectionId: 'funding-competitions'
    },
    {
      id: 'research',
      title: 'Research Activities',
      icon: '📚',
      color: '#9c27b0',
      description: 'Research on Entrepreneurship Development, Consultancy, UNICEF, Publications',
      sectionId: 'research-activities'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section with Slideshow */}
      <section className="hero-section">
        <div className="slideshow-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url('${slide.image}')` }}
            >
              <div className="slide-overlay"></div>
              {/* caption shown at bottom of slide */}
              <div className="slide-content">
                <h2 className="slide-title">{slide.title}</h2>
                <p className="slide-caption">{slide.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="slide-nav prev" onClick={prevSlide} aria-label="Previous slide">❮</button>
        <button className="slide-nav next" onClick={nextSlide} aria-label="Next slide">❯</button>

        <div className="container">
          <div className="hero-content fade-in">
            <h1 className="hero-title">UMPCFERI</h1>
            <p className="hero-tagline">Creating Opportunities</p>
            <p className="hero-subtitle">
              Centre for Entrepreneurship and Rapid Incubator
            </p>
            <div className="hero-buttons">
              <Link to="/about" className="btn btn-primary">Learn More</Link>
              <Link to="/contact" className="btn btn-outline">Get Started</Link>
            </div>
          </div>
        </div>
        <div className="hero-overlay"></div>
      </section>

      {/* Head Programs Section - 3 Clickable Cards */}
      <section className="head-programs-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Programs</h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">
              Explore our comprehensive programs designed to nurture entrepreneurs at every stage
            </p>
          </div>

          <div className="head-programs-grid three-cards">
            {headPrograms.map((program, index) => (
              <Link 
                to={`/programs#${program.sectionId}`} 
                key={program.id}
                className="head-program-card fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <h3>{program.title}</h3>
                <p className="program-preview">{program.description}</p>
                <span className="view-more">
                  View Details <i className="fas fa-arrow-right"></i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose UMPCFERI</h2> 
            <div className="section-divider"></div>
          </div>
          
          <div className="features-grid">
            <div className="feature-card fade-in">
              <h3>Expert Mentorship</h3>
              <p>Learn from experienced entrepreneurs, industry experts, and business leaders who guide you every step of the way.</p>
            </div>
            
            <div className="feature-card fade-in" style={{ animationDelay: '0.1s' }}>
              <h3>Funding Access</h3>
              <p>Connect with funding opportunities, grants, and investors through our extensive network of partners.</p>
            </div>
            
            <div className="feature-card fade-in" style={{ animationDelay: '0.2s' }}>
              <h3>Global Network</h3>
              <p>Join a community of entrepreneurs and gain exposure to international markets and opportunities.</p>
            </div>
            
            <div className="feature-card fade-in" style={{ animationDelay: '0.3s' }}>
              <h3>State-of-the-Art Facilities</h3>
              <p>Access our modern incubation hub with co-working spaces, meeting rooms, and specialized equipment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Gallery Section */}
      <section className="gallery-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title"> EDHE Absa Entrepreneurship innoVarsity 2026 National Lunch </h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">Celebrating our vibrant community and entrepreneurial spirit, happend 17 April 2026</p>
          </div>

          <div className="gallery-showcase">
            <div className="gallery-category animated-card">
              <div className="image-carousel">
                <div className="carousel-slides">
                  <img src="/images/speakersimages/IMG_0928.jpg" alt="Panel Discussion" className={`carousel-image ${carouselIndices[0] === 0 ? 'active' : ''}`} />
                  <img src="/images/speakersimages/IMG_0756.jpg" alt="Keynote Speaker" className={`carousel-image ${carouselIndices[0] === 1 ? 'active' : ''}`} />
                  <img src="/images/speakersimages/IMG_0968.jpg" alt="Guest Speaker" className={`carousel-image ${carouselIndices[0] === 2 ? 'active' : ''}`} />
                  <img src="/images/speakersimages/IMG_1000.jpg" alt="Motivational Speaker" className={`carousel-image ${carouselIndices[0] === 3 ? 'active' : ''}`} />
                </div>
                <div className="carousel-indicators">
                  <span className={`indicator ${carouselIndices[0] === 0 ? 'active' : ''}`}></span>
                  <span className={`indicator ${carouselIndices[0] === 1 ? 'active' : ''}`}></span>
                  <span className={`indicator ${carouselIndices[0] === 2 ? 'active' : ''}`}></span>
                  <span className={`indicator ${carouselIndices[0] === 3 ? 'active' : ''}`}></span>
                </div>
              </div>
              <div className="category-overlay">
                <h3>Speakers</h3>
                <p>Inspiring voices shaping the future</p>
              </div>
            </div>

            <div className="gallery-category animated-card">
              <div className="image-carousel">
                <div className="carousel-slides">
                  <img src="/images/groupimages/IMG_1511.jpg" alt="Group Activity" className={`carousel-image ${carouselIndices[1] === 0 ? 'active' : ''}`} />
                  <img src="/images/groupimages/IMG_0728.jpg" alt="Team Discussion" className={`carousel-image ${carouselIndices[1] === 1 ? 'active' : ''}`} />
                  <img src="/images/groupimages/IMG_1523.jpg" alt="Mentorship Session" className={`carousel-image ${carouselIndices[1] === 2 ? 'active' : ''}`} />
                  <img src="/images/groupimages/IMG_1539.jpg" alt="Collaborative Work" className={`carousel-image ${carouselIndices[1] === 3 ? 'active' : ''}`} />
                </div>
                <div className="carousel-indicators">
                  <span className={`indicator ${carouselIndices[1] === 0 ? 'active' : ''}`}></span>
                  <span className={`indicator ${carouselIndices[1] === 1 ? 'active' : ''}`}></span>
                  <span className={`indicator ${carouselIndices[1] === 2 ? 'active' : ''}`}></span>
                  <span className={`indicator ${carouselIndices[1] === 3 ? 'active' : ''}`}></span>
                </div>
              </div>
              <div className="category-overlay">
                <h3>Group Activities</h3>
                <p>Collaborative learning and innovation</p>
              </div>
            </div>

            <div className="gallery-category animated-card">
              <div className="image-carousel">
                <div className="carousel-slides">
                  <img src="/images/interactionImages/IMG_1403.jpg" alt="Interactive Workshop" className={`carousel-image ${carouselIndices[2] === 0 ? 'active' : ''}`} />
                  <img src="/images/interactionImages/IMG_0709.jpg" alt="Networking Session" className={`carousel-image ${carouselIndices[2] === 1 ? 'active' : ''}`} />
                  <img src="/images/interactionImages/IMG_0826.jpg" alt="Mentor-Mentee" className={`carousel-image ${carouselIndices[2] === 2 ? 'active' : ''}`} />
                  <img src="/images/interactionImages/IMG_1248.jpg" alt="Collaborative Exchange" className={`carousel-image ${carouselIndices[2] === 3 ? 'active' : ''}`} />
                </div>
                <div className="carousel-indicators">
                  <span className={`indicator ${carouselIndices[2] === 0 ? 'active' : ''}`}></span>
                  <span className={`indicator ${carouselIndices[2] === 1 ? 'active' : ''}`}></span>
                  <span className={`indicator ${carouselIndices[2] === 2 ? 'active' : ''}`}></span>
                  <span className={`indicator ${carouselIndices[2] === 3 ? 'active' : ''}`}></span>
                </div>
              </div>
              <div className="category-overlay">
                <h3>Networking</h3>
                <p>Building meaningful connections</p>
              </div>
            </div>

            <div className="gallery-category animated-card">
              <div className="image-carousel">
                <div className="carousel-slides">
                  <img src="/images/choirimages/IMG_0791.jpg" alt="Choir Performance" className={`carousel-image ${carouselIndices[3] === 0 ? 'active' : ''}`} />
                  <img src="/images/choirimages/IMG_0783.jpg" alt="Musical Performance" className={`carousel-image ${carouselIndices[3] === 1 ? 'active' : ''}`} />
                  <img src="/images/choirimages/IMG_0805.jpg" alt="Choir Group" className={`carousel-image ${carouselIndices[3] === 2 ? 'active' : ''}`} />
                  <img src="/images/choirimages/IMG_0821.jpg" alt="Cultural Performance" className={`carousel-image ${carouselIndices[3] === 3 ? 'active' : ''}`} />
                </div>
                <div className="carousel-indicators">
                  <span className={`indicator ${carouselIndices[3] === 0 ? 'active' : ''}`}></span>
                  <span className={`indicator ${carouselIndices[3] === 1 ? 'active' : ''}`}></span>
                  <span className={`indicator ${carouselIndices[3] === 2 ? 'active' : ''}`}></span>
                  <span className={`indicator ${carouselIndices[3] === 3 ? 'active' : ''}`}></span>
                </div>
              </div>
              <div className="category-overlay">
                <h3>CHOIR</h3>
                <p>Choir during the national lunch</p>
              </div>
            </div>

            <div className="gallery-category animated-card">
              <div className="image-carousel">
                <div className="carousel-slides">
                  <img src="/images/audiencesimages/IMG_0961.jpg" alt="Group Session" className={`carousel-image ${carouselIndices[4] === 0 ? 'active' : ''}`} />
                  <img src="/images/audiencesimages/IMG_0738.jpg" alt="Event Audience" className={`carousel-image ${carouselIndices[4] === 1 ? 'active' : ''}`} />
                  <img src="/images/audiencesimages/IMG_0807.jpg" alt="Event Attendees" className={`carousel-image ${carouselIndices[4] === 2 ? 'active' : ''}`} />
                  <img src="/images/audiencesimages/IMG_0947.jpg" alt="Audience Focus" className={`carousel-image ${carouselIndices[4] === 3 ? 'active' : ''}`} />
                </div>
                <div className="carousel-indicators">
                  <span className={`indicator ${carouselIndices[4] === 0 ? 'active' : ''}`}></span>
                  <span className={`indicator ${carouselIndices[4] === 1 ? 'active' : ''}`}></span>
                  <span className={`indicator ${carouselIndices[4] === 2 ? 'active' : ''}`}></span>
                  <span className={`indicator ${carouselIndices[4] === 3 ? 'active' : ''}`}></span>
                </div>
              </div>
              <div className="category-overlay">
                <h3>Community</h3>
                <p>Engaged participants and supporters</p>
              </div>
            </div>
          </div>

          <div className="gallery-cta">
            <Link to="/about" className="btn btn-secondary">View Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section fade-in">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Begin Your Journey?</h2>
            <p className="cta-text">Join our incubation program and transform your idea into a successful business.</p>
            <Link to="/contact" className="btn btn-primary btn-large">Get Started Today</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
  