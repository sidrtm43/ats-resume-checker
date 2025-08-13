from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
from database import engine, Base
from models import ResumeSubmission
from api import router

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ATS Resume Checker API",
    description="AI-powered ATS resume analysis and scoring system",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(router)

@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "message": "ATS Resume Checker API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/api/v1/health"
    }

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting ATS Resume Checker API server...")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
