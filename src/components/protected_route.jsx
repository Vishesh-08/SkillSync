import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useUserDetails } from "./";
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const { setUserDetails } = useUserDetails();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      const token = Cookies.get("authToken");

      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          'http://localhost:5000/api/students/auth',
          {}, // Payload depends on your backend
          { withCredentials: true }
        );

        if (response.status === 200) {
          setUserDetails(response.data.student);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    authenticate();
  }, [setUserDetails]);

  if (isLoading) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/studentlogin" />;
};

export default ProtectedRoute;
