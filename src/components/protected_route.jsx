import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      setIsAuthenticated(true);  // If token is found, user is authenticated
    }
    setLoading(false);  // Set loading to false after the check
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // You can replace this with a spinner or loader
  }

  return isAuthenticated ? children : <Navigate to="/studentlogin" />;  // Redirect to login if not authenticated
};

export default ProtectedRoute;
