import React, { useState, useEffect } from 'react';

const SkillsAndInterests = ({ selectedSkills, setSelectedSkills }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const skillsList = [
    "Communication", "Conflict Resolution", "Employee Relations", "Data Analysis",
    "Problem Solving", "Strategic Planning", "Java", "Spring Boot", "Hibernate",
    "REST API", "MongoDB", "Express.js", "React.js", "Node.js", "PHP", "Laravel",
    "WordPress", "MySQL",
  ];

  const addSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const removeSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.skills-container')) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="skills-container">
      {/* Dropdown Toggle */}
      <div className="select-box" onClick={toggleDropdown}>
        <span className="placeholder">
          {selectedSkills.length === 0 ? "Select skills..." : selectedSkills.join(", ")}
        </span>
        <span className="arrow">&#9662;</span>
      </div>

      {/* Dropdown Content */}
      {dropdownVisible && (
        <div className="skills-dropdown">
          {skillsList.filter((skill) => !selectedSkills.includes(skill)).map((skill) => (
            <div key={skill} className="dropdown-item" onClick={() => addSkill(skill)}>
              {skill}
            </div>
          ))}
        </div>
      )}

      {/* Selected Skills */}
      <div id="selected-skills">
        {selectedSkills.map((skill) => (
          <div key={skill} className="skill-bubble">
            {skill}
            <span className="remove-btn" onClick={() => removeSkill(skill)}>×</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsAndInterests;
