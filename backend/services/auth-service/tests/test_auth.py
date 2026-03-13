from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_patient_auth_flow() -> None:
    request = client.post("/auth/patient/request-code", json={"phone": "+79990000001"})
    assert request.status_code == 200
    assert request.json()["status"] == "code_sent"

    verify = client.post("/auth/patient/verify", json={"phone": "+79990000001", "code": "0000"})
    assert verify.status_code == 200
    assert verify.json()["role"] == "patient"


def test_staff_login() -> None:
    response = client.post("/auth/staff/login", json={"username": "doctor", "password": "password"})
    assert response.status_code == 200
    assert response.json()["role"] == "doctor"
