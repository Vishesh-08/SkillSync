import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { error } from 'jquery';

const CompanyRegistration = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        companyName: '',
        companyLogo: null,
        companyType: '',
        foundedYear: '',
        numberOfEmployees: '',
        contactPerson: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
        website: '',
        registrationNumber: '',
        verificationDocuments: null,
        socialMediaLinks: '',
        gdprConsent: false
    });

    const handleChange = (e) => {
        const { name, value, type, files, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }

        const formDataToSubmit = new FormData();

        // Append regular fields
        Object.keys(formData).forEach((key) => {
            if (key !== "companyLogo" && key !== "verificationDocuments") {
                formDataToSubmit.append(key, formData[key]);
            }
        });

        // Append files
        if (formData.companyLogo) {
            formDataToSubmit.append("companyLogo", formData.companyLogo);
        }
        if (formData.verificationDocuments) {
            formDataToSubmit.append("verificationDocuments", formData.verificationDocuments);
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL||"http://localhost:5000"}/api/companies/register`, formDataToSubmit, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if(response.status==201){
                alert("registration successfull ")
                navigate("/businesslogin")
            }
            else{
                throw error("failed to register");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("Error during registration. Please try again.");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="registration-form">
            <h2>Company Registration</h2>
            <form onSubmit={handleSubmit}>
                {/* Basic Company Details */}
                <div className="form-section-title">Basic Company Details</div>
                <div className="form-group">
                    <label htmlFor="companyName">Company Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="companyName"
                        name="companyName"
                        placeholder="Enter company name"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="companyLogo">Company Logo</label>
                    <input
                        type="file"
                        className="form-control-file"
                        id="companyLogo"
                        name="companyLogo"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="companyType">Company Type</label>
                    <select
                        className="form-control"
                        id="companyType"
                        name="companyType"
                        value={formData.companyType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Industry</option>
                        <option>IT</option>
                        <option>Healthcare</option>
                        <option>Education</option>
                        <option>Finance</option>
                        <option>Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="foundedYear">Founded Year</label>
                    <input
                        type="number"
                        className="form-control"
                        id="foundedYear"
                        name="foundedYear"
                        placeholder="Enter year"
                        value={formData.foundedYear}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="numberOfEmployees">Number of Employees</label>
                    <select
                        className="form-control"
                        id="numberOfEmployees"
                        name="numberOfEmployees"
                        value={formData.numberOfEmployees}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select size</option>
                        <option>1-10</option>
                        <option>11-50</option>
                        <option>51-200</option>
                        <option>201-500</option>
                        <option>500+</option>
                    </select>
                </div>

                {/* Contact Information */}
                <div className="form-section-title">Contact Information</div>
                <div className="form-group">
                    <label htmlFor="contactPerson">Contact Person Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="contactPerson"
                        name="contactPerson"
                        placeholder="Enter name"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Password and Confirm Password */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <div className="d-flex align-items-center">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
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
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                    <div className="d-flex align-items-center">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Enter your password"
                            className="form-control"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <span
                            onClick={toggleConfirmPasswordVisibility}
                            style={{ cursor: 'pointer', marginLeft: '8px' }}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>

                {/* Other Inputs */}
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Company Address</label>
                    <textarea
                        className="form-control"
                        id="address"
                        name="address"
                        rows="3"
                        placeholder="Enter address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="website">Company Website</label>
                    <input
                        type="url"
                        className="form-control"
                        id="website"
                        name="website"
                        placeholder="Enter website URL"
                        value={formData.website}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Legal Information and Verification */}
                <div className="form-section-title">Legal Information and Verification</div>
                <div className="form-group">
                    <label htmlFor="registrationNumber">Company Registration Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="registrationNumber"
                        name="registrationNumber"
                        placeholder="Enter registration number"
                        value={formData.registrationNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="verificationDocuments">Verification Documents</label>
                    <input
                        type="file"
                        className="form-control-file"
                        id="verificationDocuments"
                        name="verificationDocuments"
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Social Media Links */}
                <div className="form-group">
                    <label htmlFor="socialMediaLinks">Social Media Links</label>
                    <input
                        type="text"
                        className="form-control"
                        id="socialMediaLinks"
                        name="socialMediaLinks"
                        placeholder="Enter social media links"
                        value={formData.socialMediaLinks}
                        onChange={handleChange}
                    />
                </div>

                {/* GDPR Consent */}
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="gdprConsent"
                        name="gdprConsent"
                        checked={formData.gdprConsent}
                        onChange={handleChange}
                        required
                    />
                    <label className="form-check-label" htmlFor="gdprConsent">
                        I agree to the GDPR Terms and Conditions.
                    </label>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary mt-3">Register</button>
            </form>
        </div>
    );
};

export default CompanyRegistration;
