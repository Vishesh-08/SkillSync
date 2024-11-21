// src/components/Contact.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Contact = () => {
    return (
        <div className="container-xxl py-5">
            <div className="container">
                <h1 className="text-center mb-5">Contact For Any Query</h1>
                <div className="row g-4">
                    <div className="col-12">
                        <div className="row gy-4">
                            <div className="col-md-4">
                                <div className="d-flex align-items-center bg-light rounded p-4">
                                    <div className="bg-white border rounded d-flex flex-shrink-0 align-items-center justify-content-center me-3" style={{ width: "45px", height: "45px" }}>
                                        <i className="fa fa-map-marker-alt text-primary"></i>
                                    </div>
                                    <span>Location, City, Country</span>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="d-flex align-items-center bg-light rounded p-4">
                                    <div className="bg-white border rounded d-flex flex-shrink-0 align-items-center justify-content-center me-3" style={{ width: "45px", height: "45px" }}>
                                        <i className="fa fa-envelope-open text-primary"></i>
                                    </div>
                                    <span>info@example.com</span>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="d-flex align-items-center bg-light rounded p-4">
                                    <div className="bg-white border rounded d-flex flex-shrink-0 align-items-center justify-content-center me-3" style={{ width: "45px", height: "45px" }}>
                                        <i className="fa fa-phone-alt text-primary"></i>
                                    </div>
                                    <span>+012 345 6789</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <iframe
                            className="position-relative rounded w-100 h-100"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14348.768509978587!2d80.33187375!3d26.44989595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c476d24ea3f21%3A0x5cf3ba77b5d1a5d!2sKanpur%2C%20Uttar%20Pradesh%2C%20India!5e0!3m2!1sen!2sin!4v1698678162947!5m2!1sen!2sin"
                            frameBorder="0"
                            style={{ minHeight: "400px", border: "0" }}
                            allowFullScreen
                            aria-hidden="false"
                            tabIndex="0"
                            title="Google Map"
                        ></iframe>
                    </div>
                    <div className="col-md-6">
                        <div>
                            <p className="mb-4">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius veritatis a nobis praesentium saepe aliquid dolorem, itaque natus minus obcaecati. <NavLink to="/download">Download Now</NavLink>.
                            </p>
                            <form>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="name" placeholder="Your Name" />
                                            <label htmlFor="name">Your Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="email" className="form-control" id="email" placeholder="Your Email" />
                                            <label htmlFor="email">Your Email</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="subject" placeholder="Subject" />
                                            <label htmlFor="subject">Subject</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea className="form-control" placeholder="Leave a message here" id="message" style={{ height: "150px" }}></textarea>
                                            <label htmlFor="message">Message</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-primary w-100 py-3" type="submit">Send Message</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
