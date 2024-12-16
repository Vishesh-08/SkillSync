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
import SkillsForm from './pages/SkillsForm';
import { useUserDetails } from './contexts/UserContext';
const userAuth={
    "student":["/dashboard","/job-search"],
    "company":["/businessdashboard","/candidate-search"]
}

// Protected Route Component
const ProtectedRoute = ({ children, isAuthenticated, redirectTo, path, userType }) => {
    // Check if the user is authenticated
    if (!isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    // Check if the user is authorized for the route
    const allowedPaths = userAuth[userType] || [];
    if (!allowedPaths.includes(path)) {
        return <div>You are not authorized to access this page.</div>; // Graceful message instead of alert
    }

    // Render the children if all checks pass
    return children;
};

const App = () => {
    const { setUserDetails, isAuthenticated, setIsAuthenticated, userType, setUserType, userDetails } = useUserDetails();
    const [isLoading, setIsLoading] = useState(true);

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
                    {}, // Removed `userType` from the body
                    { withCredentials: true }
                );

                if (response.status === 200) {
                    setUserDetails(response.data.user);
                    setIsAuthenticated(true);
                    setUserType(response.data.user.userType); // Set userType from server response
                } else {
                    setIsAuthenticated(false);
                    setUserType('');
                }
            } catch (error) {
                console.error('Authentication failed:', error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        authenticate();
    }, [setUserDetails, setUserType, setIsAuthenticated]);

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
                    path="/job-search"
                    element={
                        <ProtectedRoute
                            isAuthenticated={isAuthenticated}
                            redirectTo="/studentlogin"
                            path="/job-search"
                            userType={userType}
                        > <Dashboard />
                            
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/candidate-search"
                    element={
                        <ProtectedRoute
                            isAuthenticated={isAuthenticated}
                            redirectTo="/businesslogin"
                            path="/candidate-search"
                            userType={userType}
                        ><SkillsForm />
                           
                        </ProtectedRoute>
                    }
                />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;


