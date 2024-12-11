import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

// Create Context
export const UserDetailsContext = createContext();

// Provider Component
export const UserDetailsProvider = ({ children }) => {
  // Initial state for user details, authentication status, and user type
  const [userDetails, setUserDetails] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState("");
  const [isLoading, setIsLoading] = useState(true);  // Loading state

  // Update a specific field in user details
  const updateUserDetail = (field, value) => {
    if (!userDetails || !(field in userDetails)) {
      console.warn(`Field "${field}" does not exist in userDetails.`);
      return;
    }
    setUserDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Reset all user details and authentication status
  const resetUserDetails = () => {
    setUserDetails(null);
    setIsAuthenticated(false);
  };

  // Persist data to localStorage when user details or userType change
  useEffect(() => {
    const savedDetails = localStorage.getItem('userDetails');
    if (savedDetails) {
      try {
        const parsedDetails = JSON.parse(savedDetails);
        setUserDetails(parsedDetails);
        setUserType(parsedDetails.userType || null);  // Set userType from saved details
        setIsAuthenticated(true);  // Assuming if details are available, the user is authenticated
      } catch (error) {
        console.error("Failed to parse user details:", error);
        setIsAuthenticated(false);  // Set the user as not authenticated in case of error
      }
    }
    setIsLoading(false);  // Set loading to false after data is processed
  }, []);

  useEffect(() => {
    if (userDetails) {
      const userData = {
        ...userDetails,
        userType,  // Store userType along with userDetails
      };
      localStorage.setItem('userDetails', JSON.stringify(userData));
    }
  }, [userDetails, userType]);

  // Memoize context value to optimize performance and prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    userDetails,
    isAuthenticated,
    setIsAuthenticated,
    updateUserDetail,
    resetUserDetails,
    setUserDetails,
    userType,
    setUserType,
  }), [userDetails, isAuthenticated, userType]);

  // Loading indicator while data is being fetched from localStorage
  if (isLoading) {
    return <div>Loading...</div>;  // You can customize this loading message or add a spinner
  }

  return (
    <UserDetailsContext.Provider value={contextValue}>
      {children}
    </UserDetailsContext.Provider>
  );
};

// Custom Hook to access the context
export const useUserDetails = () => {
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error('useUserDetails must be used within a UserDetailsProvider');
  }
  return context;
};
