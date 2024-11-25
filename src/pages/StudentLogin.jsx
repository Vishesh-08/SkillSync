import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Using react-icons for eye icons
import '../css/Login.css'; // Assuming you have a CSS file for styling
import axios from 'axios';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const response = await axios.post("http://localhost:5000/api/students/login", {
          email,
          password,
        },{
          withCredentials: true,
        });

        if (response.status === 200) {
          console.log(response.data);
          alert("Login successful");
        } else {
          alert("Something went wrong!");
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
          <button type="submit">Login</button>
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
