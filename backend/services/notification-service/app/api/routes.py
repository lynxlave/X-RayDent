from fastapi import APIRouter

from app.domain.service import NotificationService
from app.schemas.notification import EmailRequest, SmsRequest

router = APIRouter()
service = NotificationService()


@router.post("/notifications/sms")
def send_sms(payload: SmsRequest):
    return service.send_sms(payload)


@router.post("/notifications/email")
def send_email(payload: EmailRequest):
    return service.send_email(payload)


@router.get("/notifications/logs")
def list_messages():
    return service.list_messages()
