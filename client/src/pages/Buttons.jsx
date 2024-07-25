import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { userState } from '../store';

import { AnimatePresence, motion } from 'framer-motion';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { ColorPicker, CustomButton, FilePicker, InputText, Tab } from '../components';
import InputMic from '../components/InputMic';
import { SessionTabs, InputTabs } from '../config/constants';

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
    const [activeSessionTab, setActiveSessionTab] = useState("");
    const [activeInputTab, setActiveInputTab] = useState("");

    const [recognizedText, setRecognizedText] = useState('');
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    const sessionTabRef = useRef(null);
    const inputTabRef = useRef(null);

    const handleClickOutside = (event) => {
        if (
            sessionTabRef.current && !sessionTabRef.current.contains(event.target) &&
            inputTabRef.current && !inputTabRef.current.contains(event.target)
        ) {
            setActiveSessionTab("");
            setActiveInputTab("");
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSubmit = (action) => {
        if (action === 'send') {
            console.log(prompt);
            setPrompt('');
        } else if (action === 'clear') {
            setPrompt('');
        }
    };

    // show tab content depending on the activeTab
    const generateSessionTabContent = () => {
        switch (activeSessionTab) {
            case "chat":
                return <ColorPicker />
            case "sessioninfo":
                return <FilePicker
                    file={file}
                    setFile={setFile}
                />
            case "text":
                return <InputText
                    prompt={prompt}
                    setPrompt={setPrompt}
                    generatingImg={generatingImg}
                    handleSubmit={handleSubmit}
                />
            default:
                return null;
        }
    }

    const generateInputTabContent = () => {
        switch (activeInputTab) {
            case "text":
                return <InputText
                    prompt={prompt}
                    setPrompt={setPrompt}
                    generatingImg={generatingImg}
                    handleSubmit={handleSubmit}
                />;
            case "mic":
                return <InputMic setRecognizedText={setRecognizedText} />;
            default:
                return null;
        }
    }

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
                setShowLogoutDialog(true);
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
                    ref={sessionTabRef}
                >
                    <div className="flex items-center min-h-screen">
                        <div className="sessiontabs-container tabs">
                            {SessionTabs.map((tab) => (
                                <Tab
                                    key={tab.name}
                                    tab={tab}
                                    handleClick={() => setActiveSessionTab(tab.name)} />
                            ))}
                            {generateSessionTabContent()}
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
                    key="input-tabs"
                    className="inputtabs-container"
                    {...slideAnimation("up")}
                    ref={inputTabRef}
                >
                    {InputTabs.map((tab) => (
                        <Tab
                            key={tab.name}
                            tab={tab}
                            isInputTab
                            handleClick={() => setActiveInputTab(tab.name)}
                        />
                    ))}
                    {activeInputTab && (
                        <div className="bottom-tab-content">
                            {generateInputTabContent()}
                        </div>
                    )}
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
