import React, { useState,useEffect,useRef } from 'react';
import "../css/StudentRegister.css"
import "../godfather_css/style.css";
import { cities } from './cities';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const StudentRegistration = () => {
  
  
  const [showPassword, setShowPassword] = useState(false);
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);
  const [socialMediaInput, setSocialMediaInput] = useState({
  platform: "",
  url: "",
});

const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  password: "",
  phone: "",
  dob: "",
  location: "",
  university: "",
  degree: "",
  yearOfStudy: "",
  gradDate: "",
  gpa: "",
  
  relocate: false,
  portfolio: "",
  socialMediaLinks: [],
  resume: null,
  photo: null,
  skills:[]
});
const [jobPreferences,setJobPreferences]=useState([]);

  
  const handleJobPreferenceChange = (e) => {
    const { value, checked } = e.target;
    
  
    setJobPreferences((prev) => {
      if (checked) {
        // Add the selected job preference
        return [...prev, value];
      } else {
        // Remove the unselected job preference
        return prev.filter((preference) => preference !== value);
      }
    });
  };
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;  // Correcting e to e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value  // Dynamically updating the field based on its name
    }));
    
  };
  
  
const [selectedSkills, setSelectedSkills] = useState([]);
const [selectedCertifications, setSelectedCertifications] = useState([]);

;

const handleCertificationAdd = () => {
  if (newCertification.trim()) {
    setSelectedCertifications((prevCerts) => [
      ...prevCerts,
      newCertification,
    ]);
    setNewCertification("");
  }
};
// Certifications as an array
;
const [isCertificationsDropdownVisible, setIsCertificationsDropdownVisible] = useState(false);
const [newCertification, setNewCertification] = useState(""); // New certification input







const handleCertificationRemove = (certification) => {
  setSelectedCertifications((prev) =>
    prev.filter((item) => item !== certification)
  );
};


  

