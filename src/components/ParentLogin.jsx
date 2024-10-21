import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const ParentLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  // Parse query parameters from the URL
  const searchParams = new URLSearchParams(location.search);
  const classId = searchParams.get('classId');
  const className = searchParams.get('className');
  const redirectTo = searchParams.get('redirectTo');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/parent/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phoneNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      // Store parent data in localStorage
      localStorage.setItem('parentData', JSON.stringify(data.parent));

      // Create class info object with the parameters from QR code
      const classInfo = {
        id: classId || uuidv4(),
        name: className || "Coding Class",
        duration: 90,
      };

      // Calculate start and end times for the timer
      const startTime = new Date().toISOString();
      const endTime = new Date(new Date().getTime() + 90 * 60000).toISOString();

      // If there's a redirectTo parameter, decode it and navigate there
      if (redirectTo) {
        const decodedRedirectUrl = decodeURIComponent(redirectTo);
        const redirectParams = new URLSearchParams(decodedRedirectUrl.split('?')[1]);
        
        // Navigate to timer with all necessary information
        navigate('/timer', {
          state: {
            classInfo,
            parentName: name,
            startTime,
            endTime,
            parentData: data.parent
          }
        });
      } else {
        // Fallback navigation if no redirect URL is provided
        navigate('/timer', {
          state: {
            classInfo,
            parentName: name,
            startTime,
            endTime,
            parentData: data.parent
          }
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (e, setter) => {
    setError('');
    setter(e.target.value);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Parent Login</h2>
        
        {className && (
          <div className="mb-4 text-center text-gray-700">
            <p>Logging in for: <span className="font-semibold">{className}</span></p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => handleInputChange(e, setName)}
              className="w-full px-3 py-2 border rounded-sm focus:outline-none shadow-lg"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => handleInputChange(e, setPhoneNumber)}
              className="w-full px-3 py-2 border rounded-sm focus:outline-none shadow-lg"
              placeholder="e.g., 023-456-7890"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <a href="/register" className="text-red-700 hover:text-blue-900">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default ParentLogin;