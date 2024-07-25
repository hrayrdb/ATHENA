import React from 'react';

import CustomButton from './CustomButton';

const InputText = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
    return (
        <div className="aipicker-container">
            <textarea 
                placeholder="Write what you want to say..."
                rows={5}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="aipicker-textarea"
            />
            <div className="flex flex-wrap gap-3">
                {generatingImg ? (
                    <CustomButton 
                        type="outline"
                        title="Asking AI..."
                        customStyles="text-xs"
                    />
                ) : (
                    <>
                        <CustomButton 
                            type="outline"
                            title="Clear"
                            handleClick={() => handleSubmit('clear')}
                            customStyles="text-xs"
                        />

                        <CustomButton 
                            type="filled"
                            title="Send"
                            handleClick={() => handleSubmit('send')}
                            customStyles="text-xs"
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default InputText;
