from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends
from sqlalchemy.orm import Session
import json
import logging
from database import get_db
from utils import file_parser, blackbox_client
from models import ResumeSubmission
from schemas import UploadResponse

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/api/v1/submit_resume", response_model=UploadResponse)
async def submit_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...),
    db: Session = Depends(get_db)
):
    """
    Submit a resume file and job description for ATS analysis.
    
    - **file**: Resume file (PDF or DOCX)
    - **job_description**: Job description text to compare against
    
    Returns ATS compatibility score, feedback, and keyword analysis.
    """
    
    # Validate file type
    allowed_types = [
        "application/pdf", 
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ]
    
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400, 
            detail="Unsupported file type. Only PDF and DOCX files are allowed."
        )
    
    # Validate job description
    if not job_description.strip():
        raise HTTPException(status_code=400, detail="Job description cannot be empty.")
    
    if len(job_description.strip()) < 50:
        raise HTTPException(
            status_code=400, 
            detail="Job description is too short. Please provide a more detailed job description (at least 50 characters)."
        )
    
    try:
        # Read file contents
        file_bytes = await file.read()
        
        if len(file_bytes) == 0:
            raise HTTPException(status_code=400, detail="Uploaded file is empty.")
        
        # Extract text from file
        logger.info(f"Extracting text from file: {file.filename}")
        resume_text = file_parser.extract_text_from_file(file_bytes, file.content_type)
        
        if len(resume_text.strip()) < 100:
            raise HTTPException(
                status_code=400, 
                detail="Resume text is too short. Please ensure your resume contains sufficient content for analysis."
            )
        
        # Analyze resume with Blackbox AI
        logger.info("Starting resume analysis with AI")
        analysis_result = blackbox_client.compare_resume_job(resume_text, job_description)
        
        # Save submission to database
        submission = ResumeSubmission(
            filename=file.filename,
            resume_text=resume_text,
            job_description=job_description,
            score=analysis_result.get("score"),
            feedback=analysis_result.get("feedback"),
            matched_keywords=json.dumps(analysis_result.get("matched_keywords", [])),
            missing_keywords=json.dumps(analysis_result.get("missing_keywords", []))
        )
        
        db.add(submission)
        db.commit()
        db.refresh(submission)
        
        logger.info(f"Successfully processed resume submission with ID: {submission.id}")
        
        return UploadResponse(
            id=submission.id,
            score=submission.score,
            feedback=submission.feedback,
            matched_keywords=json.loads(submission.matched_keywords),
            missing_keywords=json.loads(submission.missing_keywords),
            created_at=submission.created_at
        )
        
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        logger.error(f"Unexpected error processing resume: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail=f"An error occurred while processing your resume: {str(e)}"
        )

@router.get("/api/v1/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "message": "ATS Resume Checker API is running"}

@router.get("/api/v1/submissions/{submission_id}")
async def get_submission(submission_id: int, db: Session = Depends(get_db)):
    """Get a specific submission by ID."""
    submission = db.query(ResumeSubmission).filter(ResumeSubmission.id == submission_id).first()
    
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    
    return UploadResponse(
        id=submission.id,
        score=submission.score,
        feedback=submission.feedback,
        matched_keywords=json.loads(submission.matched_keywords) if submission.matched_keywords else [],
        missing_keywords=json.loads(submission.missing_keywords) if submission.missing_keywords else [],
        created_at=submission.created_at
    )
