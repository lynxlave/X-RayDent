from __future__ import annotations

from typing import Iterable
from uuid import uuid4

from backend.shared.app.events import PlatformEvent


def generate_id(prefix: str) -> str:
    return f"{prefix}-{uuid4().hex[:8]}"


class InMemoryEventBus:
    def __init__(self) -> None:
        self._events: list[PlatformEvent] = []

    def publish(self, event: PlatformEvent) -> PlatformEvent:
        self._events.append(event)
        return event

    def list(self) -> Iterable[PlatformEvent]:
        return tuple(self._events)
