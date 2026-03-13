from fastapi import APIRouter

from app.domain.service import ImagingService
from app.schemas.imaging import InitUploadRequest

router = APIRouter()
service = ImagingService()


@router.post("/studies/init-upload")
def init_upload(payload: InitUploadRequest):
    return service.init_upload(payload)


@router.get("/studies/events")
def list_events():
    return service.list_events()
