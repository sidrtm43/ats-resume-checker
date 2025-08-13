import React, { useState } from 'react';

const ResultPage = ({ result, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No results to display</p>
          <button onClick={onBack} className="btn-primary mt-4">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { score, feedback, matched_keywords = [], missing_keywords = [] } = result;

  // Calculate score color and message
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-error-600';
  };

  const getScoreMessage = (score) => {
    if (score >= 80) return 'Excellent ATS Compatibility';
    if (score >= 60) return 'Good ATS Compatibility';
    return 'Needs Improvement';
  };

  const getScoreDescription = (score) => {
    if (score >= 80) return 'Your resume is well-optimized for ATS systems and should pass through most automated screening processes.';
    if (score >= 60) return 'Your resume has good compatibility but could benefit from some improvements to increase your chances.';
    return 'Your resume may face challenges with ATS systems. Consider implementing the suggested improvements.';
  };

  // Calculate circumference for score circle
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Resume Analysis Results</h1>
              <p className="text-gray-600 mt-1">Detailed ATS compatibility report</p>
            </div>
            <button
              onClick={onBack}
              className="btn-secondary flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Analyze Another Resume</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Score Card */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      stroke={score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444'}
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      className="score-circle"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
                        {Math.round(score)}
                      </div>
                      <div className="text-sm text-gray-500">/ 100</div>
                    </div>
                  </div>
                </div>

                <h3 className={`text-xl font-bold mb-2 ${getScoreColor(score)}`}>
                  {getScoreMessage(score)}
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  {getScoreDescription(score)}
                </p>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-success-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-success-600">
                      {matched_keywords.length}
                    </div>
                    <div className="text-sm text-success-700">Matched Keywords</div>
                  </div>
                  <div className="bg-error-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-error-600">
                      {missing_keywords.length}
                    </div>
                    <div className="text-sm text-error-700">Missing Keywords</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === 'overview'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('keywords')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === 'keywords'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Keywords Analysis
                  </button>
                  <button
                    onClick={() => setActiveTab('feedback')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === 'feedback'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Detailed Feedback
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Quick Summary
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700 leading-relaxed">
                          {feedback}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                          Strengths Found
                        </h4>
                        <div className="space-y-2">
                          {matched_keywords.slice(0, 5).map((keyword, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <svg className="w-4 h-4 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span className="text-gray-700">{keyword}</span>
                            </div>
                          ))}
                          {matched_keywords.length > 5 && (
                            <p className="text-sm text-gray-500">
                              +{matched_keywords.length - 5} more matched keywords
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <div className="w-2 h-2 bg-error rounded-full mr-2"></div>
                          Areas for Improvement
                        </h4>
                        <div className="space-y-2">
                          {missing_keywords.slice(0, 5).map((keyword, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <svg className="w-4 h-4 text-error-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                              <span className="text-gray-700">{keyword}</span>
                            </div>
                          ))}
                          {missing_keywords.length > 5 && (
                            <p className="text-sm text-gray-500">
                              +{missing_keywords.length - 5} more missing keywords
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Keywords Tab */}
                {activeTab === 'keywords' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Keyword Analysis
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Keywords are crucial for ATS systems. Here's how your resume performs:
                      </p>
                    </div>

                    {matched_keywords.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-success-700 mb-3 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Matched Keywords ({matched_keywords.length})
                        </h4>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {matched_keywords.map((keyword, index) => (
                            <span key={index} className="keyword-matched">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {missing_keywords.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-error-700 mb-3 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          Missing Keywords ({missing_keywords.length})
                        </h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {missing_keywords.map((keyword, index) => (
                            <span key={index} className="keyword-missing">
                              {keyword}
                            </span>
                          ))}
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <p className="text-yellow-800 text-sm">
                            <strong>Tip:</strong> Consider incorporating these missing keywords naturally into your resume 
                            to improve ATS compatibility and better match the job requirements.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Feedback Tab */}
                {activeTab === 'feedback' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Detailed Feedback & Recommendations
                      </h3>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <div className="prose prose-blue max-w-none">
                        <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                          {feedback}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Next Steps</h4>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-sm font-bold">1</span>
                          </div>
                          <p className="text-gray-700">
                            Review and incorporate the missing keywords naturally into your resume content
                          </p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-sm font-bold">2</span>
                          </div>
                          <p className="text-gray-700">
                            Ensure your resume format is ATS-friendly (avoid complex layouts, images, or tables)
                          </p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-sm font-bold">3</span>
                          </div>
                          <p className="text-gray-700">
                            Test your updated resume with another job description to track improvements
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onBack}
                className="btn-primary flex-1 flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Analyze Another Resume</span>
              </button>
              <button
                onClick={() => window.print()}
                className="btn-secondary flex-1 flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span>Print Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
