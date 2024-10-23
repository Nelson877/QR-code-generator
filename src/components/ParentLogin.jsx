import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ParentLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Parse query parameters from the URL
  const searchParams = new URLSearchParams(location.search);
  const classId = searchParams.get('classId');
  const className = searchParams.get('className');
  const redirectTo = searchParams.get('redirectTo');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Basic validation
      if (!name.trim() || !phoneNumber.trim()) {
        throw new Error('Please fill in all fields');
      }

      // Phone number validation
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phoneNumber.replace(/[-\s]/g, ''))) {
        throw new Error('Please enter a valid 10-digit phone number');
      }

      const response = await fetch('http://localhost:3000/api/parent/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          phoneNumber: phoneNumber.replace(/[-\s]/g, ''), // Remove spaces and dashes
        }),
        credentials: 'include', // Include cookies in the request
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Login failed. Please try again.');
      }

      const data = await response.json();

      // Store parent data in localStorage
      localStorage.setItem('parentData', JSON.stringify(data.parent));

      const classInfo = {
        id: classId || uuidv4(),
        name: className || "Coding Class",
        duration: 90,
      };

      const startTime = new Date().toISOString();
      const endTime = new Date(new Date().getTime() + 90 * 60000).toISOString();

      // Navigate to the appropriate page
      const navigationState = {
        classInfo,
        parentName: name,
        startTime,
        endTime,
        parentData: data.parent
      };

      if (redirectTo) {
        const decodedRedirectUrl = decodeURIComponent(redirectTo);
        navigate(decodedRedirectUrl, { state: navigationState });
      } else {
        navigate('/timer', { state: navigationState });
      }
    } catch (error) {
      setError(error.message);
      console.error('Login error:', error);
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
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter your full name"
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="0505983690"
              disabled={isLoading}
              required
            />
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-center text-sm">
          Don't have an account?{' '}
          <a href="/register" className="text-primary hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default ParentLogin;