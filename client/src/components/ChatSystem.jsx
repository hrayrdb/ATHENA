import React, { useState, useEffect, useRef } from 'react';

const dummyMessages = [
    { id: 1, sender: 'User', message: 'Hello, ss?' },
    { id: 2, sender: 'Therapist', message: 'I am good, thank you! How can I help you today?' },
    { id: 3, sender: 'User', message: 'I have been feeling stressed lately.' },
    { id: 4, sender: 'Therapist', message: 'I understand. Can you tell me more about what is causing your stress?' },
    // Add more dummy messages as needed
];

const ChatSystem = () => {
    const [messages, setMessages] = useState(dummyMessages);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const loadMoreMessages = () => {
        setIsLoading(true);

        // Simulate loading older messages
        setTimeout(() => {
            const olderMessages = [
                { id: 5, sender: 'Therapist', message: 'Older message 1' },
                { id: 6, sender: 'User', message: 'Older message 2' },
                // Add more older messages as needed
            ];

            // Check for duplicates before adding
            setMessages(prevMessages => {
                const existingIds = new Set(prevMessages.map(msg => msg.id));
                const newMessages = olderMessages.filter(msg => !existingIds.has(msg.id));
                return [...newMessages, ...prevMessages];
            });

            // Ensure the view stays at the top
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight - chatContainerRef.current.clientHeight;
            }

            setIsLoading(false);
        }, 1000); // Simulate a 1-second loading time
    };

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        const userMessage = { id: Date.now(), sender: 'User', message: newMessage };
        setMessages([...messages, userMessage]);
        setNewMessage('');

        // Simulate chatbot response
        setTimeout(() => {
            const botMessage = { id: Date.now() + 1, sender: 'Therapist', message: 'auto reply' };
            setMessages(prevMessages => [...prevMessages, botMessage]);
        }, 500);
    };

    return (
        <div className="chat-system-container">
            <div
                className="chat-history-container"
                ref={chatContainerRef}
                onScroll={(e) => {
                    if (e.target.scrollTop === 0 && !isLoading) {
                        loadMoreMessages();
                    }
                }}
            >
                {isLoading && <div className="loading-spinner">Loading...</div>}
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
                />
                <button className="send-button" onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatSystem;
