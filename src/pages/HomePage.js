import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import cuteCat from '../images/cute-cat.png';

function HomePage() {
  const navigate = useNavigate();
  const features = [
    {
      icon: '🏠',
      title: 'Safe Haven',
      description: 'We provide a loving and secure environment for abandoned pets until they find their forever homes.'
    },
    {
      icon: '❤️',
      title: 'Medical Care',
      description: 'All pets receive complete veterinary care, vaccinations, and health screenings.'
    },
    {
      icon: '🤝',
      title: 'Perfect Match',
      description: 'We carefully match pets with suitable families to ensure lasting, happy relationships.'
    },
    {
      icon: '📋',
      title: 'Easy Process',
      description: 'Simple online forms make adoption and surrender processes smooth and transparent.'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Pet Heaven</h1>
          <p className="hero-subtitle">
            Giving abandoned pets a second chance at love and happiness
          </p>
          <p className="hero-description">
            We rescue, care for, and rehome cats and dogs who need a fresh start. 
            Every pet deserves a loving family, and we're here to make that connection happen.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => navigate('/pets')}>
              Browse Available Pets
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/register')}>
              Become a Member
            </button>
          </div>
        </div>
        <div className="hero-image">
            <img src={cuteCat} alt="Cat Image" style={{ width: '500px'}} />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section section">
        <div className="container">
          <h2 className="section-title">Why Choose Pet Heaven?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Make a Difference?</h2>
            <p>Whether you want to adopt, help a pet in need, or support our mission, we'd love to hear from you.</p>
            <div className="cta-buttons">
              <button className="btn btn-secondary" onClick={() => navigate('/pets')}>
                Adopt a Pet
              </button>
              <button className="btn btn-outline" onClick={() => navigate('/surrender')}>
                Surrender a Pet
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Pets Rehomed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1,200+</div>
              <div className="stat-label">Happy Families</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Success Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Care & Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
