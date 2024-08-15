import React, { useEffect, useState } from 'react';

const SessionTimer = () => {
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes in seconds

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timerInterval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div style={{ color: 'black', fontSize: '1.2rem' }}>
      {formatTime(timeLeft)}
    </div>
  );
};

export default SessionTimer;
