import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import CustomButton from './CustomButton';

const SettingsDialog = ({ open, onClose }) => {
    const [language, setLanguage] = useState('en');
    const [confirmDelete, setConfirmDelete] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!open) {
            setConfirmDelete(false); // Reset to original content when dialog is closed
        }
    }, [open]);

    const deleteAccount = async () => {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:5000/api/delete-account', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (response.status === 200) {
            localStorage.removeItem('token');

            console.log('Account deleted successfully.');
            // Handle post-deletion actions, such as redirecting the user
        } else {
            console.error(result.message);
            // Handle error
        }
    };

    const handleLanguageChange = (event) => {
        const newLanguage = event.target.value;
        setLanguage(newLanguage);
    };

    const handleDeleteClick = () => {
        setConfirmDelete(true);
    };

    const handleCancelClick = () => {
        setConfirmDelete(false);
    };

    const handleConfirmDelete = () => {
        deleteAccount();
        setConfirmDelete(false);
        navigate('/login');
        console.log('Account deleted');
    };

    return (
        <Dialog open={open} onClose={onClose} className="rounded-dialog" maxWidth="sm" fullWidth>
            <Box className="settings-dialog-container p-4">
                <DialogTitle className="settings-dialog-header">
                    <h2 className="font-sora">Settings</h2>
                </DialogTitle>
                <div className='pt-5'></div>
                <DialogContent className="settings-dialog-content">
                    {!confirmDelete ? (
                        <>
                            <Box className="settings-dialog-item bordered-box flex items-center justify-between">
                                <h3 className="text-base font-sora font-bold p-5">
                                    Delete Your Account?
                                </h3>
                                <CustomButton
                                    handleClick={handleDeleteClick}
                                    type="filled"
                                    title="DELETE"
                                    customStyles="w-auto px-4 py-2.5 font-bold text-sm flex-none"
                                />
                            </Box>
                            {/* <Box className="settings-dialog-item bordered-box mt-4">
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel className="font-sora">Language</InputLabel>
                                    <Select
                                        value={language}
                                        onChange={handleLanguageChange}
                                        label="Language"
                                        className="font-sora"
                                    >
                                        <MenuItem value="en">English</MenuItem>
                                        <MenuItem value="ar">Arabic</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box> */}
                        </>
                    ) : (
                        <Box className="settings-dialog-item bordered-box flex flex-col items-center">
                            <h2 className="text-base font-sora font-bold mb-4 p-5">
                                DELETE YOUR ACCOUNT?
                            </h2>
                            <Box className="flex justify-around w-full mb-4">
                                <CustomButton
                                    handleClick={handleConfirmDelete}
                                    type="filled"
                                    title="YES"
                                />
                                <div className='px-4'></div>
                                <CustomButton
                                    handleClick={handleCancelClick}
                                    type="outline"
                                    title="CANCEL"
                                    customStyles="w-full px-4 py-2.5 font-bold text-sm"
                                />
                            </Box>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} style={{ color: '#6B7280' }} className="settings-dialog-button font-sora bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        Close
                    </Button>

                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default SettingsDialog;
