from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class EnquiryCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=120, description="Visitor's full name")
    email: EmailStr = Field(..., description="Valid contact email address")
    phone: Optional[str] = Field(None, max_length=50, description="Optional contact phone")
    organization: Optional[str] = Field(None, max_length=150, description="Optional organization name")
    subject: str = Field(..., min_length=3, max_length=200, description="Subject of the enquiry")
    message: str = Field(..., min_length=10, max_length=5000, description="Enquiry message")
    honeypot: Optional[str] = Field(None, description="Anti-spam honeypot field, must be empty")

class EnquiryResponse(BaseModel):
    id: int
    enquiry_id: str
    full_name: str
    email: str
    phone: Optional[str] = None
    organization: Optional[str] = None
    subject: str
    message: str
    status: str
    admin_notes: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class EnquiryCreateSuccess(BaseModel):
    success: bool
    message: str
    enquiry_id: str

class EnquiryUpdate(BaseModel):
    status: Optional[str] = Field(None, pattern="^(New|Read|Replied|Archived)$")
    admin_notes: Optional[str] = None

class EnquiryStats(BaseModel):
    total: int
    new: int
    read: int
    replied: int

class AdminLoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    username: str
