import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Testimonials from './pages/Testimonial';
import StudentLogin from './pages/StudentLogin';
import BusinessLogin from "./pages/BLogin";
import "./css/App.css";
import Businessregister from "./pages/CompanyRegister";
import StudentRegistration from './pages/StudentRegister';
import Dashboard from "./pages/studentDashboard";
import { useUserDetails } from './contexts/UserContext';

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUserDetails } = useUserDetails();
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
          {},
          { withCredentials: true }
        );

        if (response.status === 200) {
          setUserDetails(response.data.student);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Authentication failed:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    authenticate();
  }, [setIsAuthenticated, setUserDetails]);

  if (isLoading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/testimonial" element={<Testimonials />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/studentregister" element={<StudentRegistration />} />
        <Route path="/businesslogin" element={<BusinessLogin />} />
        <Route path="/businessregister" element={<Businessregister />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard />
            ) : (
              <Navigate to="/studentlogin" />
            )
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
