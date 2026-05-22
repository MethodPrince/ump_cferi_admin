import { useState } from 'react';
import { sendMessage } from '../services/api';
import '../styles/contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage({
      senderName: form.name,
      senderEmail: form.email,
      message: form.message,
      status: 'unanswered'
    });
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      
      <div className="contact-content">
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p><strong>Email:</strong> cferi_bdo@ump.ac.za</p>
          <p><strong>Phone:</strong> +27 13 002 0000</p>
          <p><strong>Address:</strong> University of Mpumalanga, South Africa</p>
        </div>

        <div className="contact-form">
          <h3>Send us a Message</h3>
          {submitted && <p className="contact-success">Message sent successfully!</p>}
          
          <form onSubmit={handleSubmit}>
            <div className="contact-form-group">
              <input
                type="text"
                name="name"
                className="contact-input"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact-form-group">
              <input
                type="email"
                name="email"
                className="contact-input"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact-form-group">
              <textarea
                name="message"
                className="contact-textarea"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                required
              />
            </div>
            <button type="submit" className="contact-button">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;