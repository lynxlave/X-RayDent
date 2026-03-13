from typing import List, Optional

from pydantic import BaseModel, Field


class StudyCreateRequest(BaseModel):
    patient_id: str = "patient-1"
    complaint_codes: List[str] = Field(default_factory=list)
    created_by_id: str = "patient-user-1"


class ConsentRequest(BaseModel):
    agreed: bool


class FeedbackRequest(BaseModel):
    study_id: str
    rating: int = Field(ge=1, le=5)
    comment: Optional[str] = None
