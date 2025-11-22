import React from 'react';
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <h1>About Pet Heaven</h1>
          <p className="about-subtitle">
            Dedicated to giving every abandoned pet a second chance at happiness
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="content-block">
            <h2>Our Mission</h2>
            <p>
              Pet Heaven is a non-profit charity organization committed to the welfare of abandoned 
              and neglected pets. We believe every cat and dog deserves a loving home, proper care, 
              and the chance to bring joy to a family.
            </p>
            <p>
              Founded in 2015, we've helped over 1,200 pets find their forever homes through our 
              comprehensive adoption program. Our dedicated team works tirelessly to rescue, 
              rehabilitate, and rehome pets while educating the community about responsible pet ownership.
            </p>
          </div>

          <div className="content-block">
            <h2>Our Facilities</h2>
            <div className="facilities-grid">
              <div className="facility-item">
                <span className="facility-icon">🏥</span>
                <h3>Medical Center</h3>
                <p>
                  Full-service veterinary clinic providing vaccinations, health screenings, 
                  spaying/neutering, and emergency care for all our pets.
                </p>
              </div>
              <div className="facility-item">
                <span className="facility-icon">🏡</span>
                <h3>Comfortable Housing</h3>
                <p>
                  Climate-controlled, spacious living areas designed to make pets feel safe 
                  and comfortable while they wait for adoption.
                </p>
              </div>
              <div className="facility-item">
                <span className="facility-icon">🎮</span>
                <h3>Play Areas</h3>
                <p>
                  Indoor and outdoor spaces where pets can exercise, socialize, and receive 
                  behavioral training and enrichment activities.
                </p>
              </div>
              <div className="facility-item">
                <span className="facility-icon">👨‍⚕️</span>
                <h3>Grooming Station</h3>
                <p>
                  Professional grooming services to ensure every pet looks and feels their 
                  best before meeting potential families.
                </p>
              </div>
            </div>
          </div>

          <div className="content-block">
            <h2>The Adoption Process</h2>
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <h3>Browse Available Pets</h3>
                <p>
                  Visit our gallery to see all pets currently available for adoption. 
                  Each profile includes photos, personality traits, and special needs.
                </p>
              </div>
              <div className="process-step">
                <div className="step-number">2</div>
                <h3>Register as a Member</h3>
                <p>
                  Create a free account to become a supporter of Pet Heaven and gain 
                  access to submit adoption requests.
                </p>
              </div>
              <div className="process-step">
                <div className="step-number">3</div>
                <h3>Submit Adoption Request</h3>
                <p>
                  Fill out our online adoption form with information about your home, 
                  lifestyle, and experience with pets.
                </p>
              </div>
              <div className="process-step">
                <div className="step-number">4</div>
                <h3>Interview & Home Visit</h3>
                <p>
                  Our team will contact you for an interview and may arrange a home visit 
                  to ensure the best match for both you and the pet.
                </p>
              </div>
              <div className="process-step">
                <div className="step-number">5</div>
                <h3>Meet & Greet</h3>
                <p>
                  Schedule a visit to meet your potential new family member in person 
                  and see if it's the perfect match.
                </p>
              </div>
              <div className="process-step">
                <div className="step-number">6</div>
                <h3>Welcome Home!</h3>
                <p>
                  Complete the adoption paperwork and bring your new companion home. 
                  We provide ongoing support and resources.
                </p>
              </div>
            </div>
          </div>

          <div className="content-block">
            <h2>Our Values</h2>
            <ul className="values-list">
              <li><strong>Compassion:</strong> We treat every animal with love, dignity, and respect.</li>
              <li><strong>Commitment:</strong> We never give up on finding the right home for each pet.</li>
              <li><strong>Transparency:</strong> We maintain open communication with adopters and the community.</li>
              <li><strong>Education:</strong> We promote responsible pet ownership and animal welfare awareness.</li>
              <li><strong>Excellence:</strong> We provide the highest standard of care for all animals in our facility.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
