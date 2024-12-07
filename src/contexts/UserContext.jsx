import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Context
export const UserDetailsContext = createContext();

// Initial State
const initialUserDetails = {
  profile: {
    fullName: "",
    image: "",
  },
  details: {
    email: "",
    phone: "",
    dob: "",
    location: "",
    university: "",
    degree: "",
    gradDate: "",
    gpa: "",
  },
  skills: [],
  certifications: [],
  portfolio: {},
  socialLinks: [],
  jobPreferences: [],
};

// Provider Component
export const UserDetailsProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(initialUserDetails);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
      setIsAuthenticated(true);  // Assuming if details are available, the user is authenticated
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  }, [userDetails]);

  return (
    <UserDetailsContext.Provider
      value={{
        userDetails,
        isAuthenticated,
        setIsAuthenticated,
        updateUserDetail,
        resetUserDetails,
        setUserDetails,
      }}
    >
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
