from fastapi import APIRouter

from app.domain.service import PatientService
from app.schemas.patient import ConsentRequest, FeedbackRequest, StudyCreateRequest

router = APIRouter()
service = PatientService()


@router.get("/patients/me")
def get_me():
    return service.get_me()


@router.get("/patients/complaints")
def get_complaints():
    return service.list_complaints()


@router.get("/patients/studies")
def list_studies():
    return service.list_studies()


@router.post("/patients/studies")
def create_study(payload: StudyCreateRequest):
    return service.create_study(payload)


@router.post("/patients/studies/{patient_id}/consent")
def sign_consent(patient_id: str, payload: ConsentRequest):
    return service.sign_consent(patient_id, payload.agreed)


@router.post("/patients/feedback")
def add_feedback(payload: FeedbackRequest):
    return service.add_feedback(payload)
