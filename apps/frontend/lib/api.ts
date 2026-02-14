import axios from 'axios';
import type { LoginRequest, RegisterRequest, RoutesResponse, RouteResponse } from '@/types';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export const authApi = {
  login: (data: LoginRequest) => apiClient.post('/login', data),
  register: (data: RegisterRequest) => apiClient.post('/registration', data),
};

export const routesApi = {
  getAll: () => apiClient.get<RoutesResponse>('/routes'),
  getBySlug: (slug: string) => apiClient.get<RouteResponse>(`/routes/${slug}`),
};

export default apiClient;
