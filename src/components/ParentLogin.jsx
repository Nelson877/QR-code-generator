import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const ParentLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const classId = searchParams.get('classId');
  const className = searchParams.get('className');
  const redirectTo = searchParams.get('redirectTo');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!name.trim() || !phoneNumber.trim()) {
        throw new Error('Please fill in all required fields');
      }

      const cleanPhoneNumber = phoneNumber.replace(/[-\s]/g, '');
      const phoneRegex = /^\d{10}$/;
      
      if (!phoneRegex.test(cleanPhoneNumber)) {
        throw new Error('Please enter a valid 10-digit phone number');
      }

      // Mock successful login
      const mockParentData = {
        id: Math.random().toString(36).substr(2, 9),
        name: name.trim(),
        phoneNumber: cleanPhoneNumber,
      };

      // Store mock data in localStorage
      localStorage.setItem('parentData', JSON.stringify(mockParentData));

      // Handle navigation based on provided parameters
      if (redirectTo) {
        navigate(redirectTo);
      } else {
        const defaultClassInfo = {
          id: classId || Math.random().toString(36).substr(2, 9),
          name: className || 'Default Class',
          duration: 90,
        };

        const startTime = new Date();
        const endTime = new Date(startTime.getTime() + defaultClassInfo.duration * 60000);

        navigate('/timer', {
          state: {
            classInfo: defaultClassInfo,
            parentData: mockParentData,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString()
          }
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Parent Login</h2>
          {className && (
            <p className="text-gray-500">
              Logging in for: <span className="font-medium">{className}</span>
            </p>
          )}
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-600 border border-red-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              placeholder="Enter your full name"
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              placeholder="0505983690"
              disabled={isLoading}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-black py-2 px-4 text-sm font-semibold text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="font-semibold text-black hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default ParentLogin;