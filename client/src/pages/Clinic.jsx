import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Experience } from '../components/Experience';
import { Loader } from '@react-three/drei';
import { useConvaiClient } from '../hooks/useConvaiClient';
import Buttons from '../components/Buttons';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { userState } from '../store';
import SessionStartDialog from '../components/SessionStartDialog'; // Import the new dialog component

function Clinic() {

  const snap = useSnapshot(userState);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]); // Persistent message state
  const [dialogOpen, setDialogOpen] = useState(false); // State to control the dialog

  const apiKey = "79f59a42818bca9f304c576aea5d04e4";
  const characterId = "327dfc32-2cb8-11ef-aaf8-42010a7be00e";

  const { client } = useConvaiClient(characterId, apiKey);

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
          if (data.user) {
            userState.setUser(data.user);
            const nSessions = data.user.nSessions || 0;

            if (nSessions === 0) {
              setDialogOpen(true); // Open the dialog for the first session
            } else {
              alert(`Start your ${getSessionOrdinal(nSessions + 1)} session`);
            }

            // Initialize chat as soon as Clinic opens
            initializeChat(data.user._id);
          } else {
            localStorage.removeItem('token');
            navigate('/login');
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Error verifying token:', error);
          localStorage.removeItem('token');
          setLoading(false);
          navigate('/login');
        });
    } else {
      navigate('/login');
      setLoading(false);
    }
  }, [navigate]);

  const initializeChat = async (userId) => {
    try {
      console.log(`Initializing chat for user_id: ${userId}`);
      const response = await fetch(`http://127.0.0.1:5000/chat?user_id=${userId}`);
      if (response.ok) {
        localStorage.setItem('chatInitialized', 'true');
        console.log("Chat initialized successfully");
      } else {
        console.error('Failed to initialize chat.');
      }
    } catch (error) {
      console.error('Error initializing chat:', error);
    }
  };

  const getSessionOrdinal = (sessionNumber) => {
    const ordinals = ["first", "second", "third"];
    return ordinals[sessionNumber - 1] || `${sessionNumber}th`; // Default to ordinal numbers beyond third
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>; // Restoring the original loading behavior
  }

  return (
    <>
      <Loader />

      {/* 3D Scene */}
      <Canvas
        shadows
        camera={{
          position: [0, 0.8, 3],
          fov: 75,
        }}
      >
        <Experience client={client} />
      </Canvas>

      {/* Buttons */}
      <Buttons client={client} messages={messages} setMessages={setMessages} />

      {/* Session Start Dialog */}
      <SessionStartDialog open={dialogOpen} onClose={handleCloseDialog} />
    </>
  );
}

export default Clinic;
