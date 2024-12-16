import React, { useState,useEffect } from 'react';
import { NavLink ,useNavigate} from 'react-router-dom'; // Import NavLink
import '../css/Login.css'; // Assuming you have a CSS file for styling
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // For eye icons (using react-icons)
import "../godfather_css/style.css";
import axios from 'axios';
import { useUserDetails } from '../contexts/UserContext'
import Cookies from 'js-cookie';
const BusinessLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {isAuthenticated,setIsAuthenticated,setUserDetails,setUserType}=useUserDetails();
  const navigate=useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const response = await axios.post("http://localhost:5000/api/companies/login", {
          email,
          password,
        },{withCredentials:true});

        if (response.status == 200) {
          alert("Login successful");
          setIsAuthenticated(true);
          Cookies.set('authToken', response.data.token, { expires: 7 });
          setUserDetails(response.data.user);
          setUserType("company")
          

        } else {
          alert("Something went wrong!");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error during login:", error.response?.data || error.message);
        alert(error.response?.data?.error || "An error occurred. Please try again.");
      }
    } else {
      alert('Please fill out both fields.');
    }
  };

  // Toggle password visibility
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/candidate-search',{replace:true});
    }
  }, [isAuthenticated, navigate]);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="centered-form">
    <div className="login-container">
      <h2>Business Login</h2>
      <form id="loginForm" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Business Email:</label>
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
          <button type="submit">Login</button>
        </div>
        <NavLink to="/businessregister" className="register-link">
          Not registered? Sign up here
        </NavLink>
      </form>
    </div>
    </div>
  );
};

export default BusinessLogin;
