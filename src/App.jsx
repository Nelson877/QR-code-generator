import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import QRCodeGenerator from './components/QRCodeGenerator/QRCodeGenerator';
import TimerDisplay from './components/TimerDisplay/TimerDisplay';
import ParentRegister from './components/ParentRegister';
import ParentLogin from './components/ParentLogin';

const App = () => {
  const classInfo = {
    id: uuidv4(),
    name: 'Coding Class',
    duration: 90,
  };

  // Helper function to check if user is logged in
  const isAuthenticated = () => {
    const parentData = localStorage.getItem('parentData');
    return !!parentData;
  };

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<QRCodeGenerator classInfo={classInfo} />} />
        <Route path="/login" element={<ParentLogin />} />
        <Route path="/register" element={<ParentRegister />} />
        <Route 
          path="/timer" 
          element={
            <ProtectedRoute>
              <TimerDisplay />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;