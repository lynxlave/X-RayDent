from backend.shared.app.events import PlatformEvent, TOPICS
from backend.shared.app.models import AnalysisResult, AnalysisStatus, QualityAssessment
from backend.shared.app.utils import InMemoryEventBus

from app.repositories.memory import AnalysisRepository
from app.schemas.analysis import AnalysisRequest


class AnalysisService:
    def __init__(self, repository: AnalysisRepository | None = None) -> None:
        self.repository = repository or AnalysisRepository()
        self.event_bus = InMemoryEventBus()

    def process(self, payload: AnalysisRequest):
        rejected = "bad" in payload.filename.lower()
        result = AnalysisResult(
            study_id=payload.study_id,
            status=AnalysisStatus.REJECTED if rejected else AnalysisStatus.COMPLETED,
            quality_assessment=QualityAssessment.LOW if rejected else QualityAssessment.ACCEPTABLE,
            findings=["Качество снимка недостаточное"] if rejected else ["Признаков радикулярных кист не обнаружено"],
            recommendations=["Загрузить повторный снимок"] if rejected else ["Проконсультироваться с лечащим врачом"],
        )
        saved = self.repository.save_result(result)
        event = self.event_bus.publish(
            PlatformEvent(
                topic=TOPICS["analysis_rejected"] if rejected else TOPICS["analysis_completed"],
                payload={"study_id": payload.study_id},
            )
        )
        return {"result": saved, "event": event}

    def get_result(self, study_id: str):
        return self.repository.get_result(study_id)