const handleFileChange = (e) => {
  const { name, files } = e.target;
  const file = files[0];

  if (file && !["image/jpeg", "image/png"].includes(file.type) && name === 'photo') {
    alert("Invalid file type. Please upload a PNG or JPEG image.");
    return;
  }

  if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
    alert("File size exceeds 5MB.");
    return;
  }

  setFormData({ ...formData, [name]: file });
};


  //skills script
  

 
  


  

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
  }, []);const handleSocialMediaInputChange = (e) => {
    const { name, value } = e.target;
    setSocialMediaInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const dropdownRef = useRef(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const skills = [
    "Communication",
    "Conflict Resolution",
    "Employee Relations",
    "Data Analysis",
    "Problem Solving",
    "Strategic Planning",
    "Java",
    "Spring Boot",
    "Hibernate",
    "REST API",
    "MongoDB",
    "Express.js",
    "React.js",
    "Node.js",
    "PHP",
    "Laravel",
    "WordPress",
    "MySQL",
  ];

const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const addSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const removeSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  
  const handleAddSocialMedia = () => {
    if (socialMediaInput.platform && socialMediaInput.url) {
      setSocialMediaLinks((prevLinks) => [
        ...prevLinks,
        {
          platform: socialMediaInput.platform,
          url: socialMediaInput.url,
          iconClass: getIconClass(socialMediaInput.platform), // A function to map platform to its icon class
          color: getPlatformColor(socialMediaInput.platform), // A function to map platform to its color
        },
      ]);
      setSocialMediaInput({ platform: "", url: "" }); // Reset input fields
    }
  };

  const handleRemoveSocialMedia = (index) => {
    setSocialMediaLinks((prevLinks) => prevLinks.filter((_, i) => i !== index));
  };
  
  
  const getIconClass = (platform) => {
    // You can map platform names to their respective FontAwesome icon classes
    const iconMap = {
      linkedin: "fa-linkedin",
      github: "fa-github",
      twitter: "fa-twitter",
      facebook: "fa-facebook",
      // Add more platforms here
    };
    return iconMap[platform.toLowerCase()] || "fa-link"; // Default icon
  };
  
  const getPlatformColor = (platform) => {
    // You can map platforms to specific colors
    const colorMap = {
      linkedin: "#0e76a8", // LinkedIn blue
      github: "#333", // GitHub dark
      twitter: "#1DA1F2", // Twitter blue
      facebook: "#1877F2", // Facebook blue
      // Add more platforms here
    };
    return colorMap[platform.toLowerCase()] || "#000"; // Default color
  };
  

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleRelocateChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      relocate: value === 'Yes',
    }));
  };
  


  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure 'formData' has the correct values
    const submissionData = new FormData();
    submissionData.append("fullName", formData.fullName);
    submissionData.append("email", formData.email);
    submissionData.append("password", formData.password);
    submissionData.append("phone", formData.phone);
    submissionData.append("dob", formData.dob);
    submissionData.append("location", formData.location);
    submissionData.append("university", formData.university);
    submissionData.append("degree", formData.degree);
    submissionData.append("yearOfStudy", formData.yearOfStudy);
    submissionData.append("gradDate", formData.gradDate);
    submissionData.append("gpa", formData.gpa);
    submissionData.append("jobPreferences", jobPreferences);
    submissionData.append("relocate", formData.relocate ? "true" : "false");
    
  
    // Append JSON fields (social media, skills, certifications)
    submissionData.append("socialLinks", JSON.stringify(socialMediaLinks));
    submissionData.append("skills", JSON.stringify(selectedSkills));
    submissionData.append("certifications", JSON.stringify(selectedCertifications));
  
    // Append the files (photo, resume)
    if (formData.resume) {
      submissionData.append("resume", formData.resume);
    }
  
    if (formData.photo) {
      submissionData.append("photo", formData.photo);
    }
  
    // Log submission data for debugging purposes (ensure sensitive info like password is not logged in production)
  
  
    try {
      const response = await axios.post("http://localhost:5000/api/students/register", submissionData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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



//Trial for skills

const dropdownRef = useRef(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const skills = [
    "Communication",
    "Conflict Resolution",
    "Employee Relations",
    "Data Analysis",
    "Problem Solving",
    "Strategic Planning",
    "Java",
    "Spring Boot",
    "Hibernate",
    "REST API",
    "MongoDB",
    "Express.js",
    "React.js",
    "Node.js",
    "PHP",
    "Laravel",
    "WordPress",
    "MySQL",
  ];

const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const addSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const removeSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

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

        {/* Skills Input */}
      <label htmlFor="skills" className="form-label">Skills:</label>
      <div className="skills-container" ref={dropdownRef} onClick={toggleDropdown}>
        <div className="select-box">
          <span className="placeholder" style={{ display: selectedSkills.length ? "none" : "block" }}>
            Select skills...
          </span>
          <div className="selected-skills">
            {selectedSkills.map((skill, index) => (
              <div key={index} className="skill-bubble">
                {skill}
                <span className="remove-btn" onClick={() => removeSkill(skill)}>×</span>
              </div>
            ))}
          </div>
          <span className="arrow">&#9662;</span>
        </div>
        {isDropdownVisible && (
          <div className={`skills-dropdown ${isDropdownVisible ? "visible" : ""}`}>
            {skills.map((skill, index) => (
              <div key={index} onClick={() => addSkill(skill)}>
                {skill}
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
      <div className="mt-4">
    <label htmlFor="certifications">Certifications:</label>
    <div className="certifications-container">
      {/* Input field for adding certifications */}
      <div className="select-box" onClick={() => setIsCertificationsDropdownVisible((prev) => !prev)}>
        <span
          className="placeholder"
          style={{ display: selectedCertifications.length ? "none" : "block" }}
        >
          Enter certifications...
        </span>

        {/* Display selected certifications as removable bubbles */}
        <div className="selected-certifications">
          {selectedCertifications.map((certification, index) => (
            <div key={index} className="certification-bubble">
              {certification}
              <span
                className="remove-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCertificationRemove(certification);
                }}
              >
                ×
              </span>
            </div>
          ))}
        </div>

        {/* Dropdown toggle arrow */}
        <span className="arrow">&#9662;</span>
      </div>

      {/* Dropdown menu for certifications */}
      {isCertificationsDropdownVisible && (
        <div className="certifications-dropdown">
          <input
            type="text"
            value={newCertification}
            onChange={(e) => setNewCertification(e.target.value)}
            placeholder="Enter certification name"
          />
          <button
            type="button"
            onClick={handleCertificationAdd}
            className="add-btn"
          >
            Add Certification
          </button>
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
            <label htmlFor="photo" className="form-label">
              Upload Photo (PNG, JPEG):
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
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
            <label htmlFor="photo" className="form-label">
              Upload Photo (PNG, JPEG):
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
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

        <fieldset className="SR-border SR-padding-3 SR-margin-bottom-4">
  <h2 className="w-auto">Social Media</h2>
  <div className="SR-form-group">
    <label htmlFor="platform" className="SR-label">Platform Name</label>
    <select
      name="platform"
      id="platform"
      value={socialMediaInput.platform}
      onChange={handleSocialMediaInputChange}
      className="SR-select"
    >
      <option value="">Select Platform</option>
      <option value="linkedin">LinkedIn</option>
      <option value="github">GitHub</option>
      <option value="twitter">Twitter</option>
      <option value="facebook">Facebook</option>
      {/* Add more options here */}
    </select>

    <label htmlFor="url" className="SR-label">Social Media URL</label>
    <input
      type="url"
      name="url"
      id="url"
      value={socialMediaInput.url}
      onChange={handleSocialMediaInputChange}
      placeholder="Enter URL"
      className="SR-input"
    />
    <button 
      type="button" 
      onClick={handleAddSocialMedia} 
      className="SR-button SR-button-primary">
      Add Social Media Link
    </button>
  </div>

  <h3 className="SR-subtitle">Added Links:</h3>
  <div className="SR-flex-gap">
    {socialMediaLinks.map((social, index) => (
      <div key={index} className="SR-link-item">
        <a
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="SR-flex SR-items-center SR-gap-2"
        >
          <i
            className={`fab ${social.iconClass} SR-social-media-icon`}
            style={{ color: social.color }}
          ></i>
          <span className="SR-platform-name">{social.platform}</span>
        </a>
        <button
          type="button"
          onClick={() => handleRemoveSocialMedia(index)}
          className="SR-remove-button"
        >
          x
        </button>
      </div>
    ))}
  </div>
</fieldset>




        {/* Job Preferences Section */}
        

  {/* Preferred Job Types */}
  <fieldset className="border p-3 mb-4">
  <legend className="w-auto">Job Preferences</legend>

  <div className="mb-3">
    <label className="form-label">Preferred Job Types:</label>
    <div>
      {["Full-time", "Part-time", "Internship"].map((jobType) => (
        <div className="form-check" key={jobType}>
          <input
            type="checkbox"
            id={jobType}
            name="jobType"
            value={jobType}
            checked={Array.isArray(jobPreferences) && jobPreferences.includes(jobType)} // Guard against undefined
            onChange={handleJobPreferenceChange}
            className="form-check-input"
          />
          <label htmlFor={jobType} className="form-check-label">
            {jobType}
          </label>
        </div>
      ))}
    </div>
  </div>


  {/* Relocation Preference */}
  <div className="mb-3">
    <label htmlFor="relocate" className="form-label">
      Willing to Relocate:
    </label>
    <select
      id="relocate"
      name="relocate"
      className="form-select"
      value={formData.relocate ? "Yes" : "No"} // Convert boolean to Yes/No
      onChange={handleRelocateChange}
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
