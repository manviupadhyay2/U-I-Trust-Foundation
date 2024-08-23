import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, role } = useSelector((state) => state.user.user);

  console.log(isAuthenticated, requiredRole);
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/redirect" />;
  }

  return children;
};

export default ProtectedRoute;
