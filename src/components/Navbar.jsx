// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
// import './Navbar.css';  // Uncomment if you have a CSS file for styling
// <a href="/job-detail" className="dropdown-item">Job Detail</a>

const Navbar = () => {
    return (
        <header>
            {/* Main Navigation */}
            <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
                <a href="/" className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5">
                    <h1 className="m-0 text-primary">SkillSync</h1>
                </a>
                <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto p-4 p-lg-0">
                        <NavLink to="/" exact activeClassName="active" className="nav-item nav-link">
                            Home
                        </NavLink>
                        <NavLink to="/about" activeClassName="active" className="nav-item nav-link">
                            About
                        </NavLink>
                        <div className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Jobs</a>
                            <div className="dropdown-menu rounded-0 m-0">
                            <NavLink to="/jobs" activeClassName="active" className="nav-item nav-link">
                            Contact
                        </NavLink>
                               
                            </div>
                        </div>
                        <div className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                            <div className="dropdown-menu rounded-0 m-0">
                                <a href="/category" className="dropdown-item">Job Category</a>
                                <a href="/testimonial" className="dropdown-item">Testimonial</a>
                                <a href="/404" className="dropdown-item">404</a>
                            </div>
                        </div>
                        <NavLink to="/contact" activeClassName="active" className="nav-item nav-link">
                            Contact
                        </NavLink>
                    </div>
                    <a href="/post-job" className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">
                        Post A Job <i className="fa fa-arrow-right ms-3"></i>
                    </a>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
