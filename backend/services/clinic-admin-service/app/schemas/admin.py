from pydantic import BaseModel


class DoctorAccessRequest(BaseModel):
    can_review: bool
