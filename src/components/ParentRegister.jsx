import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ParentRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!formData.name.trim() || !formData.phoneNumber.trim()) {
        throw new Error('Please fill in all fields');
      }

      const phoneRegex = /^\d{10}$/;
      const cleanPhoneNumber = formData.phoneNumber.replace(/[-\s]/g, '');
      
      if (!phoneRegex.test(cleanPhoneNumber)) {
        throw new Error('Please enter a valid 10-digit phone number');
      }

      // Create mock parent data that would normally come from the server
      const mockParentData = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name.trim(),
        phoneNumber: cleanPhoneNumber,
      };

      // Store parent data in localStorage
      localStorage.setItem('parentData', JSON.stringify(mockParentData));

      // Create class info
      const classInfo = {
        id: Math.random().toString(36).substr(2, 9),
        name: 'Coding Class',
        duration: 90,
      };

      const startTime = new Date();
      const endTime = new Date(startTime.getTime() + 90 * 60000);

      // Navigate to timer page with necessary data
      navigate('/timer', {
        state: {
          classInfo,
          parentData: mockParentData,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString()
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Parent Registration</h2>
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

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
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
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="font-semibold text-black hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ParentRegister;