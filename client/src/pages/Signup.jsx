import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const snap = useSnapshot(state);
  const navigate = useNavigate();

  const [email, setEmail] = useState('hrayr@gmail.com');
  const [password, setPassword] = useState('hrayrhrayr');
  const [confirmPassword, setConfirmPassword] = useState('hrayrhrayr');
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');

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
    if (password !== confirmPassword) {
      errors.confirmPassword = '* Passwords do not match';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        // Redirect to Info page with email and password in state
        navigate('/info', {
          state: { email, password },
        });
      } catch (error) {
        console.error('Error during signup:', error);
        setAuthError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="signup flex items-center justify-center min-h-screen px-4" {...slideAnimation('left')}>
          <motion.div className="signup-content text-center flex flex-col items-center justify-center max-w-md" {...headContainerAnimation}>
            <motion.div {...headTextAnimation} className="text-center">
              <h1 className="head-text text-4xl md:text-5xl lg:text-6xl leading-tight">
                SIGNUP
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
                  className="input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue text-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="text-red-500 text-sm pl-3">{errors.email}</div>}

                <input
                  type="password"
                  placeholder="Password"
                  className="input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue text-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <div className="text-red-500 text-sm pl-3">{errors.password}</div>}

                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue text-black"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && <div className="text-red-500 text-sm pl-3">{errors.confirmPassword}</div>}

                {authError && <div className="text-red-500 text-sm pl-3">{authError}</div>}

                <CustomButton
                  type="filled"
                  title="Signup"
                  customStyles="w-full px-4 py-2.5 font-bold text-sm"
                />
              </form>
              <p className="max-w-md font-normal text-white text-base md:text-lg text-center">
                Already have an account? <span className="cursor-pointer italic" style={{ color: '#9DD2F2' }} onClick={() => navigate('/login')}>Login</span>
              </p>
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Signup;
