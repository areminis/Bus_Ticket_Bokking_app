import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import BusOwnerDashboard from './pages/BusOwnerDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import PrivateRoute from './components/PrivateRoute';
import { normalizeRole, roleToPath } from './utils/auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({ ...parsedUser, role: normalizeRole(parsedUser.role) });
    }
    setLoading(false);
  }, []);

  if (loading) return <div className="loading-app">Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/admin/*"
          element={
            <PrivateRoute user={user} role="Admin">
              <AdminDashboard user={user} setUser={setUser} />
            </PrivateRoute>
          }
        />
        <Route
          path="/busowner/*"
          element={
            <PrivateRoute user={user} role="BusOwner">
              <BusOwnerDashboard user={user} setUser={setUser} />
            </PrivateRoute>
          }
        />
        <Route
          path="/customer/*"
          element={
            <PrivateRoute user={user} role="Customer">
              <CustomerDashboard user={user} setUser={setUser} />
            </PrivateRoute>
          }
        />
        <Route path="/" element={user ? <Navigate to={`/${roleToPath(user.role)}`} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
