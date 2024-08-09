import React, { useState, useEffect, useRef } from 'react';

const ChatSystem = ({ userId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isInitialized, setIsInitialized] = useState(false);
    const [loading, setLoading] = useState(true);
    const chatContainerRef = useRef(null);

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

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;

        const userMessage = { id: Date.now(), sender: 'User', message: newMessage };
        setMessages([...messages, userMessage]);
        setNewMessage('');

        try {
            const response = await fetch('http://127.0.0.1:5000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: newMessage })
            });

            const data = await response.json();
            if (data.quit) {
                window.location.href = "/output";
                return;
            }

            const botMessage = { id: Date.now() + 1, sender: 'Therapist', message: data.response };
            setMessages(prevMessages => [...prevMessages, botMessage]);
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
        </div>
    );
};

export default ChatSystem;
