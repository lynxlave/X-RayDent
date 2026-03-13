from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_notification_logs() -> None:
    sms = client.post("/notifications/sms", json={"phone": "+79990000001", "message": "code 0000"})
    assert sms.status_code == 200
    assert sms.json()["delivered"] is True

    email = client.post(
        "/notifications/email",
        json={"email": "patient@example.com", "subject": "Report", "body": "Ready"},
    )
    assert email.status_code == 200
    assert email.json()["delivered"] is True
