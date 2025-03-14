import React, { useState, useRef, useEffect } from "react";
import "../css/SkillsForm.css"; // External CSS file
import axios from "axios";
import PotentialCandidates from "./PotentialCandidates";

const SkillsForm = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [jobRole, setJobRole] = useState("");
  const [candidatesData, setCandidatesData] = useState(null);  // State to hold candidates data
  const dropdownRef = useRef(null);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const payload = {
      skills: selectedSkills,
      jobRole,
      gpa: document.getElementById("cgpa").value,
      behavioralRemark: document.getElementById("behavioral_remark").value,
    };
  
    try {
      const response = await axios.post("http://localhost:5000/api/companies/search", payload);
  
      if (response.status === 201 || response.status === 200) {
        alert("Form submitted successfully!");
        console.log("Server Response:", response.data);
  
        // Ensure response.data is an array
       
          setCandidatesData(response.data.data);
        
      } else {
        alert("Something went wrong! Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error.response ? error.response.data : error.message);
      alert("An error occurred while submitting the form.");
    }
  };
  

  return candidatesData?<PotentialCandidates studentsData={candidatesData}/>:(
    <div className="cont">
      <form onSubmit={handleSubmit}>
        {/* Job Role Input */}
        <label htmlFor="job_role"><h2>Job Role:</h2></label>
        <select
          id="job_role"
          name="job_role"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          required
        >
          <option value="" disabled>Select a job role...</option>
          <option value="Software Engineer">Software Engineer</option>
          <option value="Data Scientist">Data Scientist</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="DevOps Engineer">DevOps Engineer</option>
          <option value="Product Manager">Product Manager</option>
          <option value="UX/UI Designer">UX/UI Designer</option>
        </select>

        {/* Skills Input */}
        <label htmlFor="skills"><h2>Skills:</h2></label>
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

        {/* CGPA Input */}
        <label htmlFor="cgpa"><h2>CGPA:</h2></label>
        <input type="number" id="cgpa" name="cgpa" min="1" max="10" step="0.1" required />

        {/* Behavioral Remark Input */}
        <label htmlFor="behavioral_remark"><h2>Behavioral Remark (1-10):</h2></label>
        <input type="number" id="behavioral_remark" name="behavioral_remark" min="1" max="10" required />

        {/* Submit Button */}
        <input type="submit" value="Submit" />
      </form>

      {/* Render PotentialCandidates component conditionally */}
      
    </div>
  );
};

export default SkillsForm;
