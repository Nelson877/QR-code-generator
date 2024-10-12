import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TimerDisplay = ({ classInfo }) => {
  const { classId } = useParams(); // Retrieve the classId from the URL
  const classEndTime = classInfo.time; // Get the class end time

  const calculateTimeLeft = () => {
    const difference = +new Date(classEndTime) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="text-center p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Time Left Until Class Ends</h2>
      {timerComponents.length ? (
        <div className="text-lg text-gray-700">
          {timerComponents}
        </div>
      ) : (
        <span className="text-red-500 text-lg">Class is over!</span>
      )}
    </div>
  );
};

export default TimerDisplay;
