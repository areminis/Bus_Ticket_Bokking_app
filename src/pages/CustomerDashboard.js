import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import CustomerNavbar from '../components/CustomerNavbar';
import SearchBuses from '../components/customer/SearchBuses';
import MyBookings from '../components/customer/MyBookings';
import '../styles/Dashboard.css';

const CustomerDashboard = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="dashboard-wrapper">
      <CustomerNavbar user={user} onLogout={handleLogout} />
      <div className="dashboard-container">
        <Routes>
          <Route path="/search" element={<SearchBuses />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/" element={<SearchBuses />} />
        </Routes>
      </div>
    </div>
  );
};

export default CustomerDashboard;