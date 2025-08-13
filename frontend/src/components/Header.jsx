import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-hero text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-white">ATS</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-shadow">ATS Resume Checker</h1>
              <p className="text-blue-100 text-sm">AI-Powered Resume Analysis</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="#features" 
              className="text-blue-100 hover:text-white transition-colors duration-200 font-medium"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-blue-100 hover:text-white transition-colors duration-200 font-medium"
            >
              How It Works
            </a>
            <a 
              href="#upload" 
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium"
            >
              Get Started
            </a>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white hover:text-blue-200 transition-colors duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
