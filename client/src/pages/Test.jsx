import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Test = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token, redirect to login page
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');

    // Redirect to login page
    navigate('/login');
  };

  return (
    <div>
      <h1>Test Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Test;
