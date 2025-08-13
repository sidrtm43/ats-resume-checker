import React, { useState, useRef, useCallback } from 'react';
import { submitResume, validateFile, formatFileSize } from '../utils/api';

const UploadForm = ({ onResult }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef();

  const handleFileChange = (selectedFile) => {
    setError('');
    
    if (!selectedFile) return;

    const validation = validateFile(selectedFile);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    setFile(selectedFile);
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    handleFileChange(selectedFile);
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    
    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a resume file');
      return;
    }

    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }

    if (jobDescription.trim().length < 50) {
      setError('Job description must be at least 50 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await submitResume(file, jobDescription.trim());
      onResult(result);
    } catch (err) {
      setError(err.message || 'An error occurred while analyzing your resume');
    } finally {
      setLoading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="hero-section wave-divider py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-shadow-lg animate-fade-in">
            Improve your resume and get more interviews
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto animate-slide-up">
            Our AI-powered platform instantly gives you tailored feedback on your resume. 
            Get an ATS compatibility score and detailed improvement suggestions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <button 
              onClick={() => document.getElementById('upload-section').scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary text-lg px-8 py-4"
            >
              Get Started for Free
            </button>
            <button 
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              className="text-blue-100 hover:text-white font-semibold text-lg transition-colors duration-200"
            >
              See How It Works →
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your personal resume coach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of job seekers who have used our AI-powered toolkit to get ahead in their careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Resume Review</h3>
              <p className="text-gray-600">
                Get expert feedback on your resume instantly with our AI-powered analysis
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-success rounded-lg"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ATS Compatibility</h3>
              <p className="text-gray-600">
                Ensure your resume passes through Applicant Tracking Systems
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-yellow-500 rounded-lg"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Keyword Matching</h3>
              <p className="text-gray-600">
                Identify missing keywords and optimize for specific job descriptions
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-purple-500 rounded-lg"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Detailed Feedback</h3>
              <p className="text-gray-600">
                Get actionable suggestions to improve your resume's impact
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div id="upload-section" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Upload Your Resume
              </h2>
              <p className="text-xl text-gray-600">
                Get instant feedback and improve your chances of landing interviews
              </p>
            </div>

            <form onSubmit={handleSubmit} className="card">
              {error && (
                <div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-lg">
                  <p className="text-error-800 font-medium">{error}</p>
                </div>
              )}

              {/* File Upload Area */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Resume File
                </label>
                
                <div
                  className={`file-upload-area border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                    dragOver 
                      ? 'border-primary-500 bg-primary-50 scale-105' 
                      : file 
                        ? 'border-success-300 bg-success-50' 
                        : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {file ? (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-8 h-8 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-900">{file.name}</p>
                        <p className="text-gray-600">{formatFileSize(file.size)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="text-error-600 hover:text-error-800 font-medium transition-colors duration-200"
                      >
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-900 mb-2">
                          Drag and drop your resume here
                        </p>
                        <p className="text-gray-600 mb-4">or</p>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="btn-primary"
                        >
                          Choose File
                        </button>
                        <p className="text-sm text-gray-500 mt-4">
                          Supports PDF and DOCX files up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>

              {/* Job Description */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here to get targeted feedback on how well your resume matches the role..."
                  className="textarea-field h-40"
                  maxLength={5000}
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-500">
                    Minimum 50 characters required
                  </p>
                  <p className="text-sm text-gray-500">
                    {jobDescription.length}/5000
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !file || !jobDescription.trim()}
                className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
              >
                {loading ? (
                  <>
                    <div className="loading-spinner"></div>
                    <span>Analyzing Resume...</span>
                  </>
                ) : (
                  <span>Analyze My Resume</span>
                )}
              </button>

              {loading && (
                <div className="mt-4 text-center">
                  <p className="text-gray-600">
                    This may take up to 30 seconds. Please don't close this page.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
