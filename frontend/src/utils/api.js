import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8001";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          throw new Error(data.detail || 'Invalid request. Please check your input.');
        case 413:
          throw new Error('File too large. Please upload a smaller file.');
        case 422:
          throw new Error('Invalid file format or missing required fields.');
        case 500:
          throw new Error('Server error. Please try again later.');
        default:
          throw new Error(data.detail || `Request failed with status ${status}`);
      }
    } else if (error.request) {
      // Network error
      throw new Error('Network error. Please check your connection and try again.');
    } else {
      // Other error
      throw new Error(error.message || 'An unexpected error occurred.');
    }
  }
);

/**
 * Submit resume and job description for ATS analysis
 * @param {File} file - Resume file (PDF or DOCX)
 * @param {string} jobDescription - Job description text
 * @returns {Promise} API response with analysis results
 */
export const submitResume = async (file, jobDescription) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('job_description', jobDescription);

  const response = await apiClient.post('/api/v1/submit_resume', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

/**
 * Get submission by ID
 * @param {number} submissionId - Submission ID
 * @returns {Promise} Submission data
 */
export const getSubmission = async (submissionId) => {
  const response = await apiClient.get(`/api/v1/submissions/${submissionId}`);
  return response.data;
};

/**
 * Health check endpoint
 * @returns {Promise} Health status
 */
export const healthCheck = async () => {
  const response = await apiClient.get('/api/v1/health');
  return response.data;
};

/**
 * Validate file before upload
 * @param {File} file - File to validate
 * @returns {Object} Validation result
 */
export const validateFile = (file) => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (!file) {
    return { isValid: false, error: 'No file selected' };
  }

  if (file.size > maxSize) {
    return { isValid: false, error: 'File size must be less than 10MB' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Only PDF and DOCX files are supported' };
  }

  return { isValid: true };
};

/**
 * Format file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default apiClient;
