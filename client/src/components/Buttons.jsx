// src/containers/Buttons.js
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { userState } from '../store';

import { AnimatePresence, motion } from 'framer-motion';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { ChatSystem, CustomButton, InputText, Tab } from '../components';
import { SessionTabs, InputTabs } from '../config/constants';

import IconButton from '@mui/material/IconButton';
import MicIcon from '@mui/icons-material/Mic';
import MenuIcon from '@mui/icons-material/Menu';

import ConfirmationDialog from '../components/ConfirmationDialog';
import SessionInfo from '../components/SessionInfo';
import CustomMenu from '../components/CustomMenu'; 
import SettingsDialog from './SettingsDialog';
import ProfileDialog from './ProfileDialog';

const Buttons = () => {
    const snap = useSnapshot(userState);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [recognition, setRecognition] = useState(null);
    const open = Boolean(anchorEl);

    const [file, setFile] = useState('');
    const [prompt, setPrompt] = useState('');
    const [generatingImg, setGeneratingImg] = useState(false);
    const [activeSessionTab, setActiveSessionTab] = useState("");
    const [activeInputTab, setActiveInputTab] = useState("");

    const [recognizedText, setRecognizedText] = useState('');
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);
    const [showProfileDialog, setShowProfileDialog] = useState(false);
    const [showSettingsDialog, setShowSettingsDialog] = useState(false);

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

    const handleMicPress = () => {
        if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
            alert('Speech recognition is not supported in this browser. Please try using Chrome or Safari.');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognitionInstance = new SpeechRecognition();

        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setRecognizedText(transcript);
            console.log('Recognized text:', transcript);
        };

        recognitionInstance.onerror = (event) => {
            console.error('Error occurred in recognition: ', event.error);
        };

        recognitionInstance.onend = () => {
            setRecognition(null); // Clear the recognition instance
        };

        recognitionInstance.start();
        setRecognition(recognitionInstance);
    };

    const handleMicRelease = () => {
        if (recognition) {
            recognition.stop();
        }
    };

    // show tab content depending on the activeTab
    const generateSessionTabContent = () => {
        switch (activeSessionTab) {
            case "chat":
                return <ChatSystem userId={snap.user._id} />
            case "sessioninfo":
                return <SessionInfo user={snap.user} />;
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
                setShowProfileDialog(true);
                break;
            case 'settings':
                setShowSettingsDialog(true);
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

    const handleConfirmSwitchView = () => {
        setShowSwitchViewDialog(false);
        navigate('/chatview');
    };

    const handleCancelSwitchView = () => {
        setShowSwitchViewDialog(false);
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
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        handleMenuItemClick={handleMenuItemClick}
                    />
                </motion.div>

                <motion.div
                    key="input-tabs"
                    className="inputtabs-container"
                    {...slideAnimation("up")}
                    ref={inputTabRef}
                >
                    {InputTabs.map((tab) => (
                        tab.name === "mic" ? (
                            <button
                                key={tab.name}
                                className="mic-btn"
                                onMouseDown={handleMicPress}
                                onMouseUp={handleMicRelease}
                                onTouchStart={handleMicPress}
                                onTouchEnd={handleMicRelease}
                            >
                                <MicIcon className='mic-icon' style={{ fontSize: '2rem' }} />
                            </button>
                        ) : (
                            <Tab
                                key={tab.name}
                                tab={tab}
                                isInputTab
                                handleClick={() => setActiveInputTab(tab.name)}
                            />
                        )
                    ))}
                </motion.div>

                {/* Confirmation dialog for logout */}
                {showLogoutDialog && (
                    <ConfirmationDialog
                        onConfirm={handleConfirmLogout}
                        onCancel={handleCancelLogout}
                    />
                )}

                {/* Dialog for Profile */}
                <ProfileDialog
                    open={showProfileDialog}
                    onClose={() => setShowProfileDialog(false)}
                    user={snap.user}
                />

                {/* Dialog for Settings */}
                <SettingsDialog
                    open={showSettingsDialog}
                    onClose={() => setShowSettingsDialog(false)}
                />

            </>
        </AnimatePresence>
    );
};

export default Buttons;
