from fastapi import APIRouter, HTTPException

from app.domain.service import ReportService
from app.schemas.report import ReportGenerateRequest

router = APIRouter()
service = ReportService()


@router.post("/reports/generate")
def generate(payload: ReportGenerateRequest):
    return service.generate(payload)


@router.get("/reports/{study_id}")
def get_report(study_id: str):
    report = service.get(study_id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report


@router.post("/reports/{study_id}/send-email")
def send_email(study_id: str):
    return service.send_email(study_id)
