import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const ProfileDialog = ({ open, onClose, user }) => {

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <Dialog open={open} onClose={onClose} className="rounded-dialog" maxWidth="md" fullWidth>
            <Box className="profile-dialog-container p-4">
                <DialogTitle className="profile-dialog-header">
                    <h2>Personal Info</h2>
                </DialogTitle>
                <div className='pt-5'></div>
                <DialogContent className="profile-dialog-content">
                    <Box className="profile-dialog-item">
                        <Typography className="text-base font-sans">
                            Name: <strong className="text-lg font-bold">{capitalizeFirstLetter(user.name)}</strong>
                        </Typography>
                    </Box>
                    <Box className="profile-dialog-item">
                        <Typography className="text-base font-sans">
                            Year of Birth: <strong className="text-lg font-bold">{user.yearOfBirth}</strong>
                        </Typography>
                    </Box>
                    <Box className="profile-dialog-item">
                        <Typography className="text-base font-sans">
                            Education Level: <strong className="text-lg font-bold">{capitalizeFirstLetter(user.educationLevel)}</strong>
                        </Typography>
                    </Box>
                    <Box className="profile-dialog-item">
                        <Typography className="text-base font-sans">
                            Occupation: <strong className="text-lg font-bold">{capitalizeFirstLetter(user.occupation)}</strong>
                        </Typography>
                    </Box>
                    <Box className="profile-dialog-item">
                        <Typography className="text-base font-sans">
                            Working Hours Per Day: <strong className="text-lg font-bold">{user.workingHoursPerDay}</strong>
                        </Typography>
                    </Box>
                    <Box className="profile-dialog-item">
                        <Typography className="text-base font-sans">
                            Relationship Status: <strong className="text-lg font-bold">{capitalizeFirstLetter(user.relationshipStatus)}</strong>
                        </Typography>
                    </Box>
                    <Box className="profile-dialog-item">
                        <Typography className="text-base font-sans">
                            Number of Children: <strong className="text-lg font-bold">{user.numberOfChildren}</strong>
                        </Typography>
                    </Box>
                    <Box className="profile-dialog-item">
                        <Typography className="text-base font-sans">
                            Number of Siblings: <strong className="text-lg font-bold">{user.numberOfSiblings}</strong>
                        </Typography>
                    </Box>
                    <Box className="profile-dialog-item">
                        <Typography className="text-base font-sans">
                            Parents Divorced: <strong className="text-lg font-bold">{user.parentsDivorced ? 'Yes' : 'No'}</strong>
                        </Typography>
                    </Box>
                    <Box className="profile-dialog-item">
                        <Typography className="text-base font-sans">
                            Is Parents Alive: <strong className="text-lg font-bold">{user.isParentsAlive ? 'Yes' : 'No'}</strong>
                        </Typography>
                    </Box>
                    <Box className="profile-dialog-item">
                        <Typography className="text-base font-sans">
                            Dad Passed: <strong className="text-lg font-bold">{user.dadPassed ? 'Yes' : 'No'}</strong>
                        </Typography>
                    </Box>
                    <Box className="profile-dialog-item">
                        <Typography className="text-base font-sans">
                            Mom Passed: <strong className="text-lg font-bold">{user.momPassed ? 'Yes' : 'No'}</strong>
                        </Typography>
                    </Box>
                    <Box className="profile-dialog-item">
                        <Typography className="text-base font-sans">
                            Email: <strong className="text-lg font-bold">{user.email}</strong>
                        </Typography>
                    </Box>
                    <Box className="profile-dialog-item">
                        <Typography className="text-base font-sans">
                            Emergency Contact: <strong className="text-lg font-bold">{user.emergencyContact}</strong>
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} className="profile-dialog-button">
                        Close
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default ProfileDialog;
