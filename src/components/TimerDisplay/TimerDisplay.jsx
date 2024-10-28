import React, { useState, useEffect } from 'react';

const TimerDisplay = ({ initialState = null }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [className, setClassName] = useState('');
  const [notificationSent, setNotificationSent] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!initialState) {
      console.error('No timer state found');
      return;
    }

    const { classInfo, parentData } = initialState;
    const startTime = new Date(initialState.startTime || new Date());
    const endTime = new Date(initialState.endTime || new Date(startTime.getTime() + (classInfo.duration * 60000)));

    setClassName(classInfo.name);

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
        if (!notificationSent) {
          setNotificationSent(true);
          // Here you could trigger any callback passed as prop instead of direct API call
        }
      }
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, [initialState, notificationSent]);

  if (!initialState) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Pick-up Timer</h2>
      <h3 className="text-xl text-center mb-4">{className}</h3>
      <p className="text-gray-600 text-center mb-2">Time remaining:</p>
      <p className="text-3xl font-bold text-center mb-4">{timeLeft}</p>
      {error && (
        <div className="text-red-500 text-center mb-4">{error}</div>
      )}
      {notificationSent && (
        <div className="text-green-500 text-center">
          SMS Notification sent to parents!
        </div>
      )}
    </div>
  );
};

export default TimerDisplay;