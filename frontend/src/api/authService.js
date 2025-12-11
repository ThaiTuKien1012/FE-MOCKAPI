import axios from 'axios';
import mockAuthService from './mockAuthService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// Use mock API if explicitly enabled OR if no API URL is set
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true' || 
                     (import.meta.env.VITE_USE_MOCK_API !== 'false' && !import.meta.env.VITE_API_URL);

// Debug log (remove in production)
if (import.meta.env.DEV) {
  console.log('🔧 Auth Service Config:', {
    USE_MOCK_API,
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_USE_MOCK_API: import.meta.env.VITE_USE_MOCK_API
  });
}

const authService = {
  register: async (userData) => {
    // Use mock API if enabled
    if (USE_MOCK_API) {
      const result = await mockAuthService.register(userData);
      if (result.success) {
        localStorage.setItem('token', result.data.tokens.accessToken);
        localStorage.setItem('refreshToken', result.data.tokens.refreshToken);
        localStorage.setItem('user', JSON.stringify(result.data.user));
      }
      return result;
    }

    // Real API call
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      if (response.data.success) {
        localStorage.setItem('token', response.data.data.tokens.accessToken);
        localStorage.setItem('refreshToken', response.data.data.tokens.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Registration failed'
      };
    }
  },

  login: async (credentials) => {
    // Use mock API if enabled
    if (USE_MOCK_API) {
      const result = await mockAuthService.login(credentials);
      if (result.success) {
        localStorage.setItem('token', result.data.tokens.accessToken);
        localStorage.setItem('refreshToken', result.data.tokens.refreshToken);
        localStorage.setItem('user', JSON.stringify(result.data.user));
      }
      return result;
    }

    // Real API call
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      if (response.data.success) {
        localStorage.setItem('token', response.data.data.tokens.accessToken);
        localStorage.setItem('refreshToken', response.data.data.tokens.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Login failed'
      };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  refreshToken: async () => {
    // Use mock API if enabled
    if (USE_MOCK_API) {
      const refreshToken = localStorage.getItem('refreshToken');
      const result = await mockAuthService.refreshToken(refreshToken);
      if (result.success) {
        localStorage.setItem('token', result.data.accessToken);
      }
      return result;
    }

    // Real API call
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axios.post(`${API_URL}/auth/refresh`, {
        refreshToken
      });
      if (response.data.success) {
        localStorage.setItem('token', response.data.data.accessToken);
      }
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: 'Token refresh failed'
      };
    }
  }
};

export default authService;

