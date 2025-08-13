from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ATSResult(BaseModel):
    score: float
    feedback: str
    matched_keywords: List[str]
    missing_keywords: List[str]

class UploadResponse(BaseModel):
    id: int
    score: float
    feedback: str
    matched_keywords: List[str]
    missing_keywords: List[str]
    created_at: datetime

class ResumeSubmissionBase(BaseModel):
    filename: str
    resume_text: str
    job_description: str
    score: Optional[float] = None
    feedback: Optional[str] = None

class ResumeSubmissionCreate(ResumeSubmissionBase):
    pass

class ResumeSubmission(ResumeSubmissionBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True
