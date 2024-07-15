import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { userState } from '../store';

import { AnimatePresence, motion } from 'framer-motion';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';

import ConfirmationDialog from '../components/ConfirmationDialog';

// Custom styled Menu component
const CustomMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        backgroundColor: '#FFF',
        color: '#111',
        borderRadius: '8px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
        fontFamily: 'Dharma-Gothic-E-Bold',
        padding: '20px',
        minWidth: '200px',
    },
}));

// Custom styled MenuItem component
const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
    '&:hover': {
        backgroundColor: '#999',
    },
    '& .MuiListItemText-primary': {
        color: '#fff',
    },
    fontFamily: 'Dharma-Gothic-E-Light-Italic',
    fontSize: '30px',
}));

const Buttons = () => {
    const snap = useSnapshot(userState);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const [file, setFile] = useState('');
    const [prompt, setPrompt] = useState('');
    const [generatingImg, setGeneratingImg] = useState(false);
    const [activeEditorTab, setActiveEditorTab] = useState("");
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true,
        stylishShirt: false,
    });

    const [showLogoutDialog, setShowLogoutDialog] = useState(false);


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
                    console.log('Verify Token Response:', data);
                    if (data.user) {
                        userState.setUser(data.user);
                    } else {
                        console.log('No User Data');
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
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        userState.setUser(null);
        navigate('/login');
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (action) => {
        handleMenuClose();
        switch (action) {
            case 'profile':
                navigate('/profile');
                break;
            case 'settings':
                navigate('/settings');
                break;
            case 'record':
                navigate('/record');
                break;
            case 'logout':
                console.log(showLogoutDialog);
                setShowLogoutDialog(true);
                console.log(showLogoutDialog);

                break;
            default:
                break;
        }
    };

    const handleConfirmLogout = () => {

        setShowLogoutDialog(false);
        handleLogout();
    };

    const handleCancelLogout = () => {

        setShowLogoutDialog(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!snap.user) {
        navigate('/login');
        return null;
    }

    return (
        <AnimatePresence>
            <>
                <motion.div
                    key="custom"
                    className="absolute top-0 left-0 z-10"
                    {...slideAnimation('left')}
                >
                    <div className="flex items-center min-h-screen">
                        <div className="editortabs-container tabs">
                            {EditorTabs.map((tab) => (
                                <Tab
                                    key={tab.name}
                                    tab={tab}
                                // handleClick={}
                                />
                            ))}
                            {/* {generateTabContent()} */}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="absolute z-10 top-5 right-5"
                    {...fadeAnimation}
                >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMenuClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <CustomMenu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleMenuClose}
                    >
                        <CustomMenuItem onClick={() => handleMenuItemClick('profile')}>PROFILE</CustomMenuItem>
                        <CustomMenuItem onClick={() => handleMenuItemClick('record')}>MEDICAL RECORD</CustomMenuItem>
                        <CustomMenuItem onClick={() => handleMenuItemClick('settings')}>SETTINGS</CustomMenuItem>
                        <CustomMenuItem onClick={() => handleMenuItemClick('logout')}>LOGOUT</CustomMenuItem>
                    </CustomMenu>
                </motion.div>

                <motion.div
                    className='filtertabs-container'
                    {...slideAnimation("up")}
                >
                    {FilterTabs.map((tab) => (
                        <Tab
                            key={tab.name}
                            tab={tab}
                            isFilterTab
                            isActiveTab={activeFilterTab[tab.name]}
                        // handleClick={() => handleActiveFilterTab(tab.name)}
                        />
                    ))}
                </motion.div>
                {/* Confirmation dialog for logout */}
                {showLogoutDialog && (
                    <ConfirmationDialog
                        onConfirm={handleConfirmLogout}
                        onCancel={handleCancelLogout}
                    />
                )}
            </>
        </AnimatePresence>

    );
};

export default Buttons;
