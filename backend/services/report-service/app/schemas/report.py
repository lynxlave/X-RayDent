from pydantic import BaseModel


class ReportGenerateRequest(BaseModel):
    study_id: str
    findings: list[str]
    recommendations: list[str]
