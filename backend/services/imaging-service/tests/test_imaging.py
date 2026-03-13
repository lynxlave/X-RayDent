from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_init_upload_publishes_event() -> None:
    response = client.post("/studies/init-upload", json={"study_id": "study-1", "filename": "scan.png"})
    assert response.status_code == 200
    assert response.json()["event"]["topic"] == "study.uploaded"
