import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QRCodeScanner from './components/QRCodeScanner/QRCodeScanner';
import Timer from './components/Timer/Timer';
import QRCodeGenerator from './components/QRCodeGenerator/QRCodeGenerator';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const classInfo = {
    id: uuidv4(), // Generates a unique UUID
    name: 'Coding Class',
    duration: '1:30:00', // 1 hour and 30 minutes
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<QRCodeGenerator classInfo={classInfo} />} />
        <Route path="/scan" element={<QRCodeScanner classInfo={classInfo} />} />
        <Route path="/timer/:classId" element={<Timer />} />
      </Routes>
    </Router>
  );
};

export default App;