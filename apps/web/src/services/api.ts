import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create a typed API client
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to unwrap the API response format
apiClient.interceptors.response.use(
  (response) => {
    // Handle standard API response format: { success: true, data: {...}, message: "..." }
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return response.data.data as any;
    }
    return response.data as any;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);

// Create a typed API wrapper
export const api = {
  get: <T = any>(url: string, config?: any): Promise<T> => apiClient.get(url, config),
  post: <T = any>(url: string, data?: any, config?: any): Promise<T> => apiClient.post(url, data, config),
  put: <T = any>(url: string, data?: any, config?: any): Promise<T> => apiClient.put(url, data, config),
  patch: <T = any>(url: string, data?: any, config?: any): Promise<T> => apiClient.patch(url, data, config),
  delete: <T = any>(url: string, config?: any): Promise<T> => apiClient.delete(url, config),
};
