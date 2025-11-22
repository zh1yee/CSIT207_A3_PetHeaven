import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <span className="logo-icon">🐾</span>
          <h3 style={{display:"inline-block"}}>Pet Heaven</h3>
          <p>Giving abandoned pets a second chance at happiness.</p>
          <div className="social-links">
            <a href="#" className="social-icon">📘</a>
            <a href="#" className="social-icon">📷</a>
            <a href="#" className="social-icon">🐦</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/pets">Available Pets</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Get Involved</h4>
          <ul>
            <li><Link to="/pets">Adopt a Pet</Link></li>
            <li><Link to="/surrender">Surrender a Pet</Link></li>
            <li><Link to="/register">Become a Member</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>📍 60 Paya Lebar Road, Singapore 409051</p>
          <p>📞 (555) 123-4567</p>
          <p>✉️ info@petheaven.org</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Pet Heaven. All rights reserved. Made with ❤️ for pets.</p>
      </div>
    </footer>
  );
}

export default Footer;
