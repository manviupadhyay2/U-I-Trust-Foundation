import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Redirector = () => {
  const { role } = useSelector((state) => state.user.user);

  switch (role) {
    // case 'Admin':
    //   return <Navigate to="/admin" />;
    case 'student':
      return <Navigate to="/students" />;
    case 'mentor':
      return <Navigate to="/volunteer" />;
    case 'lch':
      return <Navigate to="/leader-chapter" />;
    case 'lcl':
      return <Navigate to="/leader" />;
    case 'fellow':
      return <Navigate to="/manager" />;
    default:
      return <Navigate to="/" />;
  }
};

export default Redirector;
