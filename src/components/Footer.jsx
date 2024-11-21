// src/components/Footer.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
            <div className="container py-5">
                <div className="row g-5">
                    <div className="col-lg-3 col-md-6">
                        <h5 className="text-white mb-4">Company</h5>
                        <NavLink className="btn btn-link text-white-50" to="/about">About Us</NavLink>
                        <NavLink className="btn btn-link text-white-50" to="/contact">Contact Us</NavLink>
                        <NavLink className="btn btn-link text-white-50" to="/services">Our Services</NavLink>
                        <NavLink className="btn btn-link text-white-50" to="/privacy-policy">Privacy Policy</NavLink>
                        <NavLink className="btn btn-link text-white-50" to="/terms">Terms & Condition</NavLink>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h5 className="text-white mb-4">Quick Links</h5>
                        <NavLink className="btn btn-link text-white-50" to="/about">About Us</NavLink>
                        <NavLink className="btn btn-link text-white-50" to="/contact">Contact Us</NavLink>
                        <NavLink className="btn btn-link text-white-50" to="/services">Our Services</NavLink>
                        <NavLink className="btn btn-link text-white-50" to="/privacy-policy">Privacy Policy</NavLink>
                        <NavLink className="btn btn-link text-white-50" to="/terms">Terms & Condition</NavLink>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h5 className="text-white mb-4">Contact</h5>
                        <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>Location, City, Country</p>
                        <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                        <p className="mb-2"><i className="fa fa-envelope me-3"></i>info@example.com</p>
                        <div className="d-flex pt-2">
                            <a className="btn btn-outline-light btn-social" href="https://twitter.com"><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-outline-light btn-social" href="https://facebook.com"><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-outline-light btn-social" href="https://youtube.com"><i className="fab fa-youtube"></i></a>
                            <a className="btn btn-outline-light btn-social" href="https://linkedin.com"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h5 className="text-white mb-4">Newsletter</h5>
                        <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                        <div className="position-relative mx-auto" style={{ maxWidth: '400px' }}>
                            <input className="form-control bg-transparent w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email" />
                            <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="copyright">
                    <div className="row">
                        <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                            &copy; <a className="border-bottom" href="https://freewebsitecode.com">Your Site Name</a>, All Right Reserved. 
                            Designed By <a className="border-bottom" href="https://freewebsitecode.com">Free Website Code</a>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <div className="footer-menu">
                                <NavLink to="/">Home</NavLink>
                                <NavLink to="/cookies">Cookies</NavLink>
                                <NavLink to="/help">Help</NavLink>
                                <NavLink to="/faqs">FAQs</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
