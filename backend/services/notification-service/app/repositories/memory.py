class NotificationRepository:
    def __init__(self) -> None:
        self._items: list[dict] = []

    def add(self, payload: dict):
        self._items.append(payload)
        return payload

    def list(self):
        return self._items
