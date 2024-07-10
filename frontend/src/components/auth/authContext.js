import React, { createContext, useState, useContext, useEffect } from 'react';
import useInactivityLogout from '../../hooks/useInactivityLogout.js';

// Create the Auth context
const AuthContext = createContext();

// AuthProvider component that wraps around children components
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  // Function to log in the user
  const login = (id) => {
    setIsLoggedIn(true);
    setUserId(id);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userId', id);
  };

  // Function to log out the user
  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
  };

  // Effect to check if user is logged in on component mount
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUserId = localStorage.getItem('userId');
    setIsLoggedIn(loggedIn);
    setUserId(loggedIn ? storedUserId : null);
  }, []);

   useInactivityLogout(logout, 600000); // 10 minutes in milliseconds

  // Provide the state and functions to child components
  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => useContext(AuthContext);
