"use client"

import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useToast } from "../context/ToastContext"
import "./Navigation.css"

function Navigation({ darkMode, setDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuth()
  const { showToast } = useToast()

  const menuItems = [
    { id: "home", path: "/", label: "Home" },
    { id: "about", path: "/about", label: "About Us" },
    { id: "pets", path: "/pets", label: "Available Pets" },
    { id: "surrender", path: "/surrender", label: "Surrender Pet" },
    ...(isAuthenticated 
      ? [] 
      : [
          { id: "register", path: "/register", label: "Become a Member" },
          { id: "login", path: "/login", label: "Login" }
        ]),
    { id: "contact", path: "/contact", label: "Contact" },
  ]

  const handleLogout = () => {
    logout()
    showToast("Logged out successfully", "success")
    navigate("/")
    setIsMenuOpen(false)
  }

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/"
    }
    return location.pathname.startsWith(path)
  }

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={handleLinkClick}>
          <span className="logo-icon">🐾</span>
          <span className="logo-text">Pet Heaven</span>
        </Link>

        <div className="nav-actions">
          <button
            className="dark-mode-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className={`nav-link ${isActive(item.path) ? "active" : ""}`}
                onClick={handleLinkClick}
              >
                {item.label}
              </Link>
            </li>
          ))}
          {isAuthenticated && (
            <>
              <li className="nav-user-info">
                <span className="nav-user-name">👋 {user?.name || "User"}</span>
              </li>
              <li>
                <button
                  className="nav-link nav-logout"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
