// src/UserDetailsContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Context
export const UserDetailsContext = createContext();

// Initial State
const initialUserDetails = {
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    location: '',
    university: '',
    degree: '',
    gradDate: '',
    gpa: '',
    jobType: '',
    relocate: '',
    resume: '',
    skills: [],
};

// Provider Component
export const UserDetailsProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(initialUserDetails);

    // Update a specific field in user details
    const updateUserDetail = (field, value) => {
        if (!(field in userDetails)) {
            console.warn(`Field "${field}" does not exist in userDetails.`);
            return;
        }
        setUserDetails((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Reset all details
    const resetUserDetails = () => setUserDetails(initialUserDetails);

    // Persist data to localStorage
    useEffect(() => {
        const savedDetails = localStorage.getItem('userDetails');
        if (savedDetails) {
            setUserDetails(JSON.parse(savedDetails));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
    }, [userDetails]);

    return (
        <UserDetailsContext.Provider value={{ userDetails, updateUserDetail, resetUserDetails }}>
            {children}
        </UserDetailsContext.Provider>
    );
};

// Custom Hook
export const useUserDetails = () => {
    const context = useContext(UserDetailsContext);
    if (!context) {
        throw new Error('useUserDetails must be used within a UserDetailsProvider');
    }
    return context;
};