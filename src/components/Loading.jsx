import React from 'react'; // Ensure React is imported
import { RingLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primaryColor">
      <RingLoader color="black" size={150} />
    </div>
  );
};

export default Loading;
