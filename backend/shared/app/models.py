from __future__ import annotations

from datetime import datetime, timezone
from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, Field


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


class Role(str, Enum):
    PATIENT = "patient"
    DOCTOR = "doctor"
    CLINIC_ADMIN = "clinic_admin"


class AnalysisStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    REJECTED = "rejected"
    COMPLETED = "completed"


class QualityAssessment(str, Enum):
    ACCEPTABLE = "acceptable"
    LOW = "low"


class User(BaseModel):
    id: str
    role: Role
    full_name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    clinic_id: Optional[str] = None


class Clinic(BaseModel):
    id: str
    name: str
    network_zone: str = "in-clinic"


class PatientProfile(BaseModel):
    id: str
    user_id: str
    phone: str
    consent_signed: bool = False
    theme: str = "light"


class DoctorProfile(BaseModel):
    id: str
    user_id: str
    clinic_id: str
    specialty: str = "radiologist"
    can_review: bool = True


class Complaint(BaseModel):
    code: str
    label: str


class Consent(BaseModel):
    patient_id: str
    agreed: bool
    signed_at: datetime = Field(default_factory=utcnow)


class Study(BaseModel):
    id: str
    patient_id: str
    created_by_role: Role
    created_by_id: str
    complaint_codes: List[str] = Field(default_factory=list)
    upload_name: Optional[str] = None
    status: AnalysisStatus = AnalysisStatus.PENDING
    created_at: datetime = Field(default_factory=utcnow)


class StudyUpload(BaseModel):
    study_id: str
    object_name: str
    presigned_url: str


class AnalysisJob(BaseModel):
    id: str
    study_id: str
    status: AnalysisStatus = AnalysisStatus.PROCESSING
    queued_at: datetime = Field(default_factory=utcnow)


class AnalysisResult(BaseModel):
    study_id: str
    status: AnalysisStatus
    quality_assessment: QualityAssessment
    findings: List[str] = Field(default_factory=list)
    recommendations: List[str] = Field(default_factory=list)
    processed_at: datetime = Field(default_factory=utcnow)


class Report(BaseModel):
    id: str
    study_id: str
    summary: str
    recommendations: List[str]
    pdf_url: str
    email_sent: bool = False
    generated_at: datetime = Field(default_factory=utcnow)


class Feedback(BaseModel):
    id: str
    study_id: str
    rating: int = Field(ge=1, le=5)
    comment: Optional[str] = None
    created_at: datetime = Field(default_factory=utcnow)
