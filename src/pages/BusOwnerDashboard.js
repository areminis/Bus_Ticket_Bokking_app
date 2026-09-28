import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import BusOwnerNavbar from '../components/BusOwnerNavbar';
import RegisterBus from '../components/busowner/RegisterBus';
import ManageBuses from '../components/busowner/ManageBuses';
import AddRoute from '../components/busowner/AddRoute';
import AddSchedule from '../components/busowner/AddSchedule';
import '../styles/Dashboard.css';

const BusOwnerDashboard = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="dashboard-wrapper">
      <BusOwnerNavbar user={user} onLogout={handleLogout} />
      <div className="dashboard-container">
        <Routes>
          <Route path="/register" element={<RegisterBus />} />
          <Route path="/routes" element={<AddRoute />} />
          <Route path="/schedules" element={<AddSchedule />} />
          <Route path="/manage" element={<ManageBuses />} />
          <Route path="/" element={<ManageBuses />} />
        </Routes>
      </div>
    </div>
  );
};

export default BusOwnerDashboard;
