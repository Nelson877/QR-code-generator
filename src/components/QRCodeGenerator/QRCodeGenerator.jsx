import React from 'react';
import { QRCode } from 'react-qrcode-logo';

const QRCodeGenerator = ({ classInfo }) => {
  const startTime = new Date().toISOString(); // Current time as start time
  const qrValue = JSON.stringify({
    classId: classInfo.id,
    className: classInfo.name,
    startTime: startTime,
    duration: classInfo.duration, // in minutes
  });

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Scan this QR Code</h2>
      <div className="p-4 bg-white border rounded-lg shadow-md">
        <QRCode value={qrValue} size={256} />
      </div>
      <p className="mt-4 text-sm text-gray-600">Class starts at: {new Date(startTime).toLocaleTimeString()}</p>
    </div>
  );
};

export default QRCodeGenerator;