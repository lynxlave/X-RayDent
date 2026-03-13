from app.repositories.memory import NotificationRepository
from app.schemas.notification import EmailRequest, SmsRequest


class NotificationService:
    def __init__(self, repository: NotificationRepository | None = None) -> None:
        self.repository = repository or NotificationRepository()

    def send_sms(self, payload: SmsRequest):
        return self.repository.add({"kind": "sms", **payload.model_dump(), "delivered": True})

    def send_email(self, payload: EmailRequest):
        return self.repository.add({"kind": "email", **payload.model_dump(), "delivered": True})

    def list_messages(self):
        return self.repository.list()
