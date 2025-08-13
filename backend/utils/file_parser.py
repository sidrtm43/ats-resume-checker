from fastapi import HTTPException
from io import BytesIO
from pdfminer.high_level import extract_text as extract_pdf_text
import docx
import logging

logger = logging.getLogger(__name__)

def parse_pdf(file_bytes: bytes) -> str:
    """Extract text from PDF file bytes."""
    try:
        text = extract_pdf_text(BytesIO(file_bytes))
        if not text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from PDF. The file might be empty or corrupted.")
        return text.strip()
    except Exception as e:
        logger.error(f"PDF parsing error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"PDF parsing error: {str(e)}")

def parse_docx(file_bytes: bytes) -> str:
    """Extract text from DOCX file bytes."""
    try:
        doc = docx.Document(BytesIO(file_bytes))
        text = "\n".join([para.text for para in doc.paragraphs if para.text.strip()])
        if not text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from DOCX. The file might be empty or corrupted.")
        return text.strip()
    except Exception as e:
        logger.error(f"DOCX parsing error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"DOCX parsing error: {str(e)}")

def extract_text_from_file(file_bytes: bytes, content_type: str) -> str:
    """Extract text from file based on content type."""
    if content_type == "application/pdf":
        return parse_pdf(file_bytes)
    elif content_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return parse_docx(file_bytes)
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type. Only PDF and DOCX files are supported.")
