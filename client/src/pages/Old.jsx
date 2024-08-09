// import { motion, AnimatePresence } from 'framer-motion';
// import { useSnapshot } from 'valtio';
// import { state } from '../store';
// import { CustomButton } from '../components';
// import {
//   headContainerAnimation,
//   headContentAnimation,
//   headTextAnimation,
//   slideAnimation
// } from '../config/motion';

// import { Canvas } from '@react-three/fiber';

// import Model from '../canvas/Model';
// import Backdrop from '../canvas/Backdrop';
// import CameraRig from '../canvas/CameraRig';
// import { Environment, Center } from '@react-three/drei';

// import { useNavigate } from 'react-router-dom';

// import { Desk } from '../components/models/Desk';


// const CanvasModel = () => {
//   return (
//     <Canvas
//       shadows
//       camera={{ position: [-2, 0, 5], fov: 70 }}
//       gl={{ preserveDrawingBuffer: true }} 
//       className="transition-all ease-in"
//     >
//       <ambientLight intensity={0.5} />
//       <Environment preset="city" />
//       <CameraRig>
//         {/* <Backdrop /> */}
//         <Center>
//         <Desk rotation={[0, -1, 0]} /> 
//         </Center>
//       </CameraRig>
//     </Canvas>
//   )
// }

// const Home = () => {
//   const snap = useSnapshot(state);
//   const navigate = useNavigate();

//   return (
//     <AnimatePresence>
//       <motion.header {...slideAnimation("down")}>
//         <img
//           src='./threejs.png'
//           alt="logo"
//           className="w-8 h-8 object-contain"
//         />
//       </motion.header>
//       {snap.intro && (

//         <motion.section className="home" {...slideAnimation('left')}>

//           <motion.div className="home-content" {...headContainerAnimation}>
//             <motion.div {...headTextAnimation} className="items-center">
//               <h1 className="head-text text-4xl md:text-5xl lg:text-6xl leading-tight" style={{ color: '#e0e0e0' }} >
//                 ATHENA
//               </h1>
//             </motion.div>
//             <motion.div
//               {...headContentAnimation}
//               className="flex flex-col gap-5 items-center"
//             >
//               <p className="max-w-md font-normal text-base md:text-lg text-center" style={{ color: '#e0e0e0' }}>
//                 Introducing ATHENA, your personal mental health companion. Experience compassionate care and achieve emotional well-being from the comfort of your home.
//               </p>

//               <CustomButton
//                 type="filled"
//                 title="Start your journey"
//                 handleClick={() => navigate('/signup')}
//                 customStyles="w-fit px-4 py-2.5 font-bold text-sm"
//               />

//               <div className="or-divider">
//                 <div className="or-divider-line"></div>
//                 <div className="or-divider-text">OR</div>
//                 <div className="or-divider-line"></div>
//               </div>

//               <p className="max-w-md font-normal text-black text-base md:text-lg text-center">
//                 <span className="text-yellow-500 cursor-pointer" onClick={() => navigate('/try')}>Try it first</span>
//               </p>
//             </motion.div>
//           </motion.div>
//           <CanvasModel />
//         </motion.section>
//       )}

//     </AnimatePresence>
//   )
// }

// export default Home;

import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { state } from '../store';
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

import { Desk } from '../components/models/Desk';


const CanvasModel = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 70 }}
      gl={{ preserveDrawingBuffer: true }}
      className="transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <CameraRig>
        <Center>
          <Desk rotation={[0.1, -0.3, 0]} />
        </Center>
      </CameraRig>
    </Canvas>
  )
}

const Old = () => {
  const snap = useSnapshot(state);
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {/* <motion.header {...slideAnimation("down")}>
        <img
          src='./threejs.png'
          alt="logo"
          className="w-8 h-8 object-contain"
        />
      </motion.header> */}
      {snap.intro && (
        <motion.section className="home" {...slideAnimation('left')}>
          <div className="content-wrapper">
            <motion.div className="home-content" {...headContainerAnimation}>
              <motion.div {...headTextAnimation} className="items-center">
                <h1 className="head-text text-4xl md:text-5xl lg:text-6xl leading-tight" style={{ color: '#e0e0e0' }} >
                  ATHENA
                </h1>
              </motion.div>
              <motion.div
                {...headContentAnimation}
                className="flex flex-col gap-5 items-center"
              >
                <p className="max-w-md font-normal text-base md:text-lg text-center" style={{ color: '#e0e0e0' }}>
                  Introducing ATHENA, your personal mental health companion. Experience compassionate care and achieve emotional well-being from the comfort of your home.
                </p>

                <CustomButton
                  type="filled"
                  title="START"
                  handleClick={() => navigate('/signup')}
                  customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                />

                <div className="or-divider">
                  <div className="or-divider-line"></div>
                  <div className="or-divider-text">OR</div>
                  <div className="or-divider-line"></div>
                </div>

                <p className="max-w-md font-normal text-black text-base md:text-lg text-center">
                  <span className="text-yellow-500 cursor-pointer" onClick={() => navigate('/try')}>Try it first</span>
                </p>
              </motion.div>
            </motion.div>
            <div className="canvas-container ">
              <CanvasModel />
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Old;
