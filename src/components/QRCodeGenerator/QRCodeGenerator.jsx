import React from 'react';
import { QRCode } from 'react-qrcode-logo';

const QRCodeGenerator = ({ classInfo }) => {
  const startTime = new Date().toISOString(); // Current time as start time
  const endTime = new Date(new Date().getTime() + 90 * 60000).toISOString(); // 1 hour 30 minutes from now

  // Use a relative URL that points to a route within your application
  const qrValue = `/timer?classId=${classInfo.id}&className=${encodeURIComponent(classInfo.name)}&startTime=${startTime}&endTime=${endTime}`;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Scan this QR Code</h2>
      <div className="p-4 bg-white border rounded-lg shadow-md">
        <QRCode value={qrValue} size={256} />
      </div>
    </div>
  );
};

export default QRCodeGenerator;