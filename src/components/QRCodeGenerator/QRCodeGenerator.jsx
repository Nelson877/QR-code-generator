import React from 'react';
import { QRCode } from 'react-qrcode-logo';
import { useLocation } from 'react-router-dom';

const QRCodeGenerator = ({ classInfo: propsClassInfo }) => {
  const location = useLocation();
  // Use either the props classInfo or the one from route state
  const classInfo = propsClassInfo || location.state?.classInfo;
  const parentName = location.state?.parentName;

  // Base URL for the application
  // const baseUrl = 'https://qr-code-generator-vert-nine.vercel.app';
  
  // Generate URL for the login page with class information as query parameters
  const qrValue = `${baseUrl}/login?${new URLSearchParams({
    classId: classInfo.id,
    className: classInfo.name,
    redirectTo: encodeURIComponent(`/timer?classId=${classInfo.id}&className=${encodeURIComponent(classInfo.name)}`)
  }).toString()}`;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Welcome{parentName ? `, ${parentName}` : ''}!
        </h2>
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Scan this QR Code to Login
        </h3>
        <div className="p-4 bg-white border rounded-lg shadow-md">
          <QRCode value={qrValue} size={256} />
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Scan to access the parent login page
        </p>
      </div>
    </div>
  );
};

export default QRCodeGenerator;