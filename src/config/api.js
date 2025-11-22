// API Configuration
// In development, uses proxy (localhost:3001)
// In production, uses REACT_APP_API_URL environment variable

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

// Debug: Log API configuration (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('API Configuration:', {
    API_BASE_URL: API_BASE_URL || 'Not set (using proxy)',
    NODE_ENV: process.env.NODE_ENV,
  });
}

// Helper function to build API URLs
const getApiUrl = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  if (API_BASE_URL) {
    // Production: use full URL (ensure no double slashes)
    const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    return `${base}/api/${cleanEndpoint}`;
  } else {
    // Development: use relative path (proxy will handle it)
    return `/api/${cleanEndpoint}`;
  }
};

// API endpoints
export const API_ENDPOINTS = {
  // Pets
  GET_PETS: getApiUrl('pets/view'),
  
  // User
  LOGIN: getApiUrl('user/login'),
  CREATE_USER: getApiUrl('user/create'),
  
  // Adoption
  CREATE_ADOPTION: getApiUrl('adoption/create'),
  
  // Surrender
  CREATE_SURRENDER: getApiUrl('surrender/create'),
};

