from fastapi import APIRouter, HTTPException

from app.domain.service import AnalysisService
from app.schemas.analysis import AnalysisRequest

router = APIRouter()
service = AnalysisService()


@router.post("/analysis/jobs")
def process(payload: AnalysisRequest):
    return service.process(payload)


@router.get("/analysis/jobs/{study_id}")
def get_result(study_id: str):
    result = service.get_result(study_id)
    if not result:
        raise HTTPException(status_code=404, detail="Analysis result not found")
    return result
