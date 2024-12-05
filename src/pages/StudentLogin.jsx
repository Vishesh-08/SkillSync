import React, { useState ,useContext} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../css/Login.css'; // Assuming you have a CSS file for styling
import axios from 'axios';
import {useUserDetails} from '../contexts/UserContext';

const StudentLogin = () => {
  const navigate = useNavigate(); // Correct placement of useNavigate
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state to prevent multiple submissions
  const { userDetails, updateUserDetail,setUserDetails } = useUserDetails();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      setLoading(true); // Start loading
      try {
        const response = await axios.post(
          'http://localhost:5000/api/students/login',
          { email, password },
          { withCredentials: true } // Ensure cookies are sent with the request
        );

        // Handle successful login
        if (response.status === 200) {
          alert('Login successful');
          console.log(response.data.student);
          setUserDetails(response.data.student);

          navigate(response.data.redirect || '/dashboard'); // Redirect based on the server response
        }
      } catch (error) {
        console.error('Error during login:',error.message|| error.response?.data  );
        alert(error.response?.data?.error || 'An error occurred. Please try again.');
      } finally {
        setLoading(false); // Stop loading
      }
    } else {
      alert("Both fields are required");
    }
  };

  // Toggle password visibility
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
