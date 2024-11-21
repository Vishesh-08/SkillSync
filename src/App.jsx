// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
//import Register from './pages/Register';<Route path="/" element={<Register />} />
import About from './pages/About';
import Contact from './pages/Contact';
import JobList from './pages/Job-list';
import Testimonials from './pages/Testimonial';
import StudentLogin from './pages/StudentLogin'
import BusinessLogin from "./pages/BLogin"
import "./css/App.css"
import Businessregister from "./pages/CompanyRegister"
import StudentRegistration from './pages/StudentRegister';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/testimonial" element={<Testimonials/>}/>
            <Route path="/studentlogin" element={<StudentLogin/>}/>
            <Route path="/studentregister" element={<StudentRegistration/>}/>
            <Route path="/businesslogin" element={<BusinessLogin/>}/>
            <Route path="/businessregister" element={<Businessregister/>}/>
            
                
                
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
