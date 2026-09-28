import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import AdminRequests from '../components/admin/AdminRequests';
import AllBookings from '../components/admin/AllBookings';
import '../styles/Dashboard.css';

const AdminDashboard = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="dashboard-wrapper">
      <AdminNavbar user={user} onLogout={handleLogout} />
      <div className="dashboard-container">
        <Routes>
          <Route path="/requests" element={<AdminRequests />} />
          <Route path="/bookings" element={<AllBookings />} />
          <Route path="/" element={<AdminRequests />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;