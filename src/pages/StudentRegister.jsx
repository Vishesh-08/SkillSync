import React, { useState,useEffect } from 'react';
import "../css/StudentRegister.css"
import "../godfather_css/style.css";
import { cities } from './cities';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentRegistration = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password:'',
    confirmPassword:'',
    phone: '',
    dob: '',
    location: '',
    university: '',
    degree: '',
    yearOfStudy: '',
    gradDate: '',
    gpa: '',
    certifications: '',
    resume: null,
    portfolio: '',
    jobType: 'Full-Time',
    relocate: 'YES',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  

  const handleFileChange = (e) => {
    const { files } = e.target;
    const file = files[0];
  
    if (file && !["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type)) {
      alert("Invalid file type. Please upload a PDF or DOCX.");
      return;
    }
  
    if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
      alert("File size exceeds 5MB.");
      return;
    }
    console.log("resume is selected");
  
    setFormData({ ...formData, resume: file });
  };

  //skills script
  

  const handleDropdownToggle = (event) => {
    event.stopPropagation();
    setIsDropdownVisible(!isDropdownVisible);
  };
  

  const handleSkillSelect = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSkillRemove = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.skills-container')) {
        setIsDropdownVisible(false);
      }
    };
  
    document.addEventListener('click', handleOutsideClick);
  
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate password length
    if (formData.password.length <= 6) {
      alert("Password must be greater than 6 characters.");
      return;
    }
  
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
  
    // Create a FormData object
    const submissionData = new FormData();
  
    // Append text fields to FormData
    submissionData.append("fullName", formData.fullName);
    submissionData.append("email", formData.email);
    submissionData.append("password",formData.password);
    submissionData.append("phone", formData.phone);
    submissionData.append("dob", formData.dob);
    submissionData.append("location", formData.location);
    submissionData.append("university", formData.university);
    submissionData.append("degree", formData.degree);
    submissionData.append("yearOfStudy", formData.yearOfStudy);
    submissionData.append("gradDate", formData.gradDate);
    submissionData.append("gpa", formData.gpa);
    submissionData.append("jobType", formData.jobType);
    submissionData.append("relocate", formData.relocate);
     // Append password
  
    submissionData.append("skills", JSON.stringify(selectedSkills));
  
    if (formData.resume) {
      submissionData.append("resume", formData.resume);
    }
    
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL||"http://localhost:5000"}/api/students/register`, submissionData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if(response.status==201){
        alert("registration successfull ")
        navigate("/studentlogin")
    }
    else{
        throw error("failed to register");
    }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      alert("Error: " + (error.response?.data?.message));
    }
  };

  return (
    <div className="registration-form" >
      <h1 className="mb-4 text-center">Student Registration</h1>
      <form onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <fieldset className="border p-3 mb-4">
          <legend className="w-auto">Personal Information</legend>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              Full Name:
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="form-control"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="e.g., example@domain.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
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
          <label htmlFor="Confirm password" className="form-label">Confirm Password:</label>
          <div className="d-flex align-items-center">
            <input
              type={showPassword ? 'text' : 'password'}
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
        
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-control"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]*"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dob" className="form-label">
              Date of Birth:
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              className="form-control"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location:
            </label>
            <select
              id="location"
              name="location"
              className="form-select"
              value={formData.location}
              onChange={handleChange}
              required
            >
              
              
              {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}

            </select>
          </div>
        </fieldset>

        {/* Academic Information Section */}
        <fieldset className="border p-3 mb-4">
          <legend className="w-auto">Academic Information</legend>
          <div className="mb-3">
            <label htmlFor="university" className="form-label">
              University/College Name:
            </label>
            <input
              type="text"
              id="university"
              name="university"
              className="form-control"
              placeholder="Enter your university or college name"
              value={formData.university}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="degree" className="form-label">
              Degree Program:
            </label>
            <input
              type="text"
              id="degree"
              name="degree"
              className="form-control"
              placeholder="Enter your degree program"
              value={formData.degree}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="yearOfStudy" className="form-label">
              Year of Study:
            </label>
            <select
              id="yearOfStudy"
              name="yearOfStudy"
              className="form-select"
              value={formData.yearOfStudy}
              onChange={handleChange}
              required
            >
              <option value="Freshman">Freshman</option>
              <option value="Sophomore">Sophomore</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="gradDate" className="form-label">
              Expected Graduation Date:
            </label>
            <input
              type="date"
              id="gradDate"
              name="gradDate"
              className="form-control"
              value={formData.gradDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gpa" className="form-label">
              CGPA:
            </label>
            <input
              type="number"
              id="gpa"
              name="gpa"
              className="form-control"
              placeholder="Enter your CGPA"
              value={formData.gpa}
              onChange={handleChange}
              min="0"  // Minimum value allowed
              max="10" // Maximum value allowed
              step="0.1" // Allow up to two decimal points (if needed)
              required
            />
          </div>
        </fieldset>

        {/* Skills & Interests Section */}
        <fieldset className="border p-3 mb-4">
  <legend className="w-auto">Skills & Interests</legend>
  <div>
    <label htmlFor="skills">Skills:</label>
    <div className="skills-container" onClick={handleDropdownToggle}>
      <div className="select-box">
        {/* Placeholder hidden when there are selected skills */}
        <span className="placeholder" style={{ display: selectedSkills.length ? 'none' : 'block' }}>
          Select skills...
        </span>
        {/* Render selected skills as bubbles */}
        <div className="selected-skills">
          {selectedSkills.map((skill, index) => (
            <div key={index} className="skill-bubble">
              {skill}
              <span className="remove-btn" onClick={() => handleSkillRemove(skill)}>
                ×
              </span>
            </div>
          ))}
        </div>
        {/* Dropdown toggle arrow */}
        <span className="arrow">&#9662;</span>
      </div>
      {/* Conditionally render dropdown */}
      {isDropdownVisible && (
        <div className="skills-dropdown">
          {[
            'Communication',
            'Conflict Resolution',
            'Employee Relations',
            'Data Analysis',
            'Problem Solving',
            'Strategic Planning',
            'Java',
            'Spring Boot',
            'Hibernate',
            'REST API',
            'MongoDB',
            'Express.js',
            'React.js',
            'Node.js',
            'PHP',
            'Laravel',
            'WordPress',
            'MySQL',
          ].map((skill) => (
            <div key={skill} onClick={() => handleSkillSelect(skill)}>
              {skill}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
</fieldset>


        {/* Portfolio or Resume Section */}
        <fieldset className="border p-3 mb-4">
          <legend className="w-auto">Portfolio or Resume (Optional)</legend>
          <div className="mb-3">
            <label htmlFor="resume" className="form-label">
              Upload Resume (PDF, DOCX):
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="portfolio" className="form-label">
              Portfolio/Website Link:
            </label>
            <input
              type="url"
              id="portfolio"
              name="portfolio"
              className="form-control"
              placeholder="Enter the link to your portfolio or personal website"
              value={formData.portfolio}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        {/* Job Preferences Section */}
        <fieldset className="border p-3 mb-4">
          <legend className="w-auto">Job Preferences</legend>
          <div className="mb-3">
            <label htmlFor="jobType" className="form-label">
              Preferred Job Type:
            </label>
            <select
              id="jobType"
              name="jobType"
              className="form-select"
              value={formData.jobType}
              onChange={handleChange}
              required
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="relocate" className="form-label">
              Willing to Relocate:
            </label>
            <select
              id="relocate"
              name="relocate"
              className="form-select"
              value={formData.relocate}
              onChange={handleChange}
              required
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </fieldset>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default StudentRegistration;
