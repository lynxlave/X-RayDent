from backend.shared.app.events import PlatformEvent, TOPICS
from backend.shared.app.models import StudyUpload

from app.repositories.memory import ImagingRepository
from app.schemas.imaging import InitUploadRequest


class ImagingService:
    def __init__(self, repository: ImagingRepository | None = None) -> None:
        self.repository = repository or ImagingRepository()

    def init_upload(self, payload: InitUploadRequest):
        upload = StudyUpload(
            study_id=payload.study_id,
            object_name=payload.filename,
            presigned_url=f"http://localhost:9000/uploads/{payload.study_id}/{payload.filename}",
        )
        event = self.repository.event_bus.publish(
            PlatformEvent(
                topic=TOPICS["study_uploaded"],
                payload={"study_id": payload.study_id, "filename": payload.filename},
            )
        )
        return {"upload": upload, "event": event}

    def list_events(self):
        return list(self.repository.event_bus.list())
