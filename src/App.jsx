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
const ProtectedRoute = ({ element, isAuthenticated, redirectTo }) => {
    return isAuthenticated ? element : <Navigate to={redirectTo} replace />;
};

const App = () => {
    const { setUserDetails, isAuthenticated, setIsAuthenticated ,userType,setUserType} = useUserDetails();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null); // State for managing error messages

    useEffect(() => {
        const authenticate = async () => {
            const token = Cookies.get('authToken');
            if (!token) {
                setIsAuthenticated(false);
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_SERVER_URL || 'http://localhost:5000'}/auth`,
                    {userType},
                    { withCredentials: true }
                );

                if (response.status === 200) {
                    setUserDetails(response.data.user);
                    setIsAuthenticated(true);
                    setUserType(response.data.user.userType)
                } else {
                    setIsAuthenticated(false);
                    setUserType("");
                }
            } catch (error) {
                console.error("Authentication failed:", error);
                setError("Authentication failed. Please try again.");
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        authenticate();
    }, [setUserDetails, setIsAuthenticated,isAuthenticated]);

    

    return (
        <Router>
            <Navbar />
            {error && <div className="error-message">{error}</div>} {/* Show error if any */}
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
                        <ProtectedRoute
                            element={<Dashboard />}
                            isAuthenticated={isAuthenticated}
                            redirectTo="/studentlogin"
                        />
                    }
                />
                <Route
                    path="/businessdashboard"
                    element={
                        <ProtectedRoute
                            element={<BusinessDashboard />}
                            isAuthenticated={isAuthenticated}
                            redirectTo="/businesslogin"
                        />
                    }
                />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
