import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

interface AgeVerificationProps {
  onVerify: () => void;
}

const AgeVerification: React.FC<AgeVerificationProps> = ({ onVerify }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user has already verified age
    const hasVerified = localStorage.getItem('ageVerified') === 'true';
    if (hasVerified) {
      setIsVisible(false);
      onVerify();
    }
  }, [onVerify]);

  const handleVerify = () => {
    localStorage.setItem('ageVerified', 'true');
    setIsVisible(false);
    onVerify();
  };

  const handleDecline = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full p-6 shadow-2xl animate-fadeIn">
        <div className="flex items-center justify-center mb-4 text-red-800 dark:text-red-500">
          <AlertTriangle size={40} />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Age Verification
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-center mb-6">
          This website contains adult content and is intended for viewers who are at least 18 years of age or older.
        </p>
        <div className="flex flex-col space-y-3">
          <button
            onClick={handleVerify}
            className="w-full bg-red-800 hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800 text-white py-3 rounded-lg font-medium transition-colors duration-300"
          >
            I am 18 or older - Enter
          </button>
          <button
            onClick={handleDecline}
            className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 rounded-lg font-medium transition-colors duration-300"
          >
            I am under 18 - Exit
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-6">
          By entering, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default AgeVerification;