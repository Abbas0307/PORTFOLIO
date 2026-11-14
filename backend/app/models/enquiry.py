import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, DateTime
from app.database import Base

def generate_enquiry_id() -> str:
    """Generate a clean unique human-readable enquiry ID like ENQ-7B29F4"""
    return f"ENQ-{uuid.uuid4().hex[:6].upper()}"

class Enquiry(Base):
    __tablename__ = "enquiries"

    id = Column(Integer, primary_key=True, index=True)
    enquiry_id = Column(String(32), unique=True, index=True, default=generate_enquiry_id)
    full_name = Column(String(120), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(50), nullable=True)
    organization = Column(String(150), nullable=True)
    subject = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    status = Column(String(20), default="New", index=True) # "New", "Read", "Replied", "Archived"
    admin_notes = Column(Text, nullable=True)
    ip_address = Column(String(64), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
