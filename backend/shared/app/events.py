from __future__ import annotations

from datetime import datetime, timezone
from typing import Any, Dict

from pydantic import BaseModel, Field


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


class PlatformEvent(BaseModel):
    topic: str
    payload: Dict[str, Any]
    emitted_at: datetime = Field(default_factory=utcnow)


TOPICS = {
    "study_uploaded": "study.uploaded",
    "analysis_started": "analysis.started",
    "analysis_completed": "analysis.completed",
    "analysis_rejected": "analysis.rejected",
    "report_ready": "report.ready",
    "notification_requested": "notification.requested",
}
