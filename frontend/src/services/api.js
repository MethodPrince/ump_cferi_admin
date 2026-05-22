import axios from 'axios';
import io from 'socket.io-client';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

const api = axios.create({ 
  baseURL: API_URL,
  timeout: 10000  // 10 second timeout for all requests
});

const loadStoredToken = () => {
  try {
    const saved = localStorage.getItem('admin');
    if (saved) {
      const admin = JSON.parse(saved);
      if (admin?.token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${admin.token}`;
      }
    }
  } catch (error) {
    console.warn('Could not load stored admin token', error);
  }
};

loadStoredToken();

// ========== AUTH ==========
export const loginAdmin = (email, password) => api.post('/admin/login', { email, password });
export const getDashboard = () => api.get('/admin/dashboard');
export const logoutAdmin = () => {
  setAuthToken(null);
  localStorage.removeItem('admin');
  return Promise.resolve();
};
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};
export const getAdminProfile = () => api.get('/admin/me');
export const updateAdminProfile = (data) => api.put('/admin/me', data);

// ========== BUSINESSES ==========
export const getBusinesses = () => api.get('/businesses');
export const getBusinessById = (id) => api.get(`/businesses/${id}`);
export const createBusiness = (data) => api.post('/businesses', data);
export const updateBusiness = (id, data) => api.put(`/businesses/${id}`, data);
export const deleteBusiness = (id) => api.delete(`/businesses/${id}`);

// ========== EVENTS ==========
export const getEvents = () => api.get('/events');
export const getEventById = (id) => api.get(`/events/${id}`);
export const createEvent = (data) => api.post('/events', data);
export const updateEvent = (id, data) => api.put(`/events/${id}`, data);
export const deleteEvent = (id) => api.delete(`/events/${id}`);

// ========== MENTORS ==========
export const getMentors = () => api.get('/mentors');
export const getMentorById = (id) => api.get(`/mentors/${id}`);
export const createMentor = (data) => api.post('/mentors', data);
export const updateMentor = (id, data) => api.put(`/mentors/${id}`, data);
export const deleteMentor = (id) => api.delete(`/mentors/${id}`);

// ========== SLIDESHOW ==========
export const getSlides = (section) => api.get('/slides', { params: section ? { section } : {} });
export const getSlideById = (id) => api.get(`/slides/${id}`);
export const createSlide = (data) => api.post('/slides', data);
export const updateSlide = (id, data) => api.put(`/slides/${id}`, data);
export const deleteSlide = (id) => api.delete(`/slides/${id}`);

// ========== PARTNERS / SPONSORS ==========
export const getPartners = () => api.get('/partners');
export const getPartnerById = (id) => api.get(`/partners/${id}`);
export const createPartner = (data) => api.post('/partners', data);
export const updatePartner = (id, data) => api.put(`/partners/${id}`, data);
export const deletePartner = (id) => api.delete(`/partners/${id}`);

// ========== NEWSLETTER ==========
export const getNewsletterPages = () => api.get('/newsletter');
export const createNewsletterPage = (data) => api.post('/newsletter', data);
export const updateNewsletterPage = (id, data) => api.put(`/newsletter/${id}`, data);
export const deleteNewsletterPage = (id) => api.delete(`/newsletter/${id}`);

// ========== PAGES ==========
export const getPages = (admin = false) => api.get(`/pages${admin ? '?admin=true' : ''}`);
export const getPageBySlug = (slug) => api.get(`/pages/slug/${slug}`);
export const createPage = (data) => api.post('/pages', data);
export const updatePage = (id, data) => api.put(`/pages/${id}`, data);
export const deletePage = (id) => api.delete(`/pages/${id}`);

// ========== PROGRAMS ==========
export const getPrograms = () => api.get('/programs');
export const getProgramById = (id) => api.get(`/programs/${id}`);
export const createProgram = (data) => api.post('/programs', data);
export const updateProgram = (id, data) => api.put(`/programs/${id}`, data);
export const deleteProgram = (id) => api.delete(`/programs/${id}`);

// ========== GALLERY ==========
export const getGalleryImages = () => api.get('/gallery');
export const getGalleryImageById = (id) => api.get(`/gallery/${id}`);
export const createGalleryImage = (data) => api.post('/gallery', data);
export const updateGalleryImage = (id, data) => api.put(`/gallery/${id}`, data);
export const deleteGalleryImage = (id) => api.delete(`/gallery/${id}`);

// ========== SETTINGS ==========
export const getSettings = () => api.get('/settings');
export const updateSettings = (data) => api.put('/settings', data);

// ========== MESSAGES ==========
export const getMessages = () => api.get('/messages');
export const getMessageById = (id) => api.get(`/messages/${id}`);
export const sendMessage = (data) => api.post('/messages', data);
export const replyToMessage = (id, data) => api.put(`/messages/${id}`, data);
export const updateMessageStatus = (id, data) => api.patch(`/messages/${id}/status`, data);
export const deleteMessage = (id) => api.delete(`/messages/${id}`);

// ========== SOCKET ==========
let socket = null;
export const connectSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ['polling', 'websocket'],
      withCredentials: false,
    });
  }
  return socket;
};
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const BACKEND_URL = API_URL.replace(/\/api\/?$/, '');
export default api;