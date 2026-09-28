import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/CustomerNavbar.css';

const CustomerNavbar = ({ user, onLogout }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname.includes(path);

  return (
    <nav className="customer-navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>🚌 BusTicket Pro</h2>
        </div>

        <ul className="navbar-menu">
          <li>
            <Link 
              to="/customer/search" 
              className={`nav-link ${isActive('/search') ? 'active' : ''}`}
            >
              🔍 Search Buses
            </Link>
          </li>
          <li>
            <Link 
              to="/customer/bookings" 
              className={`nav-link ${isActive('/bookings') ? 'active' : ''}`}
            >
              🎟️ My Bookings
            </Link>
          </li>
        </ul>

        <div className="navbar-right">
          <span className="user-badge">{user?.name || 'Customer'}</span>
          <button className="btn-logout" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default CustomerNavbar;