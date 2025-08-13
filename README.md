# ATS Resume Checker

A fully functional AI-powered Applicant Tracking System (ATS) Resume Checker web application that helps job seekers improve their resume compatibility and increase their chances of landing interviews.

## Features

- **Resume Upload**: Support for PDF and DOCX file formats with drag-and-drop functionality
- **Job Description Analysis**: Compare resume against specific job descriptions
- **ATS Compatibility Scoring**: Get a detailed score (0-100) on how well your resume performs with ATS systems
- **Keyword Analysis**: Visual highlighting of matched and missing keywords
- **Detailed Feedback**: AI-powered suggestions for improvement
- **Modern UI**: Responsive design inspired by Resume Worded with Tailwind CSS
- **Real-time Analysis**: Powered by Blackbox AI API for accurate resume evaluation

## Technology Stack

### Backend
- **FastAPI**: Modern Python web framework
- **SQLAlchemy**: Database ORM
- **SQLite**: Database (easily configurable to PostgreSQL)
- **Blackbox AI API**: AI-powered resume analysis
- **PDF/DOCX Parsing**: Text extraction from resume files

### Frontend
- **React 18**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API calls
- **Responsive Design**: Mobile-first approach

## Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
# The .env file is already configured with the Blackbox AI API key
# DATABASE_URL=sqlite:///./ats_resume_checker.db (default)
# BLACKBOX_API_KEY=sk-XBi1JCFF6FyLT6L-wLu9jA (provided)
```

5. Start the backend server:
```bash
python main.py
```

The API will be available at `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`
- Health Check: `http://localhost:8000/api/v1/health`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### POST /api/v1/submit_resume
Submit a resume file and job description for analysis.

**Request:**
- `file`: Resume file (PDF or DOCX, max 10MB)
- `job_description`: Job description text (min 50 characters)

**Response:**
```json
{
  "id": 1,
  "score": 75.5,
  "feedback": "Detailed feedback text...",
  "matched_keywords": ["python", "javascript", "react"],
  "missing_keywords": ["aws", "docker", "kubernetes"],
  "created_at": "2024-01-01T12:00:00Z"
}
```

### GET /api/v1/health
Health check endpoint.

### GET /api/v1/submissions/{id}
Retrieve a specific submission by ID.

## Usage

1. **Upload Resume**: Drag and drop or select your resume file (PDF/DOCX)
2. **Enter Job Description**: Paste the job description you're targeting
3. **Analyze**: Click "Analyze My Resume" to get instant feedback
4. **Review Results**: 
   - View your ATS compatibility score
   - See matched and missing keywords
   - Read detailed improvement suggestions
5. **Improve**: Update your resume based on the feedback and re-analyze

## Features in Detail

### ATS Scoring Algorithm
The application uses advanced AI analysis to evaluate:
- Keyword density and relevance
- Skills alignment with job requirements
- Experience relevance
- Industry-specific terminology
- Resume formatting and structure

### Keyword Analysis
- **Matched Keywords**: Highlighted in green, showing what's working well
- **Missing Keywords**: Highlighted in red, showing opportunities for improvement
- **Smart Suggestions**: Context-aware recommendations for keyword integration

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Validation**: Instant feedback on file uploads and form inputs
- **Loading States**: Clear progress indicators during analysis
- **Error Handling**: Comprehensive error messages and recovery options

## Configuration

### Environment Variables

**Backend (.env):**
```env
DATABASE_URL=sqlite:///./ats_resume_checker.db
BLACKBOX_API_KEY=sk-XBi1JCFF6FyLT6L-wLu9jA
BLACKBOX_API_URL=https://openrouter.ai/api/v1/chat/completions
```

**Frontend:**
```env
REACT_APP_API_URL=http://localhost:8000
```

### Database Configuration
The application uses SQLite by default for easy setup. To use PostgreSQL:

1. Update the DATABASE_URL in `.env`:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/atsdb
```

2. Install PostgreSQL dependencies:
```bash
pip install psycopg2-binary
```

## Deployment

### Backend Deployment
1. Use a production WSGI server like Gunicorn:
```bash
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

2. Configure environment variables for production
3. Set up a reverse proxy (nginx) if needed

### Frontend Deployment
1. Build the production version:
```bash
npm run build
```

2. Serve the built files using a static file server or CDN

### Docker Deployment
Create Dockerfiles for both backend and frontend, or use docker-compose for the full stack.

## Security Considerations

- File upload validation and size limits
- Input sanitization for job descriptions
- API rate limiting (recommended for production)
- CORS configuration for production domains
- Environment variable security

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact [support@ats-resume-checker.com] or create an issue in the repository.

## Acknowledgments

- Inspired by Resume Worded's design and functionality
- Powered by Blackbox AI for intelligent resume analysis
- Built with modern web technologies for optimal performance
