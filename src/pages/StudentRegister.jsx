import React, { useState, useEffect } from 'react';
import "../css/StudentRegister.css";
import "../godfather_css/style.css";
import { cities } from './cities';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const StudentRegistration = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    jobType: '',
    relocate: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const { files } = e.target;
    const file = files[0];

    if (
      file &&
      !["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(
        file.type
      )
    ) {
      alert("Invalid file type. Please upload a PDF or DOCX.");
      return;
    }

    if (file && file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB.");
      return;
    }
    setFormData({ ...formData, resume: file });
  };

  // Handle skill dropdown
  const handleDropdownToggle = () => {
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

  // Close dropdown on outside click
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length <= 6) {
      alert("Password must be greater than 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    const submissionData = new FormData();
    for (const key in formData) {
      submissionData.append(key, formData[key]);
    }
    submissionData.append("skills", JSON.stringify(selectedSkills));

    try {
      const response = await axios.post("http://localhost:5000/api/students/register", submissionData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        alert("Registration successful!");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="registration-form">
      <h1 className="mb-4 text-center">Student Registration</h1>
      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <fieldset className="border p-3 mb-4">
          <legend className="w-auto">Personal Information</legend>
          <div className="mb-3">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="form-control"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password">Password:</label>
            <div className="d-flex align-items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span onClick={togglePasswordVisibility} style={{ cursor: 'pointer', marginLeft: '8px' }}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
        </fieldset>

        {/* Skills Dropdown */}
        <fieldset className="border p-3 mb-4">
          <legend className="w-auto">Skills & Interests</legend>
          <div className="skills-container">
            <div className="select-box" onClick={handleDropdownToggle}>
              <span>Select skills...</span>
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
              <span className="arrow">&#9662;</span>
            </div>

            {isDropdownVisible && (
              <div className="skills-dropdown">
                {['Java', 'Python', 'React.js', 'Node.js', 'MongoDB', 'Data Analysis', 'Spring Boot'].map((skill) => (
                  <div key={skill} onClick={() => handleSkillSelect(skill)}>
                    {skill}
                  </div>
                ))}
              </div>
            )}
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
