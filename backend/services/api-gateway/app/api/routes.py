from fastapi import APIRouter, HTTPException
import httpx

from backend.shared.app.settings import CommonSettings
from app.domain.gateway import GatewayService

router = APIRouter()
settings = CommonSettings(service_name="api-gateway")
service = GatewayService(settings)


async def forward(method: str, service_url: str, path: str, payload: dict | None = None):
    try:
        return await service.request(method, service_url, path, payload)
    except httpx.HTTPStatusError as exc:
        detail: str | dict | list
        try:
            detail = exc.response.json().get("detail", exc.response.text)
        except ValueError:
            detail = exc.response.text
        raise HTTPException(status_code=exc.response.status_code, detail=detail) from exc
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=503, detail="Сервис временно недоступен. Попробуйте еще раз.") from exc


@router.post("/api/auth/patient/request-code")
async def patient_request_code(payload: dict):
    return await forward("POST", settings.auth_service_url, "/auth/patient/request-code", payload)


@router.post("/api/auth/patient/verify")
async def patient_verify(payload: dict):
    return await forward("POST", settings.auth_service_url, "/auth/patient/verify", payload)


@router.post("/api/auth/staff/login")
async def staff_login(payload: dict):
    return await forward("POST", settings.auth_service_url, "/auth/staff/login", payload)


@router.post("/api/auth/doctor/register")
async def doctor_register(payload: dict):
    return await forward("POST", settings.auth_service_url, "/auth/doctor/register", payload)


@router.post("/api/auth/refresh")
async def refresh(payload: dict):
    return await forward("POST", settings.auth_service_url, "/auth/refresh", payload)


@router.get("/api/patients/me")
async def patient_me():
    return await forward("GET", settings.patient_service_url, "/patients/me")


@router.get("/api/patients/complaints")
async def patient_complaints():
    return await forward("GET", settings.patient_service_url, "/patients/complaints")


@router.get("/api/patients/studies")
async def patient_studies():
    return await forward("GET", settings.patient_service_url, "/patients/studies")


@router.post("/api/patients/studies")
async def create_patient_study(payload: dict):
    return await forward("POST", settings.patient_service_url, "/patients/studies", payload)


@router.post("/api/patients/studies/{patient_id}/consent")
async def patient_consent(patient_id: str, payload: dict):
    return await forward("POST", settings.patient_service_url, f"/patients/studies/{patient_id}/consent", payload)


@router.post("/api/patients/feedback")
async def patient_feedback(payload: dict):
    return await forward("POST", settings.patient_service_url, "/patients/feedback", payload)


@router.get("/api/doctors/me")
async def doctor_me():
    return await forward("GET", settings.doctor_service_url, "/doctors/me")


@router.get("/api/doctors/patients")
async def doctor_patients():
    return await forward("GET", settings.doctor_service_url, "/doctors/patients")


@router.get("/api/doctors/patients/{patient_id}")
async def doctor_patient_card(patient_id: str):
    return await forward("GET", settings.doctor_service_url, f"/doctors/patients/{patient_id}")


@router.post("/api/doctors/patients/{patient_id}/comments")
async def doctor_comment(patient_id: str, payload: dict):
    return await forward("POST", settings.doctor_service_url, f"/doctors/patients/{patient_id}/comments", payload)


@router.get("/api/admin/clinic")
async def admin_clinic():
    return await forward("GET", settings.clinic_admin_service_url, "/admin/clinic")


@router.get("/api/admin/doctors")
async def admin_doctors():
    return await forward("GET", settings.clinic_admin_service_url, "/admin/doctors")


@router.post("/api/admin/doctors/{doctor_id}/access")
async def admin_update_access(doctor_id: str, payload: dict):
    return await forward("POST", settings.clinic_admin_service_url, f"/admin/doctors/{doctor_id}/access", payload)


@router.post("/api/studies/init-upload")
async def init_upload(payload: dict):
    return await forward("POST", settings.imaging_service_url, "/studies/init-upload", payload)


@router.post("/api/studies/process")
async def patient_case_flow(payload: dict):
    try:
        return await service.patient_case_flow(payload.get("complaint_codes", []), payload["filename"])
    except KeyError as exc:
        raise HTTPException(status_code=422, detail=f"Missing field: {exc}") from exc


@router.get("/api/studies/{study_id}/status")
async def study_status(study_id: str):
    return await forward("GET", settings.analysis_service_url, f"/analysis/jobs/{study_id}")


@router.get("/api/reports/{study_id}")
async def report(study_id: str):
    return await forward("GET", settings.report_service_url, f"/reports/{study_id}")
