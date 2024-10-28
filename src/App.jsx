import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import QRCodeGenerator from './components/QRCodeGenerator/QRCodeGenerator';
import TimerDisplay from './components/TimerDisplay/TimerDisplay';
import ParentRegister from './components/ParentRegister';
import ParentLogin from './components/ParentLogin';
import AuthCheck from './components/AuthCheck/AuthCheck';

const App = () => {
  // Default class info moved to a function to ensure fresh UUID for each class
  const getDefaultClassInfo = () => ({
    id: uuidv4(),
    name: 'Coding Class',
    duration: 90,
  });

  // Helper function to check if user is logged in and has valid state
  const isAuthenticated = () => {
    try {
      const parentData = localStorage.getItem('parentData');
      if (!parentData) return false;
      
      // Verify parent data is valid JSON
      JSON.parse(parentData);
      return true;
    } catch (e) {
      // If JSON parse fails, clear invalid data
      localStorage.removeItem('parentData');
      return false;
    }
  };

  // Enhanced Protected Route component that also checks for timer state
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" replace />;
    }

    // Get parent data for the protected route
    const parentData = JSON.parse(localStorage.getItem('parentData'));

    // Wrap the children with the necessary state if they don't already have it
    const childrenWithProps = React.Children.map(children, child => {
      // Check if it's the TimerDisplay component and doesn't have state
      if (child.type === TimerDisplay && !child.props.location?.state) {
        // Create new class session data
        const startTime = new Date();
        const endTime = new Date(startTime.getTime() + (90 * 60000));
        
        // Create state object that TimerDisplay expects
        const timerState = {
          classInfo: getDefaultClassInfo(),
          parentData,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString()
        };

        // Clone the element with additional props
        return React.cloneElement(child, {
          initialState: timerState
        });
      }
      return child;
    });

    return childrenWithProps;
  };

  return (
   // In your App.js or router file
<Router>
  <Routes>
    <Route path="/auth-check" element={<AuthCheck />} />
    
    <Route 
      path="/register" 
      element={<ParentRegister />}
    />

    <Route 
      path="/login" 
      element={<ParentLogin />}
    />

    <Route 
      path="/timer"
      element={
        <ProtectedRoute>
          <TimerDisplay />
        </ProtectedRoute>
      }
    />

    <Route 
      path="/qr"
      element={
        <ProtectedRoute>
          <QRCodeGenerator />
        </ProtectedRoute>
      }
    />

    <Route
      path="*"
      element={<Navigate to="/qr" replace />}
    />
  </Routes>
</Router>
  );
};

export default App;