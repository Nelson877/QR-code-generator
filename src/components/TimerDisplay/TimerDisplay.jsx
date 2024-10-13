import React, { useState, useEffect } from 'react';

const TimerDisplay = () => {
  const [timeLeft, setTimeLeft] = useState('');
  const [className, setClassName] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const endTime = new Date(params.get('endTime'));
    setClassName(decodeURIComponent(params.get('className') || 'Class'));

    const updateTimer = () => {
      const now = new Date();
      const difference = endTime - now;

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft('Time to pick up!');
      }
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000); // Update every second for smoother countdown

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Pick-up Timer</h1>
        <p className="text-xl text-gray-600 mb-2">{className}</p>
        <p className="text-xl text-gray-600 mb-2">Time remaining:</p>
        <div className="text-4xl font-bold text-blue-600">{timeLeft}</div>
      </div>
    </div>
  );
};

export default TimerDisplay;