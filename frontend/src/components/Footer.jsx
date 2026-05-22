import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section">
          <h3 className="footer-logo">UMPCFERI</h3>
          <p className="footer-tagline">Creating Opportunities</p>
          <p className="footer-address">
            Cnr R40 & D725 Road<br />
            University of Mpumalanga<br />
            Old building 12, Mbombela<br />
            South Africa
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/impact">Impact</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/newsletter">Newsletter</Link></li>
          </ul>
        </div>

        {/* Connect Section */}
        <div className="footer-section">
          <h4>Connect</h4>
          <div className="social-links">
            <a 
              href="https://www.linkedin.com/in/ump-centre-for-entrepreneurship-0256bb282" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://www.instagram.com/umpcferi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
              <span>Instagram</span>
            </a>
            <a 
              href="https://www.facebook.com/share/1DNv3KxjVb/?mibextid=wwXIfr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
              <span>Facebook</span>
            </a>
          </div>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4>Contact</h4>
          <div className="contact-info">
            <p><i className="far fa-envelope"></i> cferi_bdo@ump.ac.za</p>
            <p><i className="far fa-clock"></i> Mon-Fri: 08:00-16:00</p>
          </div>
        </div>
      </div>

      {/* Sponsors Carousel Section */}
      <div className="sponsors-section">
        <div className="sponsors-container">
          <div className="sponsors-carousel">
            <div className="sponsors-track">
              <div className="sponsor-item">
                <img src="/sponsorsImages/0e090f32-2706-4175-b054-469b2fceaa67.jpeg" alt="Sponsor 1" />
              </div>
              <div className="sponsor-item">
                <img src="/sponsorsImages/2024cffd-85a1-4da4-a265-af4b22ee1005.jpeg" alt="Sponsor 2" />
              </div>
              <div className="sponsor-item">
                <img src="/sponsorsImages/8f0645f6-ab81-470c-9599-048f164def1f.jpeg" alt="Sponsor 3" />
              </div>
              <div className="sponsor-item">
                <img src="/sponsorsImages/afad9013-9a2a-41b4-85af-19a166992843.jpeg" alt="Sponsor 4" />
              </div>
              <div className="sponsor-item">
                <img src="/sponsorsImages/f08c823c-6faa-4519-8b9b-b63336d3e7c1.jpeg" alt="Sponsor 5" />
              </div>
              {/* Duplicate for seamless loop */}
              <div className="sponsor-item">
                <img src="/sponsorsImages/0e090f32-2706-4175-b054-469b2fceaa67.jpeg" alt="Sponsor 1" />
              </div>
              <div className="sponsor-item">
                <img src="/sponsorsImages/2024cffd-85a1-4da4-a265-af4b22ee1005.jpeg" alt="Sponsor 2" />
              </div>
              <div className="sponsor-item">
                <img src="/sponsorsImages/8f0645f6-ab81-470c-9599-048f164def1f.jpeg" alt="Sponsor 3" />
              </div>
              <div className="sponsor-item">
                <img src="/sponsorsImages/afad9013-9a2a-41b4-85af-19a166992843.jpeg" alt="Sponsor 4" />
              </div>
              <div className="sponsor-item">
                <img src="/sponsorsImages/f08c823c-6faa-4519-8b9b-b63336d3e7c1.jpeg" alt="Sponsor 5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>&copy; {currentYear} UMPCFERI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;