from fastapi import APIRouter, HTTPException

from app.domain.service import DoctorService
from app.schemas.doctor import DoctorCommentRequest, DoctorCreatePatientRequest, DoctorFeedbackRequest, DoctorStudyEventRequest

router = APIRouter()
service = DoctorService()


@router.get("/doctors/me")
def get_me():
    return service.get_me()


@router.get("/doctors/patients")
def list_patients():
    return service.list_patients()


@router.post("/doctors/patients")
def create_patient(payload: DoctorCreatePatientRequest):
    return service.create_patient(payload)


@router.get("/doctors/patients/{patient_id}")
def get_patient_card(patient_id: str):
    try:
        return service.get_patient_card(patient_id)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.post("/doctors/patients/{patient_id}/comments")
def add_comment(patient_id: str, payload: DoctorCommentRequest):
    return service.add_comment(patient_id, payload)


@router.post("/doctors/patients/{patient_id}/study-events")
def record_study_event(patient_id: str, payload: DoctorStudyEventRequest):
    try:
        return service.record_study_event(patient_id, payload)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.post("/doctors/patients/{patient_id}/feedback")
def add_feedback(patient_id: str, payload: DoctorFeedbackRequest):
    try:
        return service.add_feedback(patient_id, payload)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
