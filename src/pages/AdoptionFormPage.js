import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { API_ENDPOINTS } from '../config/api';
import './FormPages.css';

function AdoptionFormPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { petId } = useParams();
  const { showToast } = useToast();
  const { user } = useAuth();
  const selectedPet = location.state?.pet || null;

  const [formData, setFormData] = useState({
    userId: user?.id || null,
    petId: selectedPet?.id || petId || '',
    fullName: '',
    email: '',
    phone: '',
    address: '',
    zipCode: '',
    housingType: '',
    ownOrRent: '',
    landlordApproval: '',
    hasYard: '',
    householdMembers: '',
    hasChildren: '',
    childrenAges: '',
    hasPets: '',
    petDetails: '',
    experience: '',
    hoursAlone: '',
    reason: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.street_address || '',
        zipCode: user.zip_code || '',
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

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    if (!formData.housingType) newErrors.housingType = 'Please select housing type';
    if (!formData.ownOrRent) newErrors.ownOrRent = 'Please select own or rent';
    if (!formData.experience.trim()) newErrors.experience = 'Please describe your experience';
    if (!formData.reason.trim()) newErrors.reason = 'Please tell us why you want to adopt';

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

    // Prepare submission data with userId if logged in
    const submissionData = {
      ...formData,
      userId: user?.id || null,
    };

    try {
      const response = await fetch(API_ENDPOINTS.CREATE_ADOPTION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        setTimeout(() => {
          console.log('Adoption form submitted:', submissionData);
          showToast(`Adoption request for ${selectedPet?.name || 'a pet'} submitted successfully! We'll contact you soon.`, 'success');
          setIsSubmitting(false);
          navigate('/pets');
        }, 1500);
      } else {
        const res = await response.json();
        console.log("Error: " + res.error);
        showToast(`Submission failed: ${res.error || "Please try again later."}`, "error");
      }
      
    } catch (error) {
      console.error('Error submitting adoption form:', error);
      showToast('There was an error submitting the form. Please try again later.', 'error');
      setIsSubmitting(false);
      return;
    }
  };

  return (
    <div className="form-page">
      <div className="form-header">
        <div className="container">
          <h1>Pet Adoption Request</h1>
          <p>Complete this form to request adoption{selectedPet ? ` for ${selectedPet.name}` : ''}</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="form-container">
            {selectedPet && (
              <div className="selected-pet-banner">
                <img src={selectedPet.image || "/placeholder.svg"} alt={selectedPet.name} />
                <div>
                  <h3>Adopting: {selectedPet.name}</h3>
                  <p>{selectedPet.breed} • {selectedPet.age} {selectedPet.age === 1 ? 'year' : 'years'} old</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="adoption-form">
              <div className="form-section">
                <h2>Personal Information</h2>
                
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={errors.fullName ? 'error' : ''}
                  />
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="address">Street Address *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={errors.address ? 'error' : ''}
                    />
                    {errors.address && <span className="error-message">{errors.address}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="zipCode">Zip Code *</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={errors.zipCode ? 'error' : ''}
                    />
                    {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h2>Housing Information</h2>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="housingType">Housing Type *</label>
                    <select
                      id="housingType"
                      name="housingType"
                      value={formData.housingType}
                      onChange={handleChange}
                      className={errors.housingType ? 'error' : ''}
                    >
                      <option value="">Select...</option>
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="condo">Condo</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.housingType && <span className="error-message">{errors.housingType}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="ownOrRent">Do you own or rent? *</label>
                    <select
                      id="ownOrRent"
                      name="ownOrRent"
                      value={formData.ownOrRent}
                      onChange={handleChange}
                      className={errors.ownOrRent ? 'error' : ''}
                    >
                      <option value="">Select...</option>
                      <option value="own">Own</option>
                      <option value="rent">Rent</option>
                    </select>
                    {errors.ownOrRent && <span className="error-message">{errors.ownOrRent}</span>}
                  </div>
                </div>

                {formData.ownOrRent === 'rent' && (
                  <div className="form-group">
                    <label htmlFor="landlordApproval">Do you have landlord approval for pets?</label>
                    <select
                      id="landlordApproval"
                      name="landlordApproval"
                      value={formData.landlordApproval}
                      onChange={handleChange}
                    >
                      <option value="">Select...</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="hasYard">Do you have a yard?</label>
                  <select
                    id="hasYard"
                    name="hasYard"
                    value={formData.hasYard}
                    onChange={handleChange}
                  >
                    <option value="">Select...</option>
                    <option value="yes-fenced">Yes, fenced</option>
                    <option value="yes-unfenced">Yes, unfenced</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>

              <div className="form-section">
                <h2>Household Information</h2>

                <div className="form-group">
                  <label htmlFor="householdMembers">Number of people in household</label>
                  <input
                    type="number"
                    id="householdMembers"
                    name="householdMembers"
                    value={formData.householdMembers}
                    onChange={handleChange}
                    min="1"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="hasChildren">Do you have children?</label>
                  <select
                    id="hasChildren"
                    name="hasChildren"
                    value={formData.hasChildren}
                    onChange={handleChange}
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                {formData.hasChildren === 'yes' && (
                  <div className="form-group">
                    <label htmlFor="childrenAges">Ages of children</label>
                    <input
                      type="text"
                      id="childrenAges"
                      name="childrenAges"
                      value={formData.childrenAges}
                      onChange={handleChange}
                      placeholder="e.g., 5, 8, 12"
                    />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="hasPets">Do you currently have other pets?</label>
                  <select
                    id="hasPets"
                    name="hasPets"
                    value={formData.hasPets}
                    onChange={handleChange}
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                {formData.hasPets === 'yes' && (
                  <div className="form-group">
                    <label htmlFor="petDetails">Please describe your current pets</label>
                    <textarea
                      id="petDetails"
                      name="petDetails"
                      value={formData.petDetails}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Type, breed, age, temperament..."
                    />
                  </div>
                )}
              </div>

              <div className="form-section">
                <h2>Pet Care Experience</h2>

                <div className="form-group">
                  <label htmlFor="experience">Describe your experience with pets *</label>
                  <textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    rows="4"
                    className={errors.experience ? 'error' : ''}
                    placeholder="Tell us about your history with pets, including any previous adoptions..."
                  />
                  {errors.experience && <span className="error-message">{errors.experience}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="hoursAlone">How many hours per day will the pet be alone?</label>
                  <select
                    id="hoursAlone"
                    name="hoursAlone"
                    value={formData.hoursAlone}
                    onChange={handleChange}
                  >
                    <option value="">Select...</option>
                    <option value="0-2">0-2 hours</option>
                    <option value="3-5">3-5 hours</option>
                    <option value="6-8">6-8 hours</option>
                    <option value="9+">9+ hours</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="reason">Why do you want to adopt this pet? *</label>
                  <textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    rows="4"
                    className={errors.reason ? 'error' : ''}
                    placeholder="Tell us why you're interested in adopting and what you can offer..."
                  />
                  {errors.reason && <span className="error-message">{errors.reason}</span>}
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={() => navigate('/pets')}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Adoption Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdoptionFormPage;
