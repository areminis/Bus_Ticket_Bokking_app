import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/BusOwnerNavbar.css';

const BusOwnerNavbar = ({ user, onLogout }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname.includes(path);

  return (
    <nav className="busowner-navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>Bus Owner Panel</h2>
        </div>

        <ul className="navbar-menu">
          <li>
            <Link
              to="/busowner/register"
              className={`nav-link ${isActive('/register') ? 'active' : ''}`}
            >
              Register Bus
            </Link>
          </li>
          <li>
            <Link
              to="/busowner/routes"
              className={`nav-link ${isActive('/routes') ? 'active' : ''}`}
            >
              Add Route
            </Link>
          </li>
          <li>
            <Link
              to="/busowner/schedules"
              className={`nav-link ${isActive('/schedules') ? 'active' : ''}`}
            >
              Add Schedule
            </Link>
          </li>
          <li>
            <Link
              to="/busowner/manage"
              className={`nav-link ${isActive('/manage') ? 'active' : ''}`}
            >
              Manage Buses
            </Link>
          </li>
        </ul>

        <div className="navbar-right">
          <span className="user-badge">{user?.name || 'Bus Owner'}</span>
          <button className="btn-logout" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default BusOwnerNavbar;
