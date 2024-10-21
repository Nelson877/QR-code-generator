import React, { useState, useEffect } from 'react';

const TimerDisplay = () => {
  const [timeLeft, setTimeLeft] = useState('');
  const [className, setClassName] = useState('');
  const [notificationSent, setNotificationSent] = useState(false);
  const [classId, setClassId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const endTime = new Date(params.get('endTime'));
    const classNameParam = decodeURIComponent(params.get('className') || 'Class');
    const classIdParam = params.get('classId');
    const phoneNumberParam = params.get('phoneNumber');

    setClassName(classNameParam);
    setClassId(classIdParam);
    setPhoneNumber(phoneNumberParam);

    // Create class when component mounts
    createClass(classNameParam);

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
  }, [notificationSent]);

  const createClass = async (className) => {
    try {
      const response = await fetch('http://localhost:3000/api/create-class', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          className: className
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setClassId(data.classId);
        // Register attendance after class is created
        registerAttendance(data.classId, phoneNumber);
      } else {
        console.error('Failed to create class');
      }
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  const registerAttendance = async (classId, phoneNumber) => {
    try {
      const response = await fetch('http://localhost:3000/api/register-attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          classId: classId,
          phoneNumber: phoneNumber
        }),
      });

      if (!response.ok) {
        console.error('Failed to register attendance');
      }
    } catch (error) {
      console.error('Error registering attendance:', error);
    }
  };

  const sendNotification = async () => {
    try {
      // End the class and send notifications
      const response = await fetch('http://localhost:3000/api/end-class', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          classId: classId
        }),
      });

      if (response.ok) {
        console.log('SMS notifications sent successfully');
      } else {
        console.error('Failed to send SMS notifications');
      }
    } catch (error) {
      console.error('Error sending SMS notifications:', error);
    }
  };

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