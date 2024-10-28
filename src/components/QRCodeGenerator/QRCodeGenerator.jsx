import React from 'react';
import { QRCode } from 'react-qrcode-logo';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const QRCodeGenerator = ({ classInfo: propsClassInfo }) => {
  const location = useLocation();
  
  // If no classInfo is provided, create a default one
  const defaultClassInfo = {
    id: uuidv4(),
    name: 'Coding Class',
    duration: 90,
  };

  // Use props classInfo, or location state classInfo, or default
  const classInfo = propsClassInfo || location.state?.classInfo || defaultClassInfo;
  const parentName = location.state?.parentName;

  // Base URL for the application
  const baseUrl = 'https://qr-code-generator-iv4a.vercel.app/';
  
  // Generate URL for the registration/login flow with class information as query parameters
  const qrValue = `${baseUrl}/auth-check?${new URLSearchParams({
    classId: classInfo.id,
    className: classInfo.name,
    duration: classInfo.duration,
    // The final destination after auth flow is complete
    redirectTo: encodeURIComponent(`/timer?classId=${classInfo.id}&className=${encodeURIComponent(classInfo.name)}`),
    // Where to go if registration is needed
    registerRedirect: encodeURIComponent(`/register?classId=${classInfo.id}&className=${encodeURIComponent(classInfo.name)}`),
    // Where to go if already registered
    loginRedirect: encodeURIComponent(`/login?classId=${classInfo.id}&className=${encodeURIComponent(classInfo.name)}`)
  }).toString()}`;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Welcome{parentName ? `, ${parentName}` : ''}!
        </h2>
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Scan QR Code to Start
        </h3>
        <div className="p-4 bg-white border rounded-lg shadow-md">
          <QRCode 
            value={qrValue} 
            size={256}
            qrStyle="dots"
            eyeRadius={8}
            removeQrCodeBehindLogo={true}
          />
        </div>
        <p className="mt-4 text-sm text-gray-600">
          First time? You'll be asked to register.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Returning parent? You'll be taken to login.
        </p>
      </div>
    </div>
  );
};

export default QRCodeGenerator;