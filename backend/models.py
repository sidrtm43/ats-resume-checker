from sqlalchemy import Column, Integer, String, Text, Float, DateTime
from sqlalchemy.sql import func
from database import Base

class ResumeSubmission(Base):
    __tablename__ = "resume_submissions"
    
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    resume_text = Column(Text, nullable=False)
    job_description = Column(Text, nullable=False)
    score = Column(Float, nullable=True)
    feedback = Column(Text, nullable=True)
    matched_keywords = Column(Text, nullable=True)  # JSON string
    missing_keywords = Column(Text, nullable=True)  # JSON string
    created_at = Column(DateTime(timezone=True), server_default=func.now())
