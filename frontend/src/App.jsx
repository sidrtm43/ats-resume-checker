import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import UploadForm from './components/UploadForm';
import ResultPage from './components/ResultPage';

function App() {
  const [result, setResult] = useState(null);

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
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
