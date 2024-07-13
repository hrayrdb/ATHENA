import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { userState } from '../store';

const App = () => {
    const snap = useSnapshot(userState);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('http://localhost:5000/api/verifyToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.user) {
                        userState.setUser(data.user);
                    } else {
                        localStorage.removeItem('token');
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error verifying token:', error);
                    localStorage.removeItem('token');
                    setLoading(false);
                });
        } else {
            navigate('/login'); // Redirect to login if there's no token
            setLoading(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        userState.setUser(null);
        navigate('/login');
    };
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {snap.user ? (
                <div>Welcome, {snap.user.email}
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                navigate('/login'))}
        </div>
    );
};

export default App;
