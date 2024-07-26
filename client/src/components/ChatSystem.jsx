import React, { useState, useEffect, useRef } from 'react';

const ChatSystem = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

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
