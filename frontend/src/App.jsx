import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Impact from './pages/Impact';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Businesses from './pages/Businesses';
import Login from './admin/Login';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import AdminBusinesses from './admin/Businesses';
import EventsAdmin from './admin/Events';
import Mentors from './admin/Mentors';
import Messages from './admin/Messages';
import AdminPrograms from './admin/Programs';
import AdminSlides from './admin/Slides';
import AdminGallery from './admin/Gallery';
import AdminPages from './admin/Pages';
import AdminNewsletter from './admin/Newsletter';
import AdminPartners from './admin/Partners';
import AdminProfile from './admin/Profile';
import AdminSettings from './admin/Settings';
import Page from './pages/Page';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Newsletter from './pages/Newsletter';
import Programs from './pages/Programs';
import { setAuthToken } from './services/api';
import './styles/ump-theme.css';
import './styles/admin-layout.css';
import './styles/admin-forms.css';

function App() {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('admin');
    return saved ? JSON.parse(saved) : null;
  });

  // Warm up backend connection on app startup
  useEffect(() => {
    fetch('http://localhost:5000', { method: 'GET' })
      .catch(() => {}); // Ignore errors, just priming the connection
  }, []);

  useEffect(() => {
    if (admin?.token) {
      setAuthToken(admin.token);
      localStorage.setItem('admin', JSON.stringify(admin));
    } else {
      localStorage.removeItem('admin');
    }
  }, [admin]);

  const PrivateRoute = ({ children }) => {
    return admin ? children : <Navigate to="/admin/login" />;
  };

  const PublicRoute = ({ children }) => {
    return !admin ? children : <Navigate to="/admin/dashboard" />;
  };

  return (
    <BrowserRouter>
      <Header admin={admin} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/businesses" element={<Businesses />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/pages/:slug" element={<Page />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={
          <PublicRoute>
            <Login setAdmin={setAdmin} />
          </PublicRoute>
        } />
        
        {/* Admin Layout Wrapper */}
        <Route path="/admin/*" element={
          <PrivateRoute>
            <AdminLayout admin={admin} setAdmin={setAdmin}>
              <Routes>
                <Route path="dashboard" element={<Dashboard admin={admin} setAdmin={setAdmin} />} />
                <Route path="businesses" element={<AdminBusinesses setAdmin={setAdmin} />} />
                <Route path="events" element={<EventsAdmin setAdmin={setAdmin} />} />
                <Route path="mentors" element={<Mentors setAdmin={setAdmin} />} />
                <Route path="programs" element={<AdminPrograms setAdmin={setAdmin} />} />
                <Route path="pages" element={<AdminPages setAdmin={setAdmin} />} />
                <Route path="slides" element={<AdminSlides setAdmin={setAdmin} />} />
                <Route path="partners" element={<AdminPartners setAdmin={setAdmin} />} />
                <Route path="gallery" element={<AdminGallery setAdmin={setAdmin} />} />
                <Route path="newsletter" element={<AdminNewsletter setAdmin={setAdmin} />} />
                <Route path="profile" element={<AdminProfile setAdmin={setAdmin} />} />
                <Route path="settings" element={<AdminSettings setAdmin={setAdmin} />} />
                <Route path="messages" element={<Messages setAdmin={setAdmin} />} />
                <Route path="*" element={<Navigate to="/admin/dashboard" />} />
              </Routes>
            </AdminLayout>
          </PrivateRoute>
        } />
      </Routes>
      <Footer />
      <ChatWidget />
    </BrowserRouter>
  );
}

export default App;