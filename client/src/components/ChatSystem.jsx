import React, { useState, useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';
import { userState } from '../store';
import DepressionFormDialog from './Fuzzy/DepressionFormDialog';
import AnxietyFormDialog from './Fuzzy/AnxietyFormDialog';

const ChatSystem = ({ userId, client, messages, setMessages }) => {
    const [newMessage, setNewMessage] = useState('');
    const [isInitialized, setIsInitialized] = useState(false);
    const [loading, setLoading] = useState(true);
    const chatContainerRef = useRef(null);
    const snap = useSnapshot(userState);
    const [showDepressionForm, setShowDepressionForm] = useState(false);
    const [showAnxietyForm, setShowAnxietyForm] = useState(false);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const initializeChat = async () => {
            try {
                console.log(`Initializing chat for user_id: ${userId}`);
                const response = await fetch(`http://127.0.0.1:5000/chat?user_id=${userId}`);
                if (response.ok) {
                    setIsInitialized(true);
                    localStorage.setItem('chatInitialized', 'true');
                    console.log("Chat initialized successfully");
                } else {
                    console.error('Failed to initialize chat.');
                }
            } catch (error) {
                console.error('Error initializing chat:', error);
            } finally {
                setLoading(false);
            }
        };

        const chatInitialized = localStorage.getItem('chatInitialized');
        if (!chatInitialized && userId) {
            initializeChat();
        } else {
            setLoading(false); // Ensure loading state is updated
        }
    }, [userId]);

    const showForms = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/session-info?user_id=${snap.user._id}`);
            if (response.ok) {
                const data = await response.json();
                const nSessions = data.n_sessions;
                console.log("nSessions:", nSessions);
                const isDepressed = snap.user.isDepressed;
                const isAnxious = snap.user.isAnxious;
                console.log("isDepressed:", isDepressed, "isAnxious:", isAnxious);

                if (nSessions === 3) {
                    if (isDepressed === 'Depression' || isDepressed === 'Not sure') {
                        setShowDepressionForm(true);
                    }

                    if (isAnxious === 'Anxiety' || isAnxious === 'Not sure') {
                        setShowAnxietyForm(true);
                    }
                }
            } else {
                console.error('Failed to fetch session info');
            }
        } catch (error) {
            console.error('Error fetching session info:', error);
        }
    };

    const handleSendMessage = async (messageContent = newMessage) => {
        if (messageContent.trim() === '') return;

        const userMessage = { id: Date.now(), sender: 'User', message: messageContent };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setNewMessage('');

        try {
            const response = await fetch('http://127.0.0.1:5000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: messageContent })
            });

            const data = await response.json();
            if (data.quit) {
                try {
                    const userResponse = await fetch('http://localhost:5000/api/get-data', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email: snap.user.email }),
                    });

                    if (userResponse.ok) {
                        const userData = await userResponse.json();

                        userState.user = userData;

                        console.log('User data updated in snap:', userData);

                        await showForms();
                    } else {
                        console.error('Failed to fetch user data');
                        localStorage.removeItem('chatInitialized');

                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    localStorage.removeItem('chatInitialized');

                }
                localStorage.removeItem('chatInitialized');
                return;
            }

            const botMessage = { id: Date.now() + 1, sender: 'Therapist', message: data.response };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            // Handle error (e.g., show error message to the user)
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (!e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
            }
        }
    };

    if (loading) {
        return (
            <div className="sessioninfo-container">
                <div className="sessioninfo-header">
                    <h2>Chat</h2>
                </div>
                <div className="sessioninfo-content">
                    <h1 className="loading-text"><strong>Loading ...</strong></h1>
                </div>
            </div>
        );
    }

    return (
        <div className="chat-system-container">
            <div
                className="chat-history-container"
                ref={chatContainerRef}
            >
                {messages.map(msg => (
                    <div key={msg.id} className={`chat-message ${msg.sender === 'User' ? 'user-message' : 'therapist-message'}`}>
                        <p>{msg.message}</p>
                    </div>
                ))}
            </div>
            <div className="chat-input-container">
                <textarea
                    className="chat-input"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    rows={2}
                    onKeyPress={handleKeyPress}
                />
                <button className="send-button" onClick={handleSendMessage}>Send</button>
            </div>

            {showDepressionForm && (
                <DepressionFormDialog
                    open={showDepressionForm}
                    onClose={() => setShowDepressionForm(false)}
                />
            )}
            {showAnxietyForm && (
                <AnxietyFormDialog
                    open={showAnxietyForm}
                    onClose={() => setShowAnxietyForm(false)}
                />
            )}
        </div>
    );
};

export default ChatSystem;
