from typing import Optional

from pydantic import BaseModel


class DoctorCommentRequest(BaseModel):
    study_id: str
    comment: str
    recommendation: Optional[str] = None
