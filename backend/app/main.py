from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.config import settings
from app.database import engine, Base, SessionLocal
from app.models.enquiry import Enquiry, generate_enquiry_id
from app.routes import contact, admin
from datetime import datetime, timezone, timedelta

def init_db():
    Base.metadata.create_all(bind=engine)
    # Seed sample welcome enquiry if empty
    db = SessionLocal()
    try:
        if db.query(Enquiry).count() == 0:
            sample = Enquiry(
                enquiry_id=generate_enquiry_id(),
                full_name="Prof. Sarah Jenkins",
                email="s.jenkins@aiml-research.edu",
                phone="+91 9845012345",
                organization="AI Systems Lab",
                subject="Invitation to AI Research Collaboration",
                message="Hello Mohammed Abbas,\n\nI reviewed your profile and foundational projects in Artificial Intelligence and Machine Learning at Jain University. We have an upcoming student research symposium on neural representations and would love to connect with passionate students like you.\n\nBest regards,\nDr. Sarah Jenkins",
                status="New",
                created_at=datetime.now(timezone.utc) - timedelta(hours=2)
            )
            sample2 = Enquiry(
                enquiry_id=generate_enquiry_id(),
                full_name="Alex Rivera",
                email="alex.rivera@techventure.io",
                phone="+1 415 555 2671",
                organization="TechVenture Studios",
                subject="Frontend & AI Developer Internship Opportunity",
                message="Hi Mohammed! Loved the interactive 3D portfolio and your clean focus on Python and AI fundamentals. We'd love to interview you for our upcoming engineering internship cohort.",
                status="Read",
                created_at=datetime.now(timezone.utc) - timedelta(days=1)
            )
            db.add(sample)
            db.add(sample2)
            db.commit()
    finally:
        db.close()

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for Mohammed Abbas S - Personal 3D AI & ML Portfolio with Contact Form & Admin Portal",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # allow all during dev/local
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(contact.router)
app.include_router(admin.router)

@app.get("/api/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "service": "Mohammed Abbas S Portfolio API",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
