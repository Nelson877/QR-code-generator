import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

const TimerDisplay = ({ initialState = null }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [className, setClassName] = useState('');
  const [notificationSent, setNotificationSent] = useState(false);
  const [classId, setClassId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const location = useLocation();

  // Use either location state or initialState provided through props
  const timerState = location.state || initialState;

  useEffect(() => {
    if (!timerState) {
      return;
    }

    const { classInfo, parentData } = timerState;
    const startTime = new Date(timerState.startTime || new Date());
    const endTime = new Date(timerState.endTime || new Date(startTime.getTime() + (classInfo.duration * 60000)));

    setClassName(classInfo.name);
    setClassId(classInfo.id);
    setPhoneNumber(parentData.phoneNumber);

    // Create class when component mounts
    createClass(classInfo.name);

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
          sendNotification();
          setNotificationSent(true);
        }
      }
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, [timerState, notificationSent]);

  // Your existing createClass, registerAttendance, and sendNotification functions remain the same

  if (!timerState) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Pick-up Timer</h1>
        <p className="text-xl text-gray-600 mb-2">{className}</p>
        <p className="text-xl text-gray-600 mb-2">Time remaining:</p>
        <div className="text-4xl font-bold text-blue-600">{timeLeft}</div>
        {notificationSent && (
          <p className="mt-4 text-green-600">SMS Notification sent to parents!</p>
        )}
      </div>
    </div>
  );
};

export default TimerDisplay;