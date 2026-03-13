from typing import Optional

from pydantic import BaseModel, Field


class DoctorCreatePatientRequest(BaseModel):
    full_name: str
    birth_date: str
    phone: str
    email: Optional[str] = None


class DoctorCommentRequest(BaseModel):
    study_id: Optional[str] = None
    author_name: str
    comment: str
    recommendation: Optional[str] = None


class DoctorStudyEventRequest(BaseModel):
    file_name: str = Field(min_length=1)
    event: str = Field(pattern="^(uploaded|processed)$")


class DoctorFeedbackRequest(BaseModel):
    message: str = Field(min_length=1, max_length=4000)
