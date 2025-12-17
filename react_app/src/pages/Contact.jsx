import { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Message received! This is a demonstration. In production, this would send your message.');
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact">
      <div className="contact-header">
        <h1>Contact & Inquiries</h1>
        <p className="subheadline">Professional Communication Channels</p>
      </div>

      <div className="classified-section">
        <h2 className="classified-title">★ Classified Listings ★</h2>
        <p style={{ textAlign: 'center', fontSize: '1.1rem', marginBottom: '2rem' }}>
          <strong>SEEKING:</strong> Collaboration opportunities, technical consultations, 
          and professional engagements in software development.
        </p>

        <div className="contact-methods">
          <div className="contact-card">
            <div className="contact-icon">📧</div>
            <h3>Electronic Mail</h3>
            <p style={{ fontSize: '0.9rem', margin: '0.5rem 0' }}>
              Professional correspondence
            </p>
            <a href="mailto:allen.thomson@example.com">Send Message</a>
          </div>

          <div className="contact-card">
            <div className="contact-icon">💼</div>
            <h3>LinkedIn</h3>
            <p style={{ fontSize: '0.9rem', margin: '0.5rem 0' }}>
              Professional networking
            </p>
            <a 
              href="https://www.linkedin.com/in/allen-thomson-5b1309110/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View Profile
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-icon">⚙️</div>
            <h3>GitHub</h3>
            <p style={{ fontSize: '0.9rem', margin: '0.5rem 0' }}>
              Code repositories
            </p>
            <a 
              href="https://github.com/Allono07" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View Projects
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-icon">🧩</div>
            <h3>LeetCode</h3>
            <p style={{ fontSize: '0.9rem', margin: '0.5rem 0' }}>
              Algorithm practice
            </p>
            <a 
              href="https://leetcode.com/u/AllenThomson/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View Solutions
            </a>
          </div>
        </div>
      </div>

      <p className="ornamental-divider"></p>

      <div className="contact-form">
        <h2 className="form-title">Send Correspondence</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Electronic Mail Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject Matter</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Reason for correspondence"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message Content</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Detailed message..."
            />
          </div>

          <button type="submit" className="vintage-btn submit-btn">
            Dispatch Message
          </button>
        </form>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center', padding: '1.5rem', border: '1px dashed var(--border-color)', background: 'var(--paper-aged)' }}>
        <p style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>
          <strong>Notice:</strong> All inquiries receive prompt attention during regular business hours. 
          Response time typically within 24-48 hours.
        </p>
      </div>
    </div>
  );
};

export default Contact;
