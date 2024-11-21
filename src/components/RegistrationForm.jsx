// src/components/RegistrationForm.jsx
import React, { useContext } from 'react';
import { RegistrationContext } from '../RegistrationContext';

const RegistrationForm = () => {
    const { registrationData, updateRegistrationData, resume, setResume } = useContext(RegistrationContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateRegistrationData(name, value);
    };

    const handleResumeChange = (e) => {
        setResume(e.target.files[0]);
    };

    return (
        <form>
            <input
                type="text"
                name="name"
                value={registrationData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
            />
            <input
                type="email"
                name="email"
                value={registrationData.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="text"
                name="job_role"
                value={registrationData.job_role}
                onChange={handleChange}
                placeholder="Job Role"
                required
            />
            {/* Skills, CGPA, Behavioral Remark, etc., inputs would follow the same pattern */}
            <input
                type="file"
                onChange={handleResumeChange}
                accept=".pdf"
                required
            />
            {/* Add a submit button, which will likely call a handler that submits the form */}
        </form>
    );
};

export default RegistrationForm;
