import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import Model from '../canvas/Model';
import Backdrop from '../canvas/Backdrop';
import CameraRig from '../canvas/CameraRig';
import { Environment, Center } from '@react-three/drei';

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

const Login = () => {
    const snap = useSnapshot(state);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errors = {};
        if (!email) {
            errors.email = '* Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = '* Email is invalid';
        }
        if (!password) {
            errors.password = '* Password is required';
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            console.log('Form values:', { email, password });
            navigate('/clinic');
        }
    };

    return (
        <AnimatePresence>
            {snap.intro && (
                <motion.section className="home flex flex-col items-center justify-center min-h-screen px-4" {...slideAnimation('left')}>
                    {/* <motion.header {...slideAnimation("down")}>
                        <img
                            src='./threejs.png'
                            alt="logo"
                            className="w-8 h-8 object-contain"
                        />
                    </motion.header> */}

                    <motion.div className="home-content text-center flex flex-col items-center justify-center max-w-md" {...headContainerAnimation}>
                        <motion.div {...headTextAnimation} className="text-center">
                            <h1 className="head-text text-4xl md:text-5xl lg:text-6xl leading-tight">
                                LOGIN
                            </h1>
                        </motion.div>
                        <motion.div
                            {...headContentAnimation}
                            className="flex flex-col gap-5 items-center justify-center w-full"
                        >
                            <form onSubmit={handleSubmit} className="flex flex-col gap-7 items-start w-full">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className="text-red-500 text-sm pl-3">{errors.email}</div>}

                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && <div className="text-red-500 text-sm pl-3">{errors.password}</div>}

                                <CustomButton
                                    type="filled"
                                    title="Login"
                                    customStyles="w-full px-4 py-2.5 font-bold text-sm"
                                />
                            </form>
                            <p className="max-w-md font-normal text-black text-base md:text-lg text-center">
                                Don't have an account? <span className="text-yellow-500 cursor-pointer italic" onClick={() => navigate('/signup')}>Signup</span>
                            </p>
                        </motion.div>
                    </motion.div>
                </motion.section>
            )}
            {/* <CanvasModel key="canvas-model" /> */}
        </AnimatePresence>
    )
}

export default Login;
