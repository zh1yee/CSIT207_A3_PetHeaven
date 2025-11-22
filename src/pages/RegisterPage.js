"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "../context/ToastContext"
import { useAuth } from "../context/AuthContext"
import { API_ENDPOINTS } from "../config/api"
import "./FormPages.css"

function RegisterPage() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    street_address: "",
    door_floor: "",
    zip_code: "",
    occupation: "",
    interested: [],
    volunteer: "",
    donation: "",
    subscrption: true,
    message: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const interestOptions = ["Adoption", "Volunteering", "Fostering", "Donations", "Events", "Education"]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleInterestChange = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interested: prev.interested.includes(interest)
        ? prev.interested.filter((i) => i !== interest)
        : [...prev.interested, interest],
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Full name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      showToast("Please fill in all required fields correctly", "error")
      return
    }

    
    try {
      const response = await fetch(API_ENDPOINTS.CREATE_USER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        const userData = result.user || result; // Handle both response formats
        // Auto-login after registration
        if (userData && userData.id) {
          login(userData)
        }
        setTimeout(() => {
          console.log("Registration form submitted:", formData)
          showToast(`Registration successful! Welcome to the Pet Heaven family, ${userData?.name || 'there'}!`, "success")
          setIsSubmitting(false)
          navigate("/")
        }, 1500)
      } else {
        const res = await response.json();
        console.log("Error: " + res.error);
        showToast(`Registration failed: ${res.error || "Please try again later."}`, "error");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      showToast("Registration failed. Please try again later.", "error");
      return;
    }

   setIsSubmitting(true)
  }

  return (
    <div className="form-page">
      <div className="form-header">
        <div className="container">
          <h1>Become a Member</h1>
          <p>Join our community of pet lovers and supporters</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="form-container">
            <div className="info-box">
              <h3>Membership Benefits</h3>
              <ul>
                <li>Priority access to adoption opportunities</li>
                <li>Invitations to exclusive events and meet-and-greets</li>
                <li>Monthly newsletter with pet care tips</li>
                <li>Volunteer opportunities</li>
                <li>Community of fellow pet lovers</li>
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="adoption-form">
              <div className="form-section">
                <h2>Personal Information</h2>

                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "error" : ""}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
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
                      className={errors.email ? "error" : ""}
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
                      className={errors.phone ? "error" : ""}
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="text" id="password" name="password" value={formData.password} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Street Address</label>
                    <input type="text" id="address" name="street_address" value={formData.street_address} onChange={handleChange} />
                  </div>

                <div className="form-row">
{/*                
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} />
                  </div>
*/}
                  <div className="form-group">
                    <label htmlFor="doorFloor">Door/Floor (If Any)</label>
                    <input type="text" id="doorFloor" name="door_floor" value={formData.door_floor} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="zipCode">Zip Code</label>
                    <input type="text" id="zipCode" name="zip_code" value={formData.zip_code} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="occupation">Occupation (Optional)</label>
                  <input
                    type="text"
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-section">
                <h2>Interests & Preferences</h2>

                <div className="form-group">
                  <label>What are you interested in? (Select all that apply)</label>
                  <div className="checkbox-group">
                    {interestOptions.map((interest) => (
                      <label key={interest} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.interested.includes(interest)}
                          onChange={() => handleInterestChange(interest)}
                        />
                        <span>{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="volunteer">Would you like to volunteer?</label>
                  <select id="volunteer" name="volunteer" value={formData.volunteer} onChange={handleChange}>
                    <option value="">Select...</option>
                    <option value="yes">Yes, I'm interested</option>
                    <option value="maybe">Maybe in the future</option>
                    <option value="no">No, not at this time</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="donation">Would you like to make a donation?</label>
                  <select id="donation" name="donation" value={formData.donation} onChange={handleChange}>
                    <option value="">Select...</option>
                    <option value="yes">Yes, I'd like to donate</option>
                    <option value="monthly">I'm interested in monthly donations</option>
                    <option value="later">Maybe later</option>
                    <option value="no">No, not at this time</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input type="checkbox" name="subscrption" checked={formData.subscrption} onChange={handleChange} />
                    <span>Subscribe to our monthly newsletter</span>
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Additional Message (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us why you want to join Pet Heaven or any questions you have..."
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => navigate("/")}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "Registering..." : "Complete Registration"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RegisterPage
