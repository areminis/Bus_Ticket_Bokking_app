import React from 'react';
import { Navigate } from 'react-router-dom';
import { normalizeRole } from '../utils/auth';

const PrivateRoute = ({ user, role, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (normalizeRole(user.role) !== normalizeRole(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
