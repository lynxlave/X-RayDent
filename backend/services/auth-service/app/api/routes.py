from fastapi import APIRouter, HTTPException

from app.domain.service import AuthService
from app.schemas.auth import PhoneRequest, StaffLoginRequest, VerifyCodeRequest

router = APIRouter()
service = AuthService()


@router.post("/auth/patient/request-code")
def request_code(payload: PhoneRequest) -> dict[str, str]:
    try:
        return service.request_code(payload)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.post("/auth/patient/verify")
def verify_code(payload: VerifyCodeRequest):
    try:
        return service.verify_patient_code(payload)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@router.post("/auth/staff/login")
def staff_login(payload: StaffLoginRequest):
    try:
        return service.staff_login(payload)
    except ValueError as exc:
        raise HTTPException(status_code=401, detail=str(exc)) from exc
