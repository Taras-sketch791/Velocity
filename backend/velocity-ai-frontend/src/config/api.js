const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export default {
  BASE_URL,
  endpoints: {
    REGISTER: '/register/',
    LOGIN: '/login/',
    LOGOUT: '/logout/',
    TOKEN_REFRESH: '/token/refresh/',
    PROFILE: '/profile/',
    SERVICES: '/services/',
    CASES: '/cases/',
    COMPETENCIES: '/competencies/',
  },

  getHeaders(auth = true) {
    const headers = { 'Content-Type': 'application/json' };
    if (auth) {
      const token = localStorage.getItem('access_token');
      if (token) headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  }
};