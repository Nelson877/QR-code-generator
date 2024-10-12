import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Timer = () => {
  const location = useLocation();
  const { startTime, duration } = location.state || {};
  
  const [timeLeft, setTimeLeft] = useState(calculateInitialTimeLeft());

  function calculateInitialTimeLeft() {
    if (!startTime || !duration) return 0;
    
    const start = new Date(startTime);
    const now = new Date();
    const elapsedSeconds = Math.floor((now - start) / 1000);
    const totalSeconds = duration * 60; // duration is in minutes
    
    return Math.max(totalSeconds - elapsedSeconds, 0);
  }

  useEffect(() => {
    if (!startTime || !duration) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, duration]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Class Timer</h2>
      {startTime && duration ? (
        <div className="text-4xl font-bold text-red-500">
          {timeLeft > 0 ? formatTime(timeLeft) : "Class Ended"}
        </div>
      ) : (
        <div className="text-red-500">Error: Class information not provided</div>
      )}
    </div>
  );
};

export default Timer;