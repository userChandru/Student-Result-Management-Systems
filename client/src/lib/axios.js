import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for development
api.interceptors.response.use(
  response => response,
  error => {
    // If API is not available, return mock data
    if (!error.response) {
      if (error.config.url.includes('/auth/login')) {
        return Promise.resolve({
          data: {
            token: 'mock_token_for_development',
            user: {
              id: 1,
              name: 'Test User',
              role: 'student'
            }
          }
        });
      }
    }
    return Promise.reject(error);
  }
);

export default api; 