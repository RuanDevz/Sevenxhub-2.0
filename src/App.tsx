import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import AgeVerification from './components/AgeVerification';

function App() {
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = () => {
    setIsVerified(true);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
        <AgeVerification onVerify={handleVerify} />
        
        {isVerified && (
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/video/:fileCode" element={<VideoPage />} />
            </Routes>
          </Router>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;