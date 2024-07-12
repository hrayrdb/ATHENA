import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userState } from '../store'; // Import the Valtio state

const Test = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            // If no token, redirect to login page
            navigate('/login');
        }

        if (!userState.user) {
            // If not logged in, redirect to login page
            navigate('/login');
        }

    }, [navigate]);

    const handleLogout = () => {
        // Clear user data from Valtio state
        userState.clearUser();

        // Clear token from localStorage (if necessary)
        localStorage.removeItem('token');

        // Redirect to login page
        navigate('/login');
    };

    return (
        <div>
            <h1>Welcome, {userState.user ? userState.user.name : ''}!</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Test;




