import React from 'react';
import { color, motion } from 'framer-motion';
import { fadeAnimation } from '../config/motion';
import CustomButton from './CustomButton';

const ConfirmationDialog = ({ onConfirm, onCancel }) => {
    return (
        <motion.div className="confirmation-dialog" {...fadeAnimation}>
            <div className="dialog-content">
                <p style={{ fontFamily: 'Dharma-Gothic-E-Light-Italic', fontSize: '30px' }}>ARE YOU SURE?</p>
                <div className="button-container">
                    <CustomButton
                        handleClick={onConfirm}
                        type="filled"
                        title="LOGOUT"
                        customStyles="w-full px-4 py-2.5 font-bold text-sm"
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
    );
};

export default ConfirmationDialog;
