"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "../context/ToastContext"
import { useAuth } from "../context/AuthContext"
import { API_ENDPOINTS } from "../config/api"
import "./FormPages.css"

function LoginPage() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({})
  const [rememberMe, setRememberMe] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const response = await fetch(API_ENDPOINTS.LOGIN, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const result = await response.json();
          const userData = result.user
          // Store user data in context
          login(userData)
          showToast(`Login successful! Welcome back, ${userData.name}!`, "success")
          console.log("Login data:", { ...formData, rememberMe })
          setTimeout(() => {
            navigate("/")
          }, 1500)
        } else {
          const res = await response.json();
          console.log("Error: " + res.error);
          showToast(`Login failed: ${res.error}. Please try again later.`, "error");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        showToast("Login failed. Please try again later.", "error");
        return;
      }      
    } else {
      showToast("Please correct the errors in the form", "error")
    }
  }

  return (
    <div className="form-page">
      <div className="form-header">
        <h1>Member Login</h1>
        <p>Welcome back! Log in to access your Pet Heaven account</p>
      </div>

      <div className="form-container">
        <div className="info-box">
          <h3>Member Benefits</h3>
          <ul>
            <li>Track your adoption applications</li>
            <li>Save your favorite pets</li>
            <li>Receive updates about pets you're interested in</li>
            <li>Access exclusive adoption events</li>
            <li>Connect with our community of pet lovers</li>
          </ul>
        </div>

        <form className="adoption-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Login Credentials</h2>

            <div className="form-group">
              <label htmlFor="email">
                Email Address <span style={{ color: "var(--error)" }}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
                placeholder="your.email@example.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Password <span style={{ color: "var(--error)" }}>*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
                placeholder="Enter your password"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group" style={{ marginBottom: "10px" }}>
              <label className="checkbox-label" style={{ padding: "0", justifyContent: "flex-start" }}>
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                <span>Remember me on this device</span>
              </label>
            </div>

            <div style={{ marginTop: "15px" }}>
              <button
                type="button"
                className="btn-text"
                onClick={() => showToast("Password reset link sent to your email!", "info")}
                style={{
                  color: "var(--primary-color)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontSize: "0.95rem",
                }}
              >
                Forgot your password?
              </button>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={() => navigate("/")}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>

          <div
            style={{
              textAlign: "center",
              marginTop: "25px",
              paddingTop: "25px",
              borderTop: "2px solid var(--neutral-medium)",
            }}
          >
            <p style={{ color: "var(--text-light)", marginBottom: "10px" }}>Don't have an account?</p>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate("/register")}
              style={{ minWidth: "200px" }}
            >
              Register Now
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
