from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_generate_report_and_send_email() -> None:
    generated = client.post(
        "/reports/generate",
        json={"study_id": "study-report", "findings": ["Без патологии"], "recommendations": ["Контроль через 6 месяцев"]},
    )
    assert generated.status_code == 200
    assert generated.json()["event"]["topic"] == "report.ready"

    sent = client.post("/reports/study-report/send-email")
    assert sent.status_code == 200
    assert sent.json()["email_sent"] is True
