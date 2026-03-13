from typing import Optional

from pydantic import BaseModel


class DoctorCreatePatientRequest(BaseModel):
    full_name: str
    birth_date: str
    phone: str


class DoctorCommentRequest(BaseModel):
    study_id: str
    comment: str
    recommendation: Optional[str] = None
