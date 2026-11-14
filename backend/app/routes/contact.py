from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.enquiry import Enquiry, generate_enquiry_id
from app.schemas.enquiry import EnquiryCreate, EnquiryCreateSuccess
import time
from collections import defaultdict

router = APIRouter(prefix="/api", tags=["Contact"])

# Simple in-memory rate limiter per IP: max 5 requests per 60 seconds
_rate_limits = defaultdict(list)

def rate_limiter(request: Request):
    client_ip = request.client.host if request.client else "unknown"
    now = time.time()
    # Filter out timestamps older than 60 seconds
    _rate_limits[client_ip] = [t for t in _rate_limits[client_ip] if now - t < 60]
    if len(_rate_limits[client_ip]) >= 8:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many contact submissions from your IP. Please wait a minute before trying again."
        )
    _rate_limits[client_ip].append(now)
    return client_ip

@router.post("/contact", response_model=EnquiryCreateSuccess, status_code=status.HTTP_201_CREATED)
def submit_contact_form(
    enquiry_in: EnquiryCreate,
    request: Request,
    db: Session = Depends(get_db),
    client_ip: str = Depends(rate_limiter)
):
    # Spam honeypot protection: if bot filled this hidden field, reject immediately
    if enquiry_in.honeypot:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Spam submission detected."
        )
    
    # Create new enquiry record
    new_enquiry = Enquiry(
        enquiry_id=generate_enquiry_id(),
        full_name=enquiry_in.full_name.strip(),
        email=enquiry_in.email.strip().lower(),
        phone=enquiry_in.phone.strip() if enquiry_in.phone else None,
        organization=enquiry_in.organization.strip() if enquiry_in.organization else None,
        subject=enquiry_in.subject.strip(),
        message=enquiry_in.message.strip(),
        status="New",
        ip_address=client_ip
    )
    
    db.add(new_enquiry)
    db.commit()
    db.refresh(new_enquiry)
    
    return EnquiryCreateSuccess(
        success=True,
        message="Thank you for reaching out! Your message has been received. I'll get back to you soon.",
        enquiry_id=new_enquiry.enquiry_id
    )
