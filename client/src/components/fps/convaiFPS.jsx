import { PointerLockControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { Player } from './Player';
export const ConvaiFPS = () => {
  const cameraRef = useRef();

  // This useFrame hook will run on every frame
  useFrame((state) => {
    // Adjust the camera height here
    state.camera.position.y = 1.5; // Set the desired camera height
    state.camera.position.z = 1.5; // Set the desired camera height

  });

  return (
    <>
      {/* <PointerLockControls ref={cameraRef} />
      <Player /> */}
    </>
  );
};
