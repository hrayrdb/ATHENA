
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Experience } from '../components/Experience';
import { KeyboardControls, Loader } from '@react-three/drei';
import { useConvaiClient } from '../hooks/useConvaiClient';
import ChatBubble from '../components/chat/Chat';
import Buttons from './Buttons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { userState } from '../store';
// import UI from '../components/chat/UI';

function Clinic() {

  const snap = useSnapshot(userState);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  const apiKey = "79f59a42818bca9f304c576aea5d04e4";
  const characterId = "327dfc32-2cb8-11ef-aaf8-42010a7be00e";

  const { client } = useConvaiClient(characterId, apiKey);


  return (
    <>
      {/* <KeyboardControls
        map={[
          { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
          { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
          { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
          { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
          { name: 'sprint', keys: ['Shift'] },
          { name: 'jump', keys: ['Clinic'] },
        ]}
      >
              </KeyboardControls> */}

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
      <Buttons />

      {/* {
        client && 
        <ChatBubble client={client} /> 
      } */}
    </>
  );
}

export default Clinic;
