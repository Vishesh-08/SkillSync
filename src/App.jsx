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
import BusinessLogin from './pages/BLogin';
import './css/App.css';
import BusinessRegister from './pages/CompanyRegister';
import StudentRegister from './pages/StudentRegister';
import Dashboard from './pages/StudentDashboard';
import BusinessDashboard from './pages/CompanyDashboard';
import { useUserDetails } from './contexts/UserContext';

// Protected Route Component
const ProtectedRoute = ({ children, isAuthenticated, redirectTo }) => {
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

const App = () => {
    const { setUserDetails, isAuthenticated, setIsAuthenticated, userType, setUserType,userDetails } = useUserDetails();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const authenticate = async () => {
            const token = Cookies.get('authToken');
            if (!token && ! userDetails) {
                setIsAuthenticated(false);
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_SERVER_URL || 'http://localhost:5000'}/auth`,
                    { userType },
                    { withCredentials: true }
                );

                if (response.status === 200) {
                    setUserDetails(response.data.user);
                    setIsAuthenticated(true);
                    setUserType(response.data.user.userType);
                } else {
                    setIsAuthenticated(false);
                    setUserType('');
                }
            } catch (error) {
                console.error('Authentication failed:', error);
                setError('Authentication failed. Please try again.');
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        authenticate();
    }, [setUserDetails, setUserType, setIsAuthenticated, userType]);

    if (isLoading) {
        return <div>Loading...</div>;
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
                <Route path="/studentregister" element={<StudentRegister />} />
                <Route path="/businesslogin" element={<BusinessLogin />} />
                <Route path="/businessregister" element={<BusinessRegister />} />

                {/* Protected Routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} redirectTo="/studentlogin">
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/businessdashboard"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} redirectTo="/businesslogin">
                            <BusinessDashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
