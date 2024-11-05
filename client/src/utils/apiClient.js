import toast from 'react-hot-toast';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch(`/api${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.message || 'Something went wrong', response.status);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 401) {
        // Handle unauthorized access
        window.location.href = '/login';
      }
      toast.error(error.message);
    } else {
      toast.error('Network error. Please try again.');
    }
    throw error;
  }
} 