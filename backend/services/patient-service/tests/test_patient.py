from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_patient_endpoints() -> None:
    me = client.get("/patients/me")
    assert me.status_code == 200
    assert me.json()["profile"]["id"] == "patient-1"

    complaints = client.get("/patients/complaints")
    assert complaints.status_code == 200
    assert len(complaints.json()) >= 1


def test_create_study_and_feedback() -> None:
    study = client.post("/patients/studies", json={"complaint_codes": ["pain"]})
    assert study.status_code == 200
    study_id = study.json()["id"]

    consent = client.post("/patients/studies/patient-1/consent", json={"agreed": True})
    assert consent.status_code == 200
    assert consent.json()["agreed"] is True

    feedback = client.post("/patients/feedback", json={"study_id": study_id, "rating": 5, "comment": "ok"})
    assert feedback.status_code == 200
    assert feedback.json()["rating"] == 5
