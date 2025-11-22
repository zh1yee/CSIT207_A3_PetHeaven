import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './PetDetailPage.css';

function PetDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const pet = location.state?.pet;

  if (!pet) {
    return (
      <div className="pet-detail-page">
        <div className="container section">
          <p>Pet not found. Please go back to the gallery.</p>
          <button className="btn btn-primary" onClick={() => navigate('/pets')}>
            Back to Gallery
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pet-detail-page">
      <div className="detail-header">
        <button className="back-button" onClick={() => navigate('/pets')}>
          ← Back to Gallery
        </button>
      </div>

      <section className="section">
        <div className="container">
          <div className="detail-content">
            <div className="detail-image-section">
              <img src={pet.image || "/placeholder.svg"} alt={pet.name} className="detail-image" />
              {pet.special && (
                <div className="special-notice">
                  <span className="notice-icon">⚠️</span>
                  <div>
                    <strong>Special Needs</strong>
                    <p>This pet requires extra care and attention. Please discuss specific needs with our staff.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="detail-info-section">
              <h1>{pet.name}</h1>
              <p className="pet-breed-large">{pet.breed}</p>

              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Age</span>
                  <span className="info-value">{pet.age} {pet.age === 1 ? 'year' : 'years'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Gender</span>
                  <span className="info-value">{pet.gender}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Breed</span>
                  <span className="info-value">{pet.breed}</span>
                </div>
              </div>

              <div className="detail-section">
                <h3>Personality</h3>
                <div className="personality-tags">
                  {pet.personality.map((trait, index) => (
                    <span key={index} className="personality-tag">{trait}</span>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h3>About {pet.name}</h3>
                <p>{pet.description}</p>
                <p>
                  {pet.name} has been fully vaccinated, spayed/neutered, and received a complete 
                  health check from our veterinary team. {pet.gender === 'Male' ? 'He' : 'She'} is 
                  ready to join a loving family and bring joy to their new home.
                </p>
              </div>

              <div className="detail-section">
                <h3>Care Requirements</h3>
                <ul className="care-list">
                  <li>Regular veterinary check-ups</li>
                  <li>Daily exercise and playtime</li>
                  <li>Balanced nutrition and fresh water</li>
                  <li>Love, attention, and patience</li>
                  {pet.special && <li><strong>Additional special care needs (discuss with staff)</strong></li>}
                </ul>
              </div>

              <div className="action-buttons">
                <button 
                  className="btn btn-primary btn-large" 
                  onClick={() => navigate('/adopt', { state: { pet } })}
                >
                  Adopt {pet.name}
                </button>
                <button 
                  className="btn btn-outline btn-large" 
                  onClick={() => navigate('/contact')}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PetDetailPage;
