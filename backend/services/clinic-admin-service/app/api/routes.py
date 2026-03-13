from fastapi import APIRouter

from app.domain.service import ClinicAdminService
from app.schemas.admin import DoctorAccessRequest

router = APIRouter()
service = ClinicAdminService()


@router.get("/admin/clinic")
def get_clinic():
    return service.get_clinic()


@router.get("/admin/doctors")
def list_doctors():
    return service.list_doctors()


@router.post("/admin/doctors/{doctor_id}/access")
def update_access(doctor_id: str, payload: DoctorAccessRequest):
    return service.update_access(doctor_id, payload.can_review)
