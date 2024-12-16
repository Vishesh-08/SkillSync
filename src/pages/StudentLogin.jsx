import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../css/Login.css'; // Assuming you have a CSS file for styling
import axios from 'axios';
import { useUserDetails } from '../contexts/UserContext';
import Cookies from 'js-cookie';

const server = import.meta.env.VITE_SERVER_URL;

const StudentLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUserDetails, setIsAuthenticated, isAuthenticated,setUserType } = useUserDetails();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      setLoading(true);
      try {
        const response = await axios.post(
          `${server || 'http://localhost:5000'}/api/students/login`,
          { email, password },
          { withCredentials: true }
        );

        if (response.status === 200) {
          alert('Login successful');
          Cookies.set('authToken', response.data.token, { expires: 7 });
          setUserDetails(response.data.user);
          setIsAuthenticated(true); // Update the authentication status in context
          setUserType("student");
          setEmail('');
          setPassword('');
        }
      } catch (error) {
        console.error('Error during login:', error.message || error.response?.data);
        alert(error.response?.data?.error || 'An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Both fields are required');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/job-search');
    }
  }, [isAuthenticated, navigate]); // Redirect after authentication is set

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="centered-form">
      <div className="login-container">
        <h2>Student Login</h2>
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <div className="d-flex align-items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={togglePasswordVisibility}
                style={{ cursor: 'pointer', marginLeft: '8px' }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="button-group">
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          <NavLink to="/studentregister" className="register-link">
            Not registered? Sign up here
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
