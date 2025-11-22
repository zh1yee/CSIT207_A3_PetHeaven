import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { API_ENDPOINTS } from '../config/api';
import './FormPages.css';

function SurrenderFormPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    userId: user?.id || null,
    owner_name: '',
    owner_email: '',
    owner_phone: '',
    owner_address: '',
    petName: '',
    petType: '',
    breed: '',
    age: '',
    gender: '',
    spayedNeutered: '',
    vaccinated: '',
    microchipped: '',
    healthIssues: '',
    healthDetails: '',
    personality: '',
    goodWithKids: '',
    goodWithPets: '',
    reason: '',
    urgency: '',
    additionalInfo: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        owner_name: user.name || '',
        owner_email: user.email || '',
        owner_phone: user.phone || '',
        owner_address: user.street_address || '',
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.owner_name.trim()) newErrors.owner_name = 'Your name is required';
    if (!formData.owner_email.trim()) {
      newErrors.owner_email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.owner_email)) {
      newErrors.owner_email = 'Please enter a valid email address';
    }
    if (!formData.owner_phone.trim()) newErrors.owner_phone = 'Phone number is required';
    if (!formData.petName.trim()) newErrors.petName = 'Pet name is required';
    if (!formData.petType) newErrors.petType = 'Please select pet type';
    if (!formData.breed.trim()) newErrors.breed = 'Breed is required';
    if (!formData.age.trim()) newErrors.age = 'Age is required';
    if (!formData.gender) newErrors.gender = 'Please select gender';
    if (!formData.reason.trim()) newErrors.reason = 'Please tell us the reason for surrender';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast('Please fill in all required fields correctly', 'error');
      return;
    }

    setIsSubmitting(true);
    /*
    // Prepare submission data with userId if logged in
    const submissionData = {
      ...formData,
      userId: user?.id || null,
    };
    */

    try {
      const response = await fetch(API_ENDPOINTS.CREATE_SURRENDER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setTimeout(() => {
          console.log('[v0] Surrender form submitted:', formData);
          showToast('Pet surrender request submitted successfully. We will contact you within 24-48 hours.', 'success');
          setIsSubmitting(false);
          navigate('/');
        }, 1500);
      } else {
        const res = await response.json();
        console.log("Error: " + res.error);
        showToast(`Submission failed: ${res.error || "Please try again later."}`, "error");
      }
      
    } catch (error) {
      console.error('Error submitting surrender form:', error);
      showToast('There was an error submitting the form. Please try again later.', 'error');
      setIsSubmitting(false);
      return;
    }

    
  };

  return (
    <div className="form-page">
      <div className="form-header">
        <div className="container">
          <h1>Pet Surrender Request</h1>
          <p>We understand this is a difficult decision. Please provide detailed information about your pet.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="form-container">
            <div className="info-box">
              <h3>Before You Surrender</h3>
              <p>
                We know that giving up a pet is never easy. Please consider all options before proceeding. 
                Sometimes temporary challenges can be overcome with support. Our team is here to help you 
                explore alternatives if possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="adoption-form">
              <div className="form-section">
                <h2>Owner Information</h2>
                
                <div className="form-group">
                  <label htmlFor="owner_name">Your Full Name *</label>
                  <input
                    type="text"
                    id="owner_name"
                    name="owner_name"
                    value={formData.owner_name}
                    onChange={handleChange}
                    className={errors.owner_name ? 'error' : ''}
                  />
                  {errors.owner_name && <span className="error-message">{errors.owner_name}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="owner_email">Email Address *</label>
                    <input
                      type="owner_email"
                      id="owner_email"
                      name="owner_email"
                      value={formData.owner_email}
                      onChange={handleChange}
                      className={errors.owner_email ? 'error' : ''}
                    />
                    {errors.owner_email && <span className="error-message">{errors.owner_email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="owner_phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="owner_phone"
                      name="owner_phone"
                      value={formData.owner_phone}
                      onChange={handleChange}
                      className={errors.owner_phone ? 'error' : ''}
                    />
                    {errors.owner_phone && <span className="error-message">{errors.owner_phone}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="owner_address">Address</label>
                  <input
                    type="text"
                    id="owner_address"
                    name="owner_address"
                    value={formData.owner_address}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-section">
                <h2>Pet Information</h2>

                <div className="form-group">
                  <label htmlFor="petName">Pet's Name *</label>
                  <input
                    type="text"
                    id="petName"
                    name="petName"
                    value={formData.petName}
                    onChange={handleChange}
                    className={errors.petName ? 'error' : ''}
                  />
                  {errors.petName && <span className="error-message">{errors.petName}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="petType">Pet Type *</label>
                    <select
                      id="petType"
                      name="petType"
                      value={formData.petType}
                      onChange={handleChange}
                      className={errors.petType ? 'error' : ''}
                    >
                      <option value="">Select...</option>
                      <option value="cat">Cat</option>
                      <option value="dog">Dog</option>
                    </select>
                    {errors.petType && <span className="error-message">{errors.petType}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="breed">Breed *</label>
                    <input
                      type="text"
                      id="breed"
                      name="breed"
                      value={formData.breed}
                      onChange={handleChange}
                      className={errors.breed ? 'error' : ''}
                      placeholder="e.g., Labrador, Siamese, Mixed"
                    />
                    {errors.breed && <span className="error-message">{errors.breed}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="age">Age *</label>
                    <input
                      type="text"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className={errors.age ? 'error' : ''}
                      placeholder="e.g., 3 years, 6 months"
                    />
                    {errors.age && <span className="error-message">{errors.age}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="gender">Gender *</label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={errors.gender ? 'error' : ''}
                    >
                      <option value="">Select...</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    {errors.gender && <span className="error-message">{errors.gender}</span>}
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h2>Medical Information</h2>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="spayedNeutered">Spayed/Neutered?</label>
                    <select
                      id="spayedNeutered"
                      name="spayedNeutered"
                      value={formData.spayedNeutered}
                      onChange={handleChange}
                    >
                      <option value="">Select...</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="unknown">Unknown</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="vaccinated">Up to date on vaccinations?</label>
                    <select
                      id="vaccinated"
                      name="vaccinated"
                      value={formData.vaccinated}
                      onChange={handleChange}
                    >
                      <option value="">Select...</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="unknown">Unknown</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="microchipped">Microchipped?</label>
                    <select
                      id="microchipped"
                      name="microchipped"
                      value={formData.microchipped}
                      onChange={handleChange}
                    >
                      <option value="">Select...</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="unknown">Unknown</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="healthIssues">Does your pet have any health issues?</label>
                  <select
                    id="healthIssues"
                    name="healthIssues"
                    value={formData.healthIssues}
                    onChange={handleChange}
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                {formData.healthIssues === 'yes' && (
                  <div className="form-group">
                    <label htmlFor="healthDetails">Please describe any health issues</label>
                    <textarea
                      id="healthDetails"
                      name="healthDetails"
                      value={formData.healthDetails}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Include any medications, special care needs, or medical conditions..."
                    />
                  </div>
                )}
              </div>

              <div className="form-section">
                <h2>Behavior & Temperament</h2>

                <div className="form-group">
                  <label htmlFor="personality">Describe your pet's personality</label>
                  <textarea
                    id="personality"
                    name="personality"
                    value={formData.personality}
                    onChange={handleChange}
                    rows="3"
                    placeholder="e.g., playful, calm, energetic, shy, friendly..."
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="goodWithKids">Good with children?</label>
                    <select
                      id="goodWithKids"
                      name="goodWithKids"
                      value={formData.goodWithKids}
                      onChange={handleChange}
                    >
                      <option value="">Select...</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="unknown">Unknown</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="goodWithPets">Good with other pets?</label>
                    <select
                      id="goodWithPets"
                      name="goodWithPets"
                      value={formData.goodWithPets}
                      onChange={handleChange}
                    >
                      <option value="">Select...</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="unknown">Unknown</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h2>Surrender Information</h2>

                <div className="form-group">
                  <label htmlFor="reason">Reason for surrender *</label>
                  <textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    rows="4"
                    className={errors.reason ? 'error' : ''}
                    placeholder="Please be honest about your situation. This helps us understand and better care for your pet."
                  />
                  {errors.reason && <span className="error-message">{errors.reason}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="urgency">How urgent is this surrender?</label>
                  <select
                    id="urgency"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                  >
                    <option value="">Select...</option>
                    <option value="immediate">Immediate (within 1 week)</option>
                    <option value="soon">Soon (1-2 weeks)</option>
                    <option value="flexible">Flexible (2+ weeks)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="additionalInfo">Additional information</label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Any other information that would help us care for your pet..."
                  />
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={() => navigate('/')}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Surrender Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SurrenderFormPage;
