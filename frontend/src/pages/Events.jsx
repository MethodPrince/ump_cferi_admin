import { useState, useEffect } from 'react';
import { getEvents } from '../services/api';
import '../styles/events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const abortController = new AbortController();

    const fetchEvents = async () => {
      try {
        const response = await getEvents({ signal: abortController.signal });
        const payload = response?.data;

        if (Array.isArray(payload)) {
          setEvents(payload);
        } else if (payload?.events && Array.isArray(payload.events)) {
          setEvents(payload.events);
        } else {
          setEvents([]);
        }
      } catch (err) {
        if (err.name !== 'CanceledError' && err.name !== 'AbortError') {
          console.error('Error fetching events:', err);
          setError('Unable to load events. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();

    return () => {
      abortController.abort();
    };
  }, []);

  const normalizedEvents = events.map((event) => ({
    _id: event._id || event.id || `${event.title}-${event.date}`,
    title: event.title || 'Untitled Event',
    description: event.description || 'No description available.',
    date: event.date || new Date().toISOString(),
    location: event.location || '',
    type: event.type || event.category || 'general'
  }));

  const eventTypes = ['all', ...new Set(normalizedEvents.map((e) => e.type).filter(Boolean))];

  const filteredEvents = filter === 'all'
    ? normalizedEvents
    : normalizedEvents.filter((event) => event.type === filter);

  if (loading) {
    return <div className="events-container loading">Loading...</div>;
  }

  if (error) {
    return <div className="events-container error">{error}</div>;
  }

  return (
    <div className="events-container">
      <h1 className="events-title">Events & Programs</h1>

      {eventTypes.length > 1 && (
        <div className="events-filter">
          <label htmlFor="event-type-filter">Filter by type: </label>
          <select
            id="event-type-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="events-grid">
        {filteredEvents.length ? (
          filteredEvents.map((event) => {
            let formattedDate = 'Date unavailable';
            const dateValue = event.date ? new Date(event.date) : null;
            if (dateValue instanceof Date && !Number.isNaN(dateValue.getTime())) {
              formattedDate = dateValue.toLocaleDateString();
            }

            return (
              <div key={event._id} className="event-card">
                <div className="event-type-badge">{event.type || 'event'}</div>
                <h3>{event.title}</h3>
                <p className="event-description">{event.description}</p>
                <div className="event-details">
                  <p className="event-detail">
                    <strong>Date:</strong> {formattedDate}
                  </p>
                  {event.location && (
                    <p className="event-detail">
                      <strong>Location:</strong> {event.location}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-events">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default Events;