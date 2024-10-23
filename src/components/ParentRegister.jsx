import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const ParentRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Basic validation
      if (!formData.name.trim() || !formData.phoneNumber.trim()) {
        throw new Error("Please fill in all fields");
      }

      // Phone number validation
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(formData.phoneNumber.replace(/[-\s]/g, ''))) {
        throw new Error('Please enter a valid 10-digit phone number');
      }

      const apiUrl = '/api/parent/register';

      // First, make a preflight OPTIONS request
      const preflightResponse = await fetch(apiUrl, {
        method: 'OPTIONS',
        headers: {
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'Content-Type',
          'Origin': window.location.origin
        }
      });

      // Then make the actual POST request
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
          'Origin': window.location.origin
        },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name.trim(),
          phoneNumber: formData.phoneNumber.replace(/[-\s]/g, ''),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: `Registration failed (Status: ${response.status}). Please try again.`
        }));
        throw new Error(errorData.error || `Registration failed (Status: ${response.status}). Please try again.`);
      }

      const data = await response.json().catch(() => {
        throw new Error('Invalid response from server');
      });

      if (!data || !data.parent) {
        throw new Error('Invalid response data from server');
      }

      // Store parent data in localStorage
      localStorage.setItem("parentData", JSON.stringify(data.parent));

      // Create class info object
      const classInfo = {
        id: uuidv4(),
        name: "Coding Class",
        duration: 90,
      };

      // Navigate to QR code generator with class info and parent name
      navigate('/qr-code-generator', {
        state: {
          classInfo,
          parentName: formData.name,
          parentData: data.parent
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Failed to connect to the server. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setError(""); // Clear error when user starts typing
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
          <a href="/" className="font-semibold text-black hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ParentRegister;