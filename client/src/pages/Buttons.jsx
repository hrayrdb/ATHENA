import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { userState } from '../store';

import { AnimatePresence, motion } from 'framer-motion';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';

const Buttons = () => {
    const snap = useSnapshot(userState);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [file, setFile] = useState('');
    const [prompt, setPrompt] = useState('');
    const [generatingImg, setGeneratingImg] = useState(false);
    const [activeEditorTab, setActiveEditorTab] = useState("");
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true,
        stylishShirt: false,
    });

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
                    <CustomButton
                        type="filled"
                        title="Logout"
                        handleClick={() => handleLogout()}
                        customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                    />
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
            </>
        </AnimatePresence>
    );
};

export default Buttons;
