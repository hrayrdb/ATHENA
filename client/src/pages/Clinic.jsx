import { Canvas } from '@react-three/fiber';
import { Experience } from '../components/Experience';
import { KeyboardControls, Loader } from '@react-three/drei';
import { useConvaiClient } from '../hooks/useConvaiClient';
import ChatBubble from '../components/chat/Chat';
import Customizer from '../pages/Customizer'
function Clinic() {
  const apiKey = "79f59a42818bca9f304c576aea5d04e4";
  const characterId = "327dfc32-2cb8-11ef-aaf8-42010a7be00e";

  const { client } = useConvaiClient(characterId, apiKey);
  return (
    <>
      <KeyboardControls
        map={[
          { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
          { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
          { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
          { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
          { name: 'sprint', keys: ['Shift'] },
          { name: 'jump', keys: ['Space'] },
        ]}
      >
        <Loader />
        {/* <Leva /> */}
        <Canvas
          shadows
          camera={{
            position: [0, 0.8, 3],
            fov: 75,
          }}
        >
          <Experience client={client} />
        </Canvas>
      </KeyboardControls>
      {/* {
      client && */}
      {/* <ChatBubble client={client} /> */}
      {/* } */}
      <Customizer/>
    </>
  );
}

export default Clinic;
