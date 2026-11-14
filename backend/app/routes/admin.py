from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import or_, desc, asc
from app.database import get_db
from app.models.enquiry import Enquiry
from app.schemas.enquiry import (
    AdminLoginRequest,
    TokenResponse,
    EnquiryResponse,
    EnquiryUpdate,
    EnquiryStats
)
from app.core.config import settings
from app.core.security import (
    verify_password,
    create_access_token,
    get_current_admin
)
from datetime import timedelta

router = APIRouter(prefix="/api/admin", tags=["Admin Dashboard"])

@router.post("/login", response_model=TokenResponse)
def admin_login(credentials: AdminLoginRequest):
    # Verify username and password (matches configured admin credentials)
    if credentials.username != settings.ADMIN_USERNAME:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )
    
    # Check password
    if not verify_password(credentials.password, settings.ADMIN_PASSWORD):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )
    
    expires_delta = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": credentials.username, "role": "admin"},
        expires_delta=expires_delta
    )
    
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        username=credentials.username
    )

@router.post("/logout")
def admin_logout(current_admin: str = Depends(get_current_admin)):
    return {"message": "Admin session logged out successfully"}

@router.get("/stats", response_model=EnquiryStats)
def get_enquiry_stats(
    db: Session = Depends(get_db),
    current_admin: str = Depends(get_current_admin)
):
    total = db.query(Enquiry).count()
    new_count = db.query(Enquiry).filter(Enquiry.status == "New").count()
    read_count = db.query(Enquiry).filter(Enquiry.status == "Read").count()
    replied_count = db.query(Enquiry).filter(Enquiry.status == "Replied").count()
    
    return EnquiryStats(
        total=total,
        new=new_count,
        read=read_count,
        replied=replied_count
    )

@router.get("/enquiries", response_model=List[EnquiryResponse])
def get_all_enquiries(
    search: Optional[str] = Query(None, description="Search by name, email, subject, or enquiry ID"),
    status_filter: Optional[str] = Query(None, alias="status", description="Filter by status: New, Read, Replied, Archived"),
    sort_order: str = Query("desc", pattern="^(asc|desc)$"),
    db: Session = Depends(get_db),
    current_admin: str = Depends(get_current_admin)
):
    query = db.query(Enquiry)
    
    if status_filter and status_filter.lower() != "all":
        query = query.filter(Enquiry.status == status_filter)
        
    if search:
        search_term = f"%{search.strip()}%"
        query = query.filter(
            or_(
                Enquiry.full_name.ilike(search_term),
                Enquiry.email.ilike(search_term),
                Enquiry.subject.ilike(search_term),
                Enquiry.enquiry_id.ilike(search_term),
                Enquiry.organization.ilike(search_term)
            )
        )
        
    if sort_order == "desc":
        query = query.order_by(desc(Enquiry.created_at))
    else:
        query = query.order_by(asc(Enquiry.created_at))
        
    return query.all()

@router.get("/enquiries/{enquiry_id}", response_model=EnquiryResponse)
def get_single_enquiry(
    enquiry_id: str,
    db: Session = Depends(get_db),
    current_admin: str = Depends(get_current_admin)
):
    # Search by either numerical ID or alphanumeric enquiry_id
    if enquiry_id.isdigit():
        enquiry = db.query(Enquiry).filter(or_(Enquiry.id == int(enquiry_id), Enquiry.enquiry_id == enquiry_id)).first()
    else:
        enquiry = db.query(Enquiry).filter(Enquiry.enquiry_id == enquiry_id).first()
        
    if not enquiry:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enquiry not found")
        
    # Auto mark as Read if currently New
    if enquiry.status == "New":
        enquiry.status = "Read"
        db.commit()
        db.refresh(enquiry)
        
    return enquiry

@router.patch("/enquiries/{enquiry_id}", response_model=EnquiryResponse)
def update_enquiry_status(
    enquiry_id: str,
    update_data: EnquiryUpdate,
    db: Session = Depends(get_db),
    current_admin: str = Depends(get_current_admin)
):
    if enquiry_id.isdigit():
        enquiry = db.query(Enquiry).filter(or_(Enquiry.id == int(enquiry_id), Enquiry.enquiry_id == enquiry_id)).first()
    else:
        enquiry = db.query(Enquiry).filter(Enquiry.enquiry_id == enquiry_id).first()
        
    if not enquiry:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enquiry not found")
        
    if update_data.status is not None:
        enquiry.status = update_data.status
    if update_data.admin_notes is not None:
        enquiry.admin_notes = update_data.admin_notes
        
    db.commit()
    db.refresh(enquiry)
    return enquiry

@router.delete("/enquiries/{enquiry_id}", status_code=status.HTTP_200_OK)
def delete_enquiry(
    enquiry_id: str,
    db: Session = Depends(get_db),
    current_admin: str = Depends(get_current_admin)
):
    if enquiry_id.isdigit():
        enquiry = db.query(Enquiry).filter(or_(Enquiry.id == int(enquiry_id), Enquiry.enquiry_id == enquiry_id)).first()
    else:
        enquiry = db.query(Enquiry).filter(Enquiry.enquiry_id == enquiry_id).first()
        
    if not enquiry:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enquiry not found")
        
    db.delete(enquiry)
    db.commit()
    return {"message": f"Enquiry {enquiry_id} deleted successfully", "deleted": True}
