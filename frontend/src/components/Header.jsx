import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getPages } from '../services/api';
import '../styles/header.css';

const Header = ({ admin }) => {
  const [pages, setPages] = useState([]);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute && admin) {
    return (
      <nav className="header admin-header">
        <div className="header-container">
          <Link to="/admin/dashboard" className="logo-container">
            <img src="/images/ump-logo.jpg" alt="UMP Logo" className="ump-logo" />
            <span className="logo-text">ADMIN</span>
          </Link>
          <div className="nav-links">
            <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/admin/messages" className="nav-link">Messages</Link>
          </div>
        </div>
      </nav>
    );
  }

  useEffect(() => {
    const loadPages = async () => {
      try {
        const { data } = await getPages();
        setPages(data.filter((page) => page.showInNav && page.active));
      } catch (error) {
        console.error('Failed to load page navigation links', error);
      }
    };

    if (!isAdminRoute) {
      loadPages();
    }
  }, [isAdminRoute]);

  if (isAdminRoute && !admin) {
    return (
      <nav className="header">
        <div className="header-container">
          <Link to="/" className="logo-container">
            <img src="/images/ump-logo.jpg" alt="UMP Logo" className="ump-logo" />
            <span className="logo-text">UMP CFERI</span>
          </Link>
          <div className="nav-links">
            <Link to="/admin/login" className="nav-link admin-login-link">Admin Login</Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="header">
      <div className="header-container">
        <Link to="/" className="logo-container">
          <img src="/images/ump-logo.jpg" alt="UMP Logo" className="ump-logo" />
          <span className="logo-text">UMPCFERI</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/impact" className="nav-link">Impact</Link>
          <Link to="/businesses" className="nav-link">Businesses</Link>
          <Link to="/events" className="nav-link">Events</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/newsletter" className="nav-link">Newsletter</Link>
          <Link to="/programs" className="nav-link">Programs</Link>
          {pages.map((page) => (
            <Link key={page._id} to={`/pages/${page.slug}`} className="nav-link">
              {page.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Header;