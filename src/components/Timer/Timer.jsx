import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Timer = () => {
  const { classId } = useParams();
  const classDuration = 90 * 60; // 1 hour and 30 minutes in seconds

  const [timeLeft, setTimeLeft] = useState(classDuration);

  useEffect(() => {
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
  }, []);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Class Timer</h2>
      <div className="text-4xl font-bold text-red-500">
        {timeLeft > 0 ? formatTime(timeLeft) : "Class Ended"}
      </div>
    </div>
  );
};

export default Timer;