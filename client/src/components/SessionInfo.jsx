import React, { useEffect, useState } from 'react';

const SessionInfo = ({ user }) => {
    const [nSessions, setNSessions] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    useEffect(() => {
        const fetchSessionInfo = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/session-info?user_id=${user._id}`);
                if (response.ok) {
                    const data = await response.json();
                    setNSessions(data.n_sessions);
                } else {
                    setError('Failed to fetch session info');
                }
            } catch (error) {
                setError('An error occurred while fetching session info');
            } finally {
                setLoading(false);
            }
        };

        if (user && user._id) {
            fetchSessionInfo();
        }
    }, [user]);

    if (loading) {
        return (
            <div className="sessioninfo-container">
                <div className="sessioninfo-header">
                    <h2>Session Information</h2>
                </div>
                <div className="sessioninfo-content">
                    <h1 className="loading-text"><strong>Loading ...</strong></h1>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="sessioninfo-container">{error}</div>;
    }

    return (
        <div className="sessioninfo-container">
            <div className="sessioninfo-header">
                <h2>Session Information</h2>
            </div>
            <div className="sessioninfo-content">
                <p>Name: <strong>{capitalizeFirstLetter(user.name)}</strong></p>
                <p>Sessions Completed: <strong>{nSessions}</strong></p>
            </div>
        </div>
    );
};

export default SessionInfo;
