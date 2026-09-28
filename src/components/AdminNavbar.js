import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/AdminNavbar.css';

const AdminNavbar = ({ user, onLogout }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname.includes(path);

  return (
    <nav className="admin-navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>🚌 Admin Panel</h2>
        </div>

        <ul className="navbar-menu">
          <li>
            <Link 
              to="/admin/requests" 
              className={`nav-link ${isActive('/requests') ? 'active' : ''}`}
            >
              📋 Requests
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/bookings" 
              className={`nav-link ${isActive('/bookings') ? 'active' : ''}`}
            >
              📑 All Bookings
            </Link>
          </li>
        </ul>

        <div className="navbar-right">
          <span className="user-badge">{user?.name || 'Admin'}</span>
          <button className="btn-logout" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;