import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import UploadForm from './components/UploadForm';
import ResultPage from './components/ResultPage';
import { healthCheck } from './utils/api';

function App() {
  const [result, setResult] = useState(null);
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    // Check API health on app load
    const checkApiHealth = async () => {
      try {
        await healthCheck();
        setApiStatus('healthy');
      } catch (error) {
        console.warn('API health check failed:', error.message);
        setApiStatus('unhealthy');
      }
    };

    checkApiHealth();
  }, []);

  const handleResult = (analysisResult) => {
    setResult(analysisResult);
    // Scroll to top when showing results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setResult(null);
    // Scroll to upload section when going back
    setTimeout(() => {
      const uploadSection = document.getElementById('upload-section');
      if (uploadSection) {
        uploadSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Show API status banner if unhealthy
  const ApiStatusBanner = () => {
    if (apiStatus === 'checking') {
      return (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2">
          <div className="container mx-auto">
            <p className="text-yellow-800 text-sm text-center">
              Connecting to analysis service...
            </p>
          </div>
        </div>
      );
    }

    if (apiStatus === 'unhealthy') {
      return (
        <div className="bg-red-50 border-b border-red-200 px-4 py-3">
          <div className="container mx-auto">
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-red-800 text-sm">
                Analysis service is currently unavailable. Please try again later or contact support.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <ApiStatusBanner />
      
      <main className="flex-grow">
        {result ? (
          <ResultPage result={result} onBack={handleBack} />
        ) : (
          <UploadForm onResult={handleResult} />
        )}
      </main>
      
      {!result && <Footer />}
    </div>
  );
}

export default App;
