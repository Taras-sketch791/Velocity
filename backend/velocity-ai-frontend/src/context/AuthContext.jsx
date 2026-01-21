import React, { createContext, useState, useEffect, useContext } from 'react';
import API_CONFIG from '../config/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user_data');

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = (tokens, userData) => {
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
    localStorage.setItem('user_data', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem('refresh_token');

    if (refreshToken) {
      try {
        await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.endpoints.LOGOUT}`, {
          method: 'POST',
          headers: API_CONFIG.getHeaders(),
          body: JSON.stringify({ refresh: refreshToken }),
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return false;

    try {
      const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.endpoints.TOKEN_REFRESH}`, {
        method: 'POST',
        headers: API_CONFIG.getHeaders(false),
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('access_token', data.access);
        return true;
      }
    } catch (error) {
      console.error('Token refresh error:', error);
    }

    logout();
    return false;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);