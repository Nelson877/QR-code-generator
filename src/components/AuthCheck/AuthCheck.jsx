import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Get stored parent data if any
        const parentData = localStorage.getItem('parentData');
        
        // Get the redirect URLs from query parameters
        const registerRedirect = queryParams.get('registerRedirect');
        const loginRedirect = queryParams.get('loginRedirect');
        
        if (!parentData) {
          // No stored parent data - redirect to registration
          navigate(decodeURIComponent(registerRedirect), { 
            replace: true,
            state: {
              classId: queryParams.get('classId'),
              className: queryParams.get('className'),
              duration: queryParams.get('duration'),
              redirectTo: queryParams.get('redirectTo')
            }
          });
        } else {
          // Parent exists - redirect to login
          navigate(decodeURIComponent(loginRedirect), {
            replace: true,
            state: {
              classId: queryParams.get('classId'),
              className: queryParams.get('className'),
              duration: queryParams.get('duration'),
              redirectTo: queryParams.get('redirectTo')
            }
          });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // On error, default to registration
        navigate(decodeURIComponent(queryParams.get('registerRedirect')), { 
          replace: true,
          state: {
            classId: queryParams.get('classId'),
            className: queryParams.get('className'),
            duration: queryParams.get('duration'),
            redirectTo: queryParams.get('redirectTo')
          }
        });
      }
    };

    checkAuthStatus();
  }, [navigate, location.search]);

  // Show loading while checking
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <p className="text-lg text-gray-600">Checking registration status...</p>
      </div>
    </div>
  );
};

export default AuthCheck;