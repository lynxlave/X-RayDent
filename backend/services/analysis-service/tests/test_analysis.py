from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_completed_analysis() -> None:
    response = client.post("/analysis/jobs", json={"study_id": "study-good", "filename": "scan-good.png"})
    assert response.status_code == 200
    assert response.json()["result"]["status"] == "completed"


def test_rejected_analysis() -> None:
    response = client.post("/analysis/jobs", json={"study_id": "study-bad", "filename": "bad-quality.png"})
    assert response.status_code == 200
    assert response.json()["result"]["status"] == "rejected"
