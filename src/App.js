"use client"

import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom"
import "./App.css"
import Navigation from "./components/Navigation"
import Footer from "./components/Footer"
import Toast from "./components/Toast"
import { ToastProvider, useToast } from "./context/ToastContext"
import { AuthProvider } from "./context/AuthContext"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import PetsGalleryPage from "./pages/PetsGalleryPage"
import PetDetailPage from "./pages/PetDetailPage"
import AdoptionFormPage from "./pages/AdoptionFormPage"
import SurrenderFormPage from "./pages/SurrenderFormPage"
import RegisterPage from "./pages/RegisterPage"
import ContactPage from "./pages/ContactPage"
import LoginPage from "./pages/LoginPage"

// Toast container component
function ToastContainer() {
  const { toasts, removeToast } = useToast()
  
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )
}

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function AppContent() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode")
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode")
    } else {
      document.documentElement.classList.remove("dark-mode")
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
  }, [darkMode])

  return (
    <div className="app">
      <ToastProvider>
        <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
        <ScrollToTop />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pets" element={<PetsGalleryPage />} />
            <Route path="/pet/:id" element={<PetDetailPage />} />
            <Route path="/adopt" element={<AdoptionFormPage />} />
            <Route path="/adopt/:petId" element={<AdoptionFormPage />} />
            <Route path="/surrender" element={<SurrenderFormPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer />
      </ToastProvider>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App



/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/