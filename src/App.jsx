import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import QRCodeGenerator from './components/QRCodeGenerator/QRCodeGenerator';
import TimerDisplay from './components/TimerDisplay/TimerDisplay';

const App = () => {
  const classInfo = {
    id: uuidv4(), // Generates a unique UUID
    name: 'Coding Class',
    duration: 90, // 1 hour and 30 minutes in minutes
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<QRCodeGenerator classInfo={classInfo} />} />
        <Route path="/timer" element={<TimerDisplay />} />
      </Routes>
    </Router>
  );
};

export default App;