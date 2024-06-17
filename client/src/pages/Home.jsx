import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store';
import { CustomButton } from '../components';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../config/motion';



import { Canvas } from '@react-three/fiber';

import Model from '../canvas/Model';
import Backdrop from '../canvas/Backdrop';
import CameraRig from '../canvas/CameraRig';
import { Environment, Center } from '@react-three/drei';

import { useNavigate } from 'react-router-dom';


const CanvasModel = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <CameraRig>
        <Backdrop />
        <Center>
          <Model />
        </Center>
      </CameraRig>
    </Canvas>
  )
}


const Home = () => {
  const snap = useSnapshot(state);
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation('left')}>
          <motion.header {...slideAnimation("down")}>
            <img
              src='./threejs.png'
              alt="logo"
              className="w-8 h-8 object-contain"
            />
          </motion.header>

          <motion.div className="home-content items-center"  {...headContainerAnimation}>
            <motion.div {...headTextAnimation} className='items-center'>
              <h1 className="head-text text-4xl md:text-5xl lg:text-6xl leading-tight">
                ATHENA
              </h1>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5 items-center"
            >
              <p className="max-w-md font-normal text-black text-base md:text-lg text-center">
                Introducing ATHENA, your personal mental health companion. Experience compassionate care and achieve emotional well-being from the comfort of your home.
              </p>

              <CustomButton
                type="filled"
                title="Try It"
                handleClick={() => navigate('/clinic')}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
      <CanvasModel/>

    </AnimatePresence>

  )
}

export default Home;
