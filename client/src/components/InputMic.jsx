import React, { useState } from 'react';

const InputMic = ({ setRecognizedText }) => {
    const [recognition, setRecognition] = useState(null);

    const handleStartRecognition = () => {
        if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
            alert('Speech recognition is not supported in this browser. Please try using Chrome or Safari.');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setRecognizedText(transcript);
            console.log('Recognized text:', transcript);
        };

        recognition.onerror = (event) => {
            console.error('Error occurred in recognition: ', event.error);
        };

        recognition.onend = () => {
            setRecognition(null); // Clear the recognition object when done
        };

        recognition.start();
        setRecognition(recognition);
    };

    const handleStopRecognition = () => {
        if (recognition) {
            recognition.stop();
        }
    };

    return (
        <div className="mic-tab">
            <button
                className="mic-button"
                onMouseDown={handleStartRecognition}
                onMouseUp={handleStopRecognition}
                onTouchStart={handleStartRecognition}
                onTouchEnd={handleStopRecognition}
            >
                🎙️
            </button>
            <p className="mic-instructions">Hold to speak, <br /> release to send</p>
        </div >
    );
};

export default InputMic;
