import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "Mohammed Abbas S - AI/ML Portfolio API"
    API_V1_STR: str = "/api"
    SECRET_KEY: str = "super-secret-jwt-key-for-mohammed-abbas-portfolio-2026"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 # 24 hours
    
    # Admin Credentials for local development
    ADMIN_USERNAME: str = "admin"
    ADMIN_PASSWORD: str = "Abbas@Demo2026!"
    
    # Database
    DATABASE_URL: str = "sqlite:///./portfolio.db"
    PORT: int = 8000
    
    # Allowed CORS Origins
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000"
    ]

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
