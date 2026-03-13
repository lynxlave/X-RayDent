from fastapi import APIRouter

from app.domain.service import DoctorService
from app.schemas.doctor import DoctorCommentRequest, DoctorCreatePatientRequest

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
    return service.get_patient_card(patient_id)


@router.post("/doctors/patients/{patient_id}/comments")
def add_comment(patient_id: str, payload: DoctorCommentRequest):
    return service.add_comment(patient_id, payload)
