from pydantic import BaseModel


class AnalysisRequest(BaseModel):
    study_id: str
    filename: str
