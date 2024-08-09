import React from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '../config/motion';
import CustomButton from './CustomButton';

const ConfirmationDialog = ({ message = "ARE YOU SURE?", onConfirm, onCancel }) => {
    return (
        <motion.div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-70"></div>
            
            {/* Dialog */}
            <motion.div className="relative bg-white p-6 rounded-lg shadow-lg z-10 text-n-8" {...fadeAnimation}>
                <div className="dialog-content">
                    <p style={{fontWeight: 'bold', fontSize: '1.25rem' }}>{message}</p>
                    <div className="button-container flex">
                        <CustomButton
                            handleClick={onConfirm}
                            type="filled"
                            title="YES"
                        />
                        <div className='px-4'></div>
                        <CustomButton
                            handleClick={onCancel}
                            type="outline"
                            title="CANCEL"
                            customStyles="w-full px-4 py-2.5 font-bold text-sm"
                        />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ConfirmationDialog;
