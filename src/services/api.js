import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Add this for CORS
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      if (userData.token) {
        config.headers.Authorization = `Bearer ${userData.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for debugging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (userData) => api.post('/api/auth/register', userData),
  logout: () => api.post('/api/auth/logout'),
};

export const busAPI = {
  getAllBuses: () => api.get('/api/buses'),
  getBusById: (id) => api.get(`/api/buses/${id}`),
  createBus: (busData) => api.post('/api/buses', busData),
  updateBus: (id, busData) => api.put(`/api/buses/${id}`, busData),
  deleteBus: (id) => api.delete(`/api/buses/${id}`),
  searchBuses: (source, destination, date) => 
    api.get(`/api/buses/search?source=${source}&destination=${destination}&date=${date}`),
};

export const bookingAPI = {
  getAllBookings: () => api.get('/api/bookings'),
  getBookingById: (id) => api.get(`/api/bookings/${id}`),
  createBooking: (bookingData) => api.post('/api/bookings', bookingData),
  updateBooking: (id, bookingData) => api.put(`/api/bookings/${id}`, bookingData),
  deleteBooking: (id) => api.delete(`/api/bookings/${id}`),
  getCustomerBookings: () => api.get('/api/bookings/customer/my-bookings'),
};

export const adminAPI = {
  getRequests: () => api.get('/api/admin/requests'),
  approveRequest: (id) => api.put(`/api/admin/requests/${id}/approve`),
  rejectRequest: (id) => api.put(`/api/admin/requests/${id}/reject`),
  getAllBookings: () => api.get('/api/admin/bookings'),
};

export const busownerAPI = {
  registerBus: (busData) => api.post('/api/busowner/buses', busData),
  getMyBuses: () => api.get('/api/busowner/buses'),
  updateBus: (id, busData) => api.put(`/api/busowner/buses/${id}`, busData),
  deleteBus: (id) => api.delete(`/api/busowner/buses/${id}`),
};

export default api;
