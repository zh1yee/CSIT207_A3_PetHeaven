import "./ContactPage.css"

function ContactPage() {
  return (
    <div className="contact-page">
      <div className="contact-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you! Reach out with any questions or concerns.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-card">
                <div className="contact-icon">📍</div>
                <h3>Visit Us</h3>
                <p>60 Paya Lebar Road</p>
                <p>Singapore 409051</p>
              </div>

              <div className="contact-card">
                <div className="contact-icon">📞</div>
                <h3>Call Us</h3>
                <p>Main: (555) 123-4567</p>
                <p>Emergency: (555) 123-4568</p>
              </div>

              <div className="contact-card">
                <div className="contact-icon">✉️</div>
                <h3>Email Us</h3>
                <p>info@petheaven.org</p>
                <p>adopt@petheaven.org</p>
              </div>

              <div className="contact-card">
                <div className="contact-icon">🕒</div>
                <h3>Hours</h3>
                <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                <p>Sat - Sun: 10:00 AM - 4:00 PM</p>
              </div>
            </div>

            <div className="contact-map">
              <div className="map-placeholder">
                <iframe src="https://bit.ly/48qrE0X" height="100%" width="100%" allowfullscreen="" loading="lazy" style={{border:0}}></iframe>
              </div>
            </div>
          </div>

          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>

            <div className="faq-item">
              <h3>How long does the adoption process take?</h3>
              <p>
                Typically 1-2 weeks from application submission to bringing your pet home. This includes interview, home
                visit, and meet-and-greet sessions.
              </p>
            </div>

            <div className="faq-item">
              <h3>What are the adoption fees?</h3>
              <p>
                Adoption fees vary by pet but typically range from $100-$300. This includes spaying/neutering,
                vaccinations, microchipping, and initial veterinary care.
              </p>
            </div>

            <div className="faq-item">
              <h3>Can I meet a pet before applying?</h3>
              <p>
                Yes! We encourage visits. Call ahead to schedule a meeting with any pet you're interested in. Walk-ins
                are welcome during operating hours.
              </p>
            </div>

            <div className="faq-item">
              <h3>Do you accept pet surrenders?</h3>
              <p>
                Yes, we accept surrenders based on available space. Please fill out our surrender form online, and we'll
                contact you within 24-48 hours to discuss options.
              </p>
            </div>

            <div className="faq-item">
              <h3>How can I help if I can't adopt?</h3>
              <p>
                There are many ways to support! You can volunteer, foster, donate, attend our events, or spread
                awareness about Pet Heaven in your community.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
