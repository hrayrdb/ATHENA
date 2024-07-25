import React from 'react';

const SessionInfo = ({ user }) => {
    return (
        <div className="sessioninfo-container">
            <div className="sessioninfo-header">
                <h2>Session Information</h2>
            </div>
            <div className="sessioninfo-content">
                <p>Name: <strong>{user.name} </strong></p>
                <p>Session Number:<strong> 1 </strong></p>
            </div>
        </div>
    );
};

export default SessionInfo;
