from backend.shared.app.events import PlatformEvent, TOPICS
from backend.shared.app.models import Report
from backend.shared.app.utils import InMemoryEventBus, generate_id

from app.repositories.memory import ReportRepository
from app.schemas.report import ReportGenerateRequest


class ReportService:
    def __init__(self, repository: ReportRepository | None = None) -> None:
        self.repository = repository or ReportRepository()
        self.event_bus = InMemoryEventBus()

    def generate(self, payload: ReportGenerateRequest):
        report = Report(
            id=generate_id("report"),
            study_id=payload.study_id,
            summary="; ".join(payload.findings),
            recommendations=payload.recommendations,
            pdf_url=f"http://localhost:9000/reports/{payload.study_id}.pdf",
        )
        saved = self.repository.save(report)
        event = self.event_bus.publish(
            PlatformEvent(topic=TOPICS["report_ready"], payload={"study_id": payload.study_id, "report_id": saved.id})
        )
        return {"report": saved, "event": event}

    def get(self, study_id: str):
        return self.repository.get_by_study(study_id)

    def send_email(self, study_id: str):
        report = self.repository.get_by_study(study_id)
        report.email_sent = True
        return {"study_id": study_id, "email_sent": True}
