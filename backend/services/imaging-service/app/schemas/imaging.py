from pydantic import BaseModel


class InitUploadRequest(BaseModel):
    study_id: str
    filename: str
