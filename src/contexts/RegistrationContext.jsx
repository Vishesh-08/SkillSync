// src/RegistrationContext.js
import React, { createContext, useState } from 'react';

// Create the context
export const RegistrationContext = createContext();

// Create a provider component
export const RegistrationProvider = ({ children }) => {
    const [registrationData, setRegistrationData] = useState({
        name: '',
        email: '',
        job_role: '',
        skills: [],
        cgpa: '',
        behavioral_remark: '',
    });
    const [resume, setResume] = useState(null);

    const updateRegistrationData = (field, value) => {
        setRegistrationData(prevData => ({
            ...prevData,
            [field]: value,
        }));
    };

    const contextValue = {
        registrationData,
        resume,
        setResume,
        updateRegistrationData,
    };

    return (
        <RegistrationContext.Provider value={contextValue}>
            {children}
        </RegistrationContext.Provider>
    );
};
