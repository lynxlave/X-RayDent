from backend.shared.app.utils import InMemoryEventBus


class ImagingRepository:
    def __init__(self) -> None:
        self.event_bus = InMemoryEventBus()
