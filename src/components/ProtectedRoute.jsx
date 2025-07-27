import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = sessionStorage.getItem('email');
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;