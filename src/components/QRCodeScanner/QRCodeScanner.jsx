import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import { useNavigate } from 'react-router-dom';

const QRCodeScanner = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleScan = (data) => {
    if (data) {
      try {
        const scannedData = JSON.parse(data);
        navigate(`/timer/${scannedData.classId}`, { 
          state: { 
            startTime: scannedData.startTime,
            duration: scannedData.duration 
          } 
        });
      } catch (error) {
        setError("Invalid QR Code data. Please try again.");
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError("Error scanning QR code. Please try again.");
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Scan the QR Code</h2>
      {error ? (
        <div className="text-red-500 mb-4">{error}</div>
      ) : (
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%', maxWidth: '400px' }}
          constraints={{
            audio: false,
            video: { facingMode: "environment" }
          }}
        />
      )}
    </div>
  );
};

export default QRCodeScanner;